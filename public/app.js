let currentAnalytics = null;
let streamTimer = null;
let streamIndex = 0;
let streamEvents = 0;

const filters = {
  dataset: "All",
  location: "All",
  theme: "All",
  behavior: "All",
  minFaves: 0,
  search: ""
};

const formatNumber = value => Number(value || 0).toLocaleString();

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function queryString() {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== "All" && Number(value) !== 0) params.set(key, value);
  });
  return params.toString();
}

async function fetchAnalytics() {
  const query = queryString();
  const response = await fetch(`/api/analytics${query ? `?${query}` : ""}`);
  if (!response.ok) throw new Error("Unable to load analytics");
  return response.json();
}

function populateSelect(id, values, selected) {
  const select = document.getElementById(id);
  const prior = select.value || selected;
  select.innerHTML = values.map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("");
  select.value = values.includes(prior) ? prior : selected;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function drawAttentionBars(series) {
  const canvas = document.getElementById("attentionChart");
  const ctx = canvas.getContext("2d");
  const rows = (series || []).slice(0, 10);
  const width = canvas.width;
  const height = canvas.height;
  const padding = 130;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const max = Math.max(...rows.map(row => row.count), 1);
  const barGap = 14;
  const barWidth = rows.length ? (chartWidth - barGap * (rows.length - 1)) / rows.length : 0;
  const duration = 850;
  const start = performance.now();

  function frame(now) {
    const progress = Math.min(1, (now - start) / duration);
    const ease = 1 - Math.pow(1 - progress, 3);
    ctx.clearRect(0, 0, width, height);

    const background = ctx.createLinearGradient(0, 0, width, height);
    background.addColorStop(0, "#F0F0F0");
    background.addColorStop(0.62, "rgba(204, 53, 54, 0.08)");
    background.addColorStop(1, "rgba(41, 35, 35, 0.14)");
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(113, 112, 110, 0.24)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i += 1) {
      const y = padding + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    rows.forEach((row, index) => {
      const x = padding + index * (barWidth + barGap);
      const barHeight = (row.count / max) * chartHeight * ease;
      const y = height - padding - barHeight;
      const gradient = ctx.createLinearGradient(x, y, x + barWidth, height - padding);
      gradient.addColorStop(0, row.color || "#CC3536");
      gradient.addColorStop(0.55, "#CC3536");
      gradient.addColorStop(1, "#292323");
      ctx.fillStyle = gradient;
      roundRect(ctx, x, y, barWidth, barHeight, 10);
      ctx.fill();

      ctx.fillStyle = "#292323";
      ctx.font = "bold 36px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(String(row.count), x + barWidth / 2, y - 10);

      ctx.save();
      ctx.translate(x + barWidth / 2, height - 24);
      ctx.rotate(-Math.PI / 7);
      ctx.fillStyle = "#71706E";
      ctx.font = "bold 30px system-ui";
      ctx.fillText(row.name.slice(0, 16), 0, 0);
      ctx.restore();
    });

    ctx.textAlign = "left";
    ctx.fillStyle = "#292323";
    ctx.font = "bold 48px system-ui";
    ctx.fillText("Location attention volume", padding, 30);
    ctx.fillStyle = "#71706E";
    ctx.font = "30px system-ui";
    ctx.fillText("Animated from live filtered CSV aggregates", padding, 82);

    if (!rows.length) {
      ctx.fillStyle = "#71706E";
      ctx.font = "bold 44px system-ui";
      ctx.fillText("No bar graph data matches the current filters", padding, height / 2);
    }

    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function renderHotspots(rows, mapInfo) {
  const map = document.getElementById("hotspotMap");
  const max = Math.max(...rows.map(row => row.count), 1);
  if (!rows.length) {
    map.innerHTML = '<div class="empty-state">No hotspots match the current filters.</div>';
    document.getElementById("selectedHotspot").innerHTML = "<strong>No hotspot selected</strong>";
    return;
  }
  map.className = `hotspot-map map-${mapInfo?.kind || "combined"}`;
  map.innerHTML = `
    ${renderMapSvg(mapInfo?.kind || "combined")}
    <div class="map-title">${escapeHtml(mapInfo?.title || "Tourism attention map")}</div>
    ${rows.map(row => `
    <button class="hotspot" style="left:${row.x}%; top:${row.y}%; --size:${28 + (row.count / max) * 46}px" data-name="${escapeHtml(row.name)}">
      <span>${escapeHtml(row.name)}</span>
    </button>
    `).join("")}
  `;

  map.querySelectorAll(".hotspot").forEach(button => {
    button.addEventListener("click", () => {
      const row = rows.find(item => item.name === button.dataset.name);
      document.getElementById("selectedHotspot").innerHTML = `
        <strong>${escapeHtml(row.name)}</strong>
        <span>${row.count} records | ${row.avgFaves} avg faves | ${row.avgSentiment}/100 sentiment</span>
      `;
    });
  });

  if (rows[0]) {
    document.getElementById("selectedHotspot").innerHTML = `
      <strong>${escapeHtml(rows[0].name)}</strong>
      <span>${rows[0].count} records | ${rows[0].avgFaves} avg faves | ${rows[0].avgSentiment}/100 sentiment</span>
    `;
  }
}

function renderMapSvg(kind) {
  if (kind === "usa") {
    return `<svg class="country-map" viewBox="0 0 100 100" aria-hidden="true">
      <path d="M8 43 L12 34 L19 31 L24 24 L35 21 L47 23 L57 25 L64 28 L73 29 L82 36 L91 39 L94 48 L90 56 L84 58 L82 64 L75 65 L69 72 L58 73 L49 69 L41 70 L35 64 L27 65 L20 59 L13 57 L10 50 Z"></path>
      <path d="M14 78 L21 73 L29 76 L25 84 L15 86 Z"></path>
      <path d="M24 82 L31 79"></path>
      <path d="M61 72 L66 83 L72 85 L70 76"></path>
    </svg>`;
  }
  if (kind === "england") {
    return `<svg class="country-map" viewBox="0 0 100 100" aria-hidden="true">
      <path d="M54 10 L64 15 L66 24 L61 31 L70 37 L66 47 L72 57 L67 66 L61 77 L52 91 L43 82 L45 70 L38 61 L42 52 L35 44 L42 35 L38 27 L47 21 Z"></path>
      <path d="M48 72 L58 73 L70 80 L76 87"></path>
      <path d="M43 83 L35 87 L31 82"></path>
    </svg>`;
  }
  return `<svg class="country-map" viewBox="0 0 100 100" aria-hidden="true">
    <path d="M7 43 L14 33 L26 25 L43 22 L62 27 L78 32 L93 45 L87 60 L71 70 L52 72 L34 66 L18 58 Z"></path>
    <path d="M56 10 L65 16 L66 25 L61 32 L70 38 L66 48 L72 58 L65 72 L54 90 L43 80 L45 68 L38 60 L42 51 L35 43 L43 34 L39 26 L48 20 Z"></path>
  </svg>`;
}

function renderTagCloud(rows) {
  const max = Math.max(...rows.map(row => row.count), 1);
  if (!rows.length) {
    document.getElementById("tagCloud").innerHTML = '<div class="empty-state">No tags match the current filters.</div>';
    return;
  }
  document.getElementById("tagCloud").innerHTML = rows.map(row => `
    <button style="--weight:${0.85 + (row.count / max) * 1.2}" data-tag="${escapeHtml(row.name)}">${escapeHtml(row.name)} <span>${row.count}</span></button>
  `).join("");

  document.querySelectorAll("#tagCloud button").forEach(button => {
    button.addEventListener("click", async () => {
      filters.search = button.dataset.tag;
      document.getElementById("searchFilter").value = filters.search;
      await refresh();
    });
  });
}

function renderSegments(rows) {
  document.getElementById("segmentGrid").innerHTML = rows.map(row => `
    <button class="segment-card" data-behavior="${escapeHtml(row.name)}">
      <strong>${escapeHtml(row.name)}</strong>
      <div class="segment-share">${row.share}%</div>
      <span>${row.count} records | ${row.avgFaves} avg faves | ${row.avgSentiment}/100 sentiment</span>
    </button>
  `).join("");

  document.querySelectorAll(".segment-card").forEach(card => {
    card.addEventListener("click", async () => {
      filters.behavior = card.dataset.behavior;
      document.getElementById("behaviorFilter").value = filters.behavior;
      await refresh();
    });
  });
}

function renderForecast(rows) {
  document.getElementById("forecastList").innerHTML = rows.map(row => `
    <div class="forecast-item">
      <strong>${row.period}: ${row.predictedVolume} records</strong>
      <span>${row.predictedEngagement} predicted faves | ${row.confidence}% confidence</span>
    </div>
  `).join("");
}

function renderSignals(id, rows, emptyText) {
  document.getElementById(id).innerHTML = rows.length ? rows.map(row => `
    <div class="signal-item">
      <strong>${escapeHtml(row.type || row.pair || row.title)}</strong>
      <span>${escapeHtml(row.label || row.detail || `${row.count} co-occurrences`)} | ${escapeHtml(row.value || row.impact || "")}</span>
    </div>
  `).join("") : `<div class="signal-item"><strong>${emptyText}</strong></div>`;
}

function renderRecommendations(rows) {
  document.getElementById("recommendations").innerHTML = rows.map(row => `
    <div class="recommendation-item">
      <strong>${escapeHtml(row.title)}</strong>
      <span>${row.impact} impact | ${escapeHtml(row.detail)}</span>
    </div>
  `).join("");
}

function pushStreamItem(item) {
  const feed = document.getElementById("liveFeed");
  const node = document.createElement("article");
  node.className = "feed-item enter";
  node.innerHTML = `
    <strong>${escapeHtml(item.title)}</strong>
    <span>${escapeHtml(item.location)} | ${escapeHtml(item.theme)} | ${item.faves} faves</span>
    <div>${item.tags.map(tag => `<em>${escapeHtml(tag)}</em>`).join("")}</div>
  `;
  feed.prepend(node);
  while (feed.children.length > 8) feed.lastElementChild.remove();
  streamEvents += 1;
  setText("streamCounter", `${streamEvents} events`);
}

function restartStream() {
  clearInterval(streamTimer);
  streamIndex = 0;
  streamEvents = 0;
  document.getElementById("liveFeed").innerHTML = "";
  setText("streamCounter", "0 events");

  if (!currentAnalytics?.stream?.length) return;
  streamTimer = setInterval(() => {
    const item = currentAnalytics.stream[streamIndex % currentAnalytics.stream.length];
    pushStreamItem(item);
    streamIndex += 1;
  }, 1200);
}

function runPipelineAnimation() {
  const nodes = document.querySelectorAll(".pipe-node");
  nodes.forEach(node => node.classList.remove("active", "done"));
  nodes.forEach((node, index) => {
    setTimeout(() => {
      nodes.forEach(other => other.classList.remove("active"));
      node.classList.add("active");
      if (index > 0) nodes[index - 1].classList.add("done");
      if (index === nodes.length - 1) setTimeout(() => node.classList.add("done"), 700);
    }, index * 650);
  });
}

function renderDashboard(data, optionsReady = true) {
  currentAnalytics = data;
  const generated = new Date(data.generatedAt);

  if (optionsReady) {
    populateSelect("datasetFilter", data.options.datasets, filters.dataset);
    populateSelect("locationFilter", data.options.locations, filters.location);
    populateSelect("themeFilter", data.options.themes, filters.theme);
    populateSelect("behaviorFilter", data.options.behaviors, filters.behavior);
  }

  setText("generatedAt", `Generated ${generated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`);
  setText("recordCount", `${formatNumber(data.source.filteredRecords)} of ${formatNumber(data.source.totalRecords)} rows`);
  setText("records", formatNumber(data.summary.records));
  setText("totalFaves", formatNumber(data.summary.totalFaves));
  setText("sentiment", `${data.summary.avgSentiment}/100`);
  setText("uniqueTags", formatNumber(data.summary.uniqueTags));
  setText("pipeIngest", `${formatNumber(data.source.totalRecords)} CSV rows`);

  drawAttentionBars(data.barSeries);
  renderHotspots(data.hotspots, data.map);
  renderTagCloud(data.tags);
  renderSegments(data.behaviors);
  renderForecast(data.forecast.next);
  renderSignals("cooccurrenceList", data.cooccurrence, "No tag links found");
  renderSignals("anomalyList", data.anomalies, "No anomalies detected");
  renderRecommendations(data.recommendations);
  restartStream();
}

async function refresh() {
  const data = await fetchAnalytics();
  renderDashboard(data);
}

function downloadAnalytics() {
  if (!currentAnalytics) return;
  const blob = new Blob([JSON.stringify(currentAnalytics, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "tourist-behaviour-analytics.json";
  link.click();
  URL.revokeObjectURL(url);
}

async function boot() {
  const analytics = await fetchAnalytics();
  renderDashboard(analytics);
}

document.getElementById("datasetFilter").addEventListener("change", async event => {
  filters.dataset = event.target.value;
  await refresh();
});

document.getElementById("locationFilter").addEventListener("change", async event => {
  filters.location = event.target.value;
  await refresh();
});

document.getElementById("themeFilter").addEventListener("change", async event => {
  filters.theme = event.target.value;
  await refresh();
});

document.getElementById("behaviorFilter").addEventListener("change", async event => {
  filters.behavior = event.target.value;
  await refresh();
});

document.getElementById("favesFilter").addEventListener("input", async event => {
  filters.minFaves = Number(event.target.value);
  setText("favesValue", filters.minFaves);
});

document.getElementById("favesFilter").addEventListener("change", refresh);

document.getElementById("searchFilter").addEventListener("search", async event => {
  filters.search = event.target.value;
  await refresh();
});

document.getElementById("searchFilter").addEventListener("keydown", async event => {
  if (event.key === "Enter") {
    filters.search = event.target.value;
    await refresh();
  }
});

document.getElementById("playBtn").addEventListener("click", event => {
  if (streamTimer) {
    clearInterval(streamTimer);
    streamTimer = null;
    event.target.textContent = "Resume Stream";
    setText("streamStatus", "Stream paused");
  } else {
    restartStream();
    event.target.textContent = "Pause Stream";
    setText("streamStatus", "Stream running");
  }
});

document.getElementById("refreshBtn").addEventListener("click", refresh);
document.getElementById("downloadBtn").addEventListener("click", downloadAnalytics);
document.getElementById("runPipelineBtn").addEventListener("click", runPipelineAnimation);


boot().catch(error => {
  document.body.insertAdjacentHTML("afterbegin", `<div class="error-banner">${escapeHtml(error.message)}</div>`);
});

const menuToggle = document.getElementById("menuToggle");
const menuBackdrop = document.getElementById("menuBackdrop");
const sidebar = document.getElementById("sidebar");

function setMenuOpen(open) {
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(!document.body.classList.contains("menu-open"));
});

menuBackdrop.addEventListener("click", () => setMenuOpen(false));

sidebar.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => setMenuOpen(false));
});



// ===== GeoTrail Animation Upgrade =====

function animateCounters() {
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = Number(el.dataset.counter || 0);
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 60));

    const update = () => {
      current += increment;

      if (current >= target) {
        current = target;
      }

      el.textContent = current.toLocaleString();

      if (current < target) {
        requestAnimationFrame(update);
      }
    };

    el.classList.add('counter-pop');
    update();
  });
}

function animateCharts() {
  document.querySelectorAll('.bar, .chart-bar, .chart-column').forEach(bar => {
    bar.classList.add('chart-grow');
  });
}

function applyFadeIns() {
  document.querySelectorAll('.card, .panel, .chart').forEach(el => {
    el.classList.add('fade-in');
  });
}

window.addEventListener('DOMContentLoaded', () => {
  animateCounters();
  animateCharts();
  applyFadeIns();
});
