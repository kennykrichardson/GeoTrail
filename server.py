import json
import mimetypes
import os
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import parse_qs, urlparse, unquote

from src.analytics import parse_csv, run_multi_pipeline, run_pipeline


ROOT = Path(__file__).resolve().parent
PUBLIC_DIR = ROOT / "public"
DATASETS = [
    {"name": "England Tourism", "file": ROOT / "data" / "England Tourism.csv"},
    {"name": "American Tourism", "file": ROOT / "data" / "American Tourism.csv"},
    {"name": "Indian Tourism", "file": ROOT / "data" / "Indian Tourism.csv"},
    {"name": "Japan Tourism", "file": ROOT / "data" / "Japan Tourism.csv"},
]
PORT = int(os.environ.get("PORT", "5000"))


def read_datasets():
    return [
        {"name": item["name"], "csv": item["file"].read_text(encoding="utf-8-sig")}
        for item in DATASETS
    ]


def filters_from_query(query):
    raw = parse_qs(query)
    return {key: values[-1] for key, values in raw.items() if values}


class GeoTrailHandler(BaseHTTPRequestHandler):
    def send_json(self, status, payload):
        body = json.dumps(payload, indent=2).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/health":
            self.send_json(200, {"ok": True, "service": "geotrail-python-analytics"})
            return
        if parsed.path == "/api/dataset":
            body = "\n\n".join(f"# {item['name']}\n{item['csv']}" for item in read_datasets()).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "text/csv; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        if parsed.path == "/api/analytics":
            self.send_json(200, run_multi_pipeline(read_datasets(), filters_from_query(parsed.query)))
            return
        self.serve_static(parsed.path)

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path != "/api/analyze":
            self.send_json(404, {"error": "API route not found"})
            return
        length = int(self.headers.get("Content-Length", "0"))
        body = self.rfile.read(length).decode("utf-8")
        content_type = self.headers.get("Content-Type", "")
        try:
            csv_text = json.loads(body).get("csv", "") if "application/json" in content_type else body
            if not parse_csv(csv_text, "Uploaded CSV"):
                self.send_json(400, {"error": "No valid CSV rows were found."})
                return
            self.send_json(200, run_pipeline(csv_text, filters_from_query(parsed.query), "Uploaded CSV"))
        except Exception as error:
            self.send_json(400, {"error": str(error)})

    def serve_static(self, request_path):
        clean = unquote(request_path)
        if clean == "/":
            clean = "/index.html"
        target = (PUBLIC_DIR / clean.lstrip("/")).resolve()
        if not str(target).startswith(str(PUBLIC_DIR.resolve())) or not target.exists() or target.is_dir():
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not found")
            return
        body = target.read_bytes()
        mime = mimetypes.guess_type(str(target))[0] or "application/octet-stream"
        self.send_response(200)
        self.send_header("Content-Type", mime)
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):
        return


def main():
    server = ThreadingHTTPServer(("0.0.0.0", PORT), GeoTrailHandler)
    print(f"GeoTrail Python app is running at http://localhost:{PORT}")
    print("For your phone, use http://YOUR-PC-IP:" + str(PORT) + " on the same Wi-Fi")
    server.serve_forever()


if __name__ == "__main__":
    main()


