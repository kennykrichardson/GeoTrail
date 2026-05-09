import csv
import io
import json
import math
import re
import sys
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path


COMMON_TAGS = {
    "tourism", "tourists", "photo", "photos", "canon", "uk", "england", "local",
    "classic", "art", "urban", "street", "history", "architecture", "usa", "travel"
}

US_STATES = {
    "alabama": "Alabama", "alaska": "Alaska", "arizona": "Arizona", "arkansas": "Arkansas",
    "california": "California", "colorado": "Colorado", "connecticut": "Connecticut",
    "delaware": "Delaware", "florida": "Florida", "georgia": "Georgia", "hawaii": "Hawaii",
    "idaho": "Idaho", "illinois": "Illinois", "indiana": "Indiana", "iowa": "Iowa",
    "kansas": "Kansas", "kentucky": "Kentucky", "louisiana": "Louisiana", "maine": "Maine",
    "maryland": "Maryland", "massachusetts": "Massachusetts", "michigan": "Michigan",
    "minnesota": "Minnesota", "mississippi": "Mississippi", "missouri": "Missouri",
    "montana": "Montana", "nebraska": "Nebraska", "nevada": "Nevada",
    "newhampshire": "New Hampshire", "newjersey": "New Jersey", "newmexico": "New Mexico",
    "newyork": "New York", "northcarolina": "North Carolina", "northdakota": "North Dakota",
    "ohio": "Ohio", "oklahoma": "Oklahoma", "oregon": "Oregon", "pennsylvania": "Pennsylvania",
    "rhodeisland": "Rhode Island", "southcarolina": "South Carolina",
    "southdakota": "South Dakota", "tennessee": "Tennessee", "texas": "Texas", "utah": "Utah",
    "vermont": "Vermont", "virginia": "Virginia", "washington": "Washington",
    "westvirginia": "West Virginia", "wisconsin": "Wisconsin", "wyoming": "Wyoming"
}

US_COORDS = {
    "California": (15, 60), "Oregon": (16, 43), "Washington": (18, 30), "Nevada": (24, 55),
    "Arizona": (30, 68), "Utah": (35, 56), "Colorado": (45, 56), "Texas": (53, 76),
    "Florida": (82, 80), "New York": (82, 34), "Illinois": (63, 45), "Hawaii": (20, 84),
    "Georgia": (75, 67), "North Dakota": (51, 28), "South Carolina": (77, 63),
    "Minnesota": (58, 31), "Pennsylvania": (78, 40), "New Jersey": (83, 43),
    "Wisconsin": (62, 35), "Rhode Island": (87, 38), "Oklahoma": (53, 63),
    "Connecticut": (86, 38), "North Carolina": (78, 58), "Virginia": (77, 53),
    "Tennessee": (69, 60), "Louisiana": (60, 74), "Arkansas": (60, 63), "Mississippi": (64, 70),
    "Nebraska": (50, 47), "Maine": (90, 24), "Missouri": (61, 54), "Indiana": (68, 47),
    "Massachusetts": (87, 36), "Idaho": (29, 37), "West Virginia": (75, 50),
    "Alabama": (68, 69), "Kansas": (52, 55), "Iowa": (58, 45), "Delaware": (82, 47),
    "Wyoming": (39, 43), "Alaska": (11, 80), "Kentucky": (70, 55), "New Hampshire": (88, 31),
    "Ohio": (72, 46), "Michigan": (68, 36), "New Mexico": (40, 68), "Maryland": (80, 48),
    "Montana": (39, 31), "Vermont": (86, 31), "South Dakota": (50, 38)
}

ENGLAND_COORDS = {
    "London": (66, 74), "Manchester": (52, 44), "Liverpool": (45, 46),
    "Birmingham": (56, 56), "York": (60, 34), "Bath": (48, 64),
    "Oxford": (58, 66), "Cambridge": (70, 60), "Brighton": (66, 84),
    "Cornwall": (28, 88), "Lake District": (42, 24), "Newcastle": (66, 22),
    "Bristol": (44, 66), "Leeds": (58, 40), "Nottingham": (62, 52),

    "Big Ben": (66, 74), "Tower Bridge": (69, 75), "Buckingham Palace": (63, 74),
    "British Museum": (65, 72), "London Eye": (67, 75), "Westminster Abbey": (65, 74),

    "Old Trafford": (50, 44), "Science and Industry Museum": (52, 46),
    "Albert Dock": (45, 48), "Anfield": (44, 44),

    "Roman Baths": (48, 64), "York Minster": (60, 34),
    "Oxford University": (58, 66), "King's College": (70, 60),

    "Brighton Pier": (66, 84), "Royal Pavilion": (67, 83),

    "England Tourism Signal": (46, 48)
}

INDIA_STATES = {
    "andhrapradesh": "Andhra Pradesh", "arunachalpradesh": "Arunachal Pradesh", "assam": "Assam",
    "bihar": "Bihar", "chhattisgarh": "Chhattisgarh", "goa": "Goa", "gujarat": "Gujarat",
    "haryana": "Haryana", "himachalpradesh": "Himachal Pradesh", "jharkhand": "Jharkhand", "karnataka": "Karnataka",
    "kerala": "Kerala", "madhyapradesh": "Madhya Pradesh", "maharashtra": "Maharashtra", "manipur": "Manipur",
    "meghalaya": "Meghalaya", "mizoram": "Mizoram", "nagaland": "Nagaland", "odisha": "Odisha", "punjab": "Punjab",
    "rajasthan": "Rajasthan", "sikkim": "Sikkim", "tamilnadu": "Tamil Nadu", "telangana": "Telangana",
    "tripura": "Tripura", "uttarpradesh": "Uttar Pradesh", "uttarakhand": "Uttarakhand",  "westbengal": "West Bengal"
}

INDIA_COORDS = {
    "Andhra Pradesh": (78, 62), "Arunachal Pradesh": (92, 18), "Assam": (88, 28),
    "Bihar": (77, 42), "Chhattisgarh": (68, 56), "Goa": (48, 74),
    "Gujarat": (32, 58), "Haryana": (64, 46), "Himachal Pradesh": (58, 30),
    "Jharkhand": (74, 50), "Karnataka": (52, 78), "Kerala": (50, 90),
    "Madhya Pradesh": (60, 52), "Maharashtra": (50, 66), "Manipur": (94, 36),
    "Meghalaya": (90, 30), "Mizoram": (92, 44), "Nagaland": (96, 28),
    "Odisha": (78, 58), "Punjab": (58, 40), "Rajasthan": (40, 46),
    "Sikkim": (88, 20), "Tamil Nadu": (60, 88), "Telangana": (64, 68),
    "Tripura": (90, 40), "Uttar Pradesh": (70, 40), "Uttarakhand": (66, 28), "West Bengal": (84, 38)
}


JAPAN_COORDS = {
    "Tokyo": (78, 42), "Kyoto": (66, 52), "Osaka": (64, 58),
    "Hokkaido": (74, 18), "Nara": (68, 54), "Hiroshima": (58, 66),
    "Nagoya": (70, 50), "Okinawa": (52, 86), "Hakone": (74, 56),
    "Mount Fuji": (76, 54), "Sapporo": (72, 20), "Kobe": (62, 60),
    "Yokohama": (78, 46), "Fukuoka": (54, 64), "Sendai": (78, 30),
    "Japan Tourism Signal": (70, 48)
}


def normalize_header(header):
    return re.sub(r"(^_+|_+$)", "", re.sub(r"[^a-z0-9]+", "_", header.strip().lower()))


def split_tags(value):
    return [tag.strip().lower() for tag in (value or "").split(",") if tag.strip()]


def title_case(value):
    return " ".join(part.capitalize() for part in value.split())


def infer_location(title, tags, text, dataset):
    candidates = [
        "britishmuseum", "british museum", "naturalhistorymuseum", "natural history museum",
        "london", "southwark", "blackfriars", "thames", "bankside", "westminster",
        "camden", "greenwich", "tower bridge", "trafalgar", "hyde park", "covent garden",
        "soho", "kensington", "notting hill", "buckingham", "st pauls", "piccadilly",
        "leicester square", "oxford street", "shoreditch", "canary wharf"
    ]
    for candidate in candidates:
        if candidate in text:
            if candidate == "britishmuseum":
                return "British Museum"
            if candidate == "naturalhistorymuseum":
                return "Natural History Museum"
            return title_case(candidate)


    japan_places = {
        "tokyo": "Tokyo", "kyoto": "Kyoto", "osaka": "Osaka",
        "hokkaido": "Hokkaido", "nara": "Nara", "hiroshima": "Hiroshima",
        "nagoya": "Nagoya", "okinawa": "Okinawa", "hakone": "Hakone",
        "mount fuji": "Mount Fuji", "sapporo": "Sapporo",
        "kobe": "Kobe", "yokohama": "Yokohama",
        "fukuoka": "Fukuoka", "sendai": "Sendai"
    }

    for jp_key, jp_value in japan_places.items():
        if jp_key in text:
            return jp_value

    geo_city = next((tag for tag in tags if tag.startswith("geo:city=")), None)
    if geo_city:
        return title_case(geo_city.replace("geo:city=", ""))

    england_areas = {
        "London", "Manchester", "Liverpool", "Birmingham", "York",
        "Bath", "Oxford", "Cambridge", "Brighton", "Cornwall",
        "Lake District", "Newcastle", "Bristol", "Leeds", "Nottingham"
    }

    england_match = next((tag for tag in tags if title_case(tag.replace("_", " ")) in england_areas), None)

    if england_match:
        return title_case(england_match.replace("_", " "))

    state_tag = next((tag for tag in tags if tag in US_STATES), None)
    if state_tag:
        return US_STATES[state_tag]

    india_state_tag = next((tag for tag in tags if tag.replace("_", "") in INDIA_STATES), None)
    if india_state_tag:
        return INDIA_STATES[india_state_tag.replace("_", "")]

    if dataset == "England Tourism":
        return "England Tourism Signal"

    if dataset == "Indian Tourism":
        return "India Tourism Signal"

    if dataset == "Japan Tourism":
        return "Japan Tourism Signal"

    return title_case(title.split()[0]) if title else "General Tourism Hub"


def infer_theme(tags, text):
    rules = [
        ("Museum & Heritage", ["museum", "heritage", "history", "roman", "statue", "sculpture", "monument", "historic"]),
        ("Architecture", ["architecture", "building", "windows", "urban", "street", "bridge", "tower", "demolished"]),
        ("River & Waterfront", ["river", "thames", "waterfront", "southbank", "bankside", "bridge"]),
        ("Culture & Art", ["art", "gallery", "classic", "culture", "theatre", "creative"]),
        ("Local Life", ["local", "market", "street", "people", "tourists", "tourism", "beach", "city"]),
        ("Nature & Parks", ["park", "trees", "garden", "nature", "green", "forest"])
    ]
    tagset = set(tags)
    for name, words in rules:
        if any(word in tagset or word in text for word in words):
            return name
    return "General Discovery"


def infer_behavior(tags, text, faves):
    if "museum" in text or "history" in text or "heritage" in text:
        return "Cultural explorers"
    if "architecture" in text or "building" in text or "urban" in text:
        return "Urban observers"
    if "tourism" in text or "tourists" in text or "landmark" in text:
        return "Landmark seekers"
    if "river" in text or "park" in text or "trees" in text or "nature" in text:
        return "Scenic wanderers"
    if faves >= 20:
        return "High-engagement viewers"
    return "Casual browsers"


def infer_sentiment(description, tags, faves):
    text = f"{description} {' '.join(tags)}".lower()
    score = 55 + min(35, faves * 2)
    for word in ["classic", "art", "beautiful", "special", "heritage", "history"]:
        if word in text:
            score += 4
    for word in ["sad", "demolished", "vanished", "mad"]:
        if word in text:
            score -= 8
    return max(1, min(100, round(score)))


def parse_csv(text, dataset="Uploaded CSV"):
    reader = csv.DictReader(io.StringIO(text))
    if not reader.fieldnames:
        return []
    rows = []
    for raw in reader:
        record = {normalize_header(k or ""): (v or "").strip() for k, v in raw.items()}
        title = record.get("title") or record.get("place") or record.get("destination") or "Unknown"
        tags = split_tags(record.get("tags") or record.get("top_tags") or record.get("tag") or "")
        description = record.get("description") or record.get("short_description") or ""
        try:
            faves = float(record.get("faves") or record.get("favorites") or record.get("likes") or 0)
        except ValueError:
            faves = 0
        text_blob = f"{title} {description} {' '.join(tags)}".lower()
        photo_id = record.get("photo_id") or record.get("id")
        if not photo_id:
            continue
        rows.append({
            **record,
            "dataset": dataset,
            "photo_id": photo_id,
            "title": title,
            "description": description,
            "tags": tags,
            "faves": faves,
            "location": infer_location(title, tags, text_blob, dataset),
            "theme": infer_theme(tags, text_blob),
            "behavior": infer_behavior(tags, text_blob, faves),
            "sentiment": infer_sentiment(description, tags, faves),
            "richness": min(100, round(len(tags) * 8 + len(description) / 18 + faves * 3))
        })
    return rows


def avg(rows, field):
    return round(sum(float(row.get(field, 0) or 0) for row in rows) / len(rows), 2) if rows else 0


def group_by(rows, field):
    groups = defaultdict(list)
    for row in rows:
        groups[row.get(field) or "Unknown"].append(row)
    return groups


def top_groups(rows, field, limit=10):
    items = []
    total = len(rows) or 1
    for name, subset in group_by(rows, field).items():
        items.append({
            "name": name,
            "count": len(subset),
            "share": round(len(subset) / total * 100, 1),
            "avgFaves": avg(subset, "faves"),
            "avgSentiment": avg(subset, "sentiment"),
            "richness": avg(subset, "richness")
        })
    return sorted(items, key=lambda row: (-row["count"], -row["avgFaves"]))[:limit]


def top_tags(rows, limit=30):
    counts = Counter(tag for row in rows for tag in row["tags"])
    return [{"name": name, "count": count, "weight": count} for name, count in counts.most_common(limit)]


def engagement_bands(rows):
    bands = [
        ("Viral interest", lambda row: row["faves"] >= 25),
        ("Strong interest", lambda row: 10 <= row["faves"] < 25),
        ("Moderate interest", lambda row: 4 <= row["faves"] < 10),
        ("Low interest", lambda row: row["faves"] < 4),
    ]
    result = []
    for name, test in bands:
        subset = [row for row in rows if test(row)]
        result.append({
            "name": name,
            "count": len(subset),
            "share": round(len(subset) / (len(rows) or 1) * 100, 1),
            "avgFaves": avg(subset, "faves"),
            "topTheme": (top_groups(subset, "theme", 1) or [{"name": "N/A"}])[0]["name"]
        })
    return result


def build_stream(rows, limit=18):
    return [{
        "id": row["photo_id"],
        "title": row["title"],
        "dataset": row["dataset"],
        "location": row["location"],
        "theme": row["theme"],
        "area": row.get("area", row["location"]),
        "behavior": row["behavior"],
        "faves": row["faves"],
        "sentiment": row["sentiment"],
        "tags": row["tags"][:6]
    } for row in sorted(rows, key=lambda item: -item["faves"])[:limit]]


def map_kind(filters, rows):
    dataset = filters.get("dataset")
    if dataset == "American Tourism":
        return "usa"
    if dataset == "England Tourism":
        return "england"
    if dataset == "Indian Tourism":
        return "india"
    if dataset == "Japan Tourism":
        return "japan"
    datasets = {row["dataset"] for row in rows}
    if datasets == {"American Tourism"}:
        return "usa"
    if datasets == {"England Tourism"}:
        return "england"
    if datasets == {"Indian Tourism"}:
        return "india"
    if datasets == {"Japan Tourism"}:
        return "japan"
    return "combined"


def build_hotspots(rows, filters):
    kind = map_kind(filters, rows)

    coords = (
        US_COORDS if kind == "usa"
        else ENGLAND_COORDS if kind == "england"
        else INDIA_COORDS if kind == "india"
        else JAPAN_COORDS if kind == "japan"
        else {**US_COORDS, **ENGLAND_COORDS, **INDIA_COORDS}
    )

    fallback = [(28, 38), (46, 32), (62, 42), (38, 62), (70, 62), (54, 74), (78, 35), (22, 70)]

    output = []

    for index, row in enumerate(top_groups(rows, "location", 10)):
        x, y = coords.get(row["name"], fallback[index % len(fallback)])
        output.append({**row, "x": x, "y": y})

    return output


def cooccurrence(rows):
    matrix = Counter()
    for row in rows:
        tags = [tag for tag in row["tags"] if tag not in COMMON_TAGS][:10]
        for i, first in enumerate(tags):
            for second in tags[i + 1:]:
                matrix[" + ".join(sorted([first, second]))] += 1
    return [{"pair": pair, "count": count} for pair, count in matrix.most_common(12)]


def bar_series(rows):
    colors = ["#CC3536", "#292323", "#71706E", "#E45A5B", "#3B3030", "#A93435", "#8B8782", "#D94849"]
    return [{**row, "color": colors[index % len(colors)]} for index, row in enumerate(top_groups(rows, "location", 10))]


def forecast(rows):
    ordered = sorted(rows, key=lambda row: str(row["photo_id"]))
    bucket = max(100, math.ceil(len(ordered) / 12)) if ordered else 100
    history = []
    for index in range(0, len(ordered), bucket):
        subset = ordered[index:index + bucket]
        history.append({
            "period": f"Batch {len(history) + 1}",
            "volume": len(subset),
            "engagement": avg(subset, "faves"),
            "sentiment": avg(subset, "sentiment")
        })
    last = history[-1] if history else {"volume": 0, "engagement": 0}
    previous = history[-2] if len(history) > 1 else last
    growth = last["volume"] - previous["volume"]
    return {
        "history": history,
        "next": [{
            "period": f"Future {i + 1}",
            "predictedVolume": max(0, round(last["volume"] + growth * (i + 1))),
            "predictedEngagement": round(last["engagement"] + (last["engagement"] - previous["engagement"]) * (i + 1) * 0.35, 2),
            "confidence": max(58, 86 - i * 7)
        } for i in range(4)]
    }


def anomalies(rows):
    if not rows:
        return []
    mean = avg(rows, "faves")
    variance = sum((row["faves"] - mean) ** 2 for row in rows) / len(rows)
    threshold = mean + math.sqrt(variance) * 2
    spikes = [{
        "type": "Engagement spike",
        "label": row["title"],
        "value": f"{round(row['faves'])} faves",
        "detail": f"{row['location']} | {row['theme']}"
    } for row in sorted([row for row in rows if row["faves"] >= threshold], key=lambda item: -item["faves"])[:6]]
    lows = [{
        "type": "Low sentiment signal",
        "label": row["title"],
        "value": f"{row['sentiment']}/100",
        "detail": ", ".join(row["tags"][:4])
    } for row in rows if row["sentiment"] < 42][:4]
    return (spikes + lows)[:10]


def recommendations(rows):
    top_location = (top_groups(rows, "location", 1) or [{"name": "The leading location", "count": 0}])[0]
    top_theme = (top_groups(rows, "theme", 1) or [{"name": "The top theme"}])[0]
    top_behavior = (top_groups(rows, "behavior", 1) or [{"name": "The top segment"}])[0]
    tag = (top_tags(rows, 1) or [{"name": "Top tags"}])[0]
    return [
        {"title": "Create location-specific campaigns", "impact": "High", "detail": f"{top_location['name']} dominates observed interest with {top_location['count']} records. Feature nearby experiences and visitor routes."},
        {"title": "Package content around strongest themes", "impact": "High", "detail": f"{top_theme['name']} is the strongest behavioral theme. Use it for guided itineraries, ads, and destination bundles."},
        {"title": "Optimize for the largest behavior segment", "impact": "Medium", "detail": f"{top_behavior['name']} is the most common pattern. Tune recommendations and search filters around this intent."},
        {"title": "Use tag intelligence for discovery", "impact": "Medium", "detail": f"{tag['name']} appears most often. Use high-frequency tags to improve personalization and trend alerts."}
    ]


def apply_filters(rows, filters):
    result = []
    for row in rows:
        if filters.get("dataset") not in (None, "", "All") and row["dataset"] != filters["dataset"]:
            continue
        if filters.get("location") not in (None, "", "All") and row["location"] != filters["location"]:
            continue
        if filters.get("theme") not in (None, "", "All") and row["theme"] != filters["theme"]:
            continue
        if filters.get("behavior") not in (None, "", "All") and row["behavior"] != filters["behavior"]:
            continue
        if filters.get("search"):
            haystack = f"{row['title']} {row['description']} {' '.join(row['tags'])}".lower()
            if filters["search"].lower() not in haystack:
                continue
        try:
            min_faves = float(filters.get("minFaves") or 0)
        except ValueError:
            min_faves = 0
        if row["faves"] < min_faves:
            continue
        result.append(row)
    return result


def analyze_records(all_rows, filters=None):
    filters = filters or {}
    rows = apply_filters(all_rows, filters)
    grouped_dataset = group_by(all_rows, "dataset")
    grouped_location = group_by(all_rows, "location")
    grouped_theme = group_by(all_rows, "theme")
    grouped_behavior = group_by(all_rows, "behavior")
    kind = map_kind(filters, rows)
    return {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "source": {"schema": "photo-tourism-engagement-python", "totalRecords": len(all_rows), "filteredRecords": len(rows)},
        "filters": filters,
        "summary": {
            "records": len(rows),
            "totalFaves": round(sum(row["faves"] for row in rows)),
            "avgFaves": avg(rows, "faves"),
            "avgSentiment": avg(rows, "sentiment"),
            "avgRichness": avg(rows, "richness"),
            "uniqueLocations": len(group_by(rows, "location")),
            "uniqueTags": len(top_tags(rows, 100000))
        },
        "options": {
            "datasets": ["All", *sorted(grouped_dataset.keys())],
            "locations": (
                ["All", *sorted({
                    row["location"]
                    for row in all_rows
                    if filters.get("dataset") in (None, "", "All")
                    or row["dataset"] == filters.get("dataset")
                })]
            ),
            "themes": ["All", *sorted(grouped_theme.keys())],
            "behaviors": ["All", *sorted(grouped_behavior.keys())]
        },
        "map": {
            "kind": kind,
            "title": (
                "United States tourism map" if kind == "usa"
                else "England tourism map" if kind == "england"
                else "India tourism map" if kind == "india"
                else "Japan tourism map" if kind == "japan"
                else "Combined tourism map"
            )
        },
        "locations": top_groups(rows, "location", 12),
        "themes": top_groups(rows, "theme", 8),
        "behaviors": top_groups(rows, "behavior", 8),
        "engagementBands": engagement_bands(rows),
        "tags": top_tags(rows, 36),
        "cooccurrence": cooccurrence(rows),
        "barSeries": bar_series(rows),
        "hotspots": build_hotspots(rows, filters),
        "stream": build_stream(rows),
        "forecast": forecast(rows),
        "anomalies": anomalies(rows),
        "recommendations": recommendations(rows)
    }


def run_pipeline(csv_text, filters=None, source_name="Uploaded CSV"):
    return analyze_records(parse_csv(csv_text, source_name), filters)


def run_multi_pipeline(datasets, filters=None):
    rows = []
    for dataset in datasets:
        rows.extend(parse_csv(dataset["csv"], dataset["name"]))
    return analyze_records(rows, filters)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print('Usage: python src/analytics.py "data/England Tourism.csv"', file=sys.stderr)
        raise SystemExit(1)
    path = Path(sys.argv[1])
    print(json.dumps(run_pipeline(path.read_text(encoding="utf-8-sig"), {}, path.stem), indent=2))
