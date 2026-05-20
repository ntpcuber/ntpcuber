const NAV_ID = "subset-nav";
const SECTIONS_ID = "cll-sections";

// Adjust if you choose a different folder for JSON
// const DATA_URL = "../algorithms/2x2/cll-data.json";
// If cll-render.js is in /js and cll-data.json is in /data
const DATA_URL = new URL("../algorithms/2x2/cll-data.json", import.meta.url);

let cllSets = [];

const state = {
  filter: "all" // "all" or subset id
};

function escapeHTML(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buttonClass(isActive) {
  const base =
    "px-3 py-1 rounded-full border text-sm transition select-none " +
    "border-neutral-800 bg-neutral-900/40 hover:border-indigo-500 hover:bg-indigo-500/10";
  const active = " border-indigo-500 bg-indigo-500/10 text-indigo-200";
  const inactive = " text-neutral-200";
  return base + (isActive ? active : inactive);
}

async function loadData() {
  const host = document.getElementById(SECTIONS_ID);

  try {
    const res = await fetch(DATA_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status} while loading ${DATA_URL}`);

    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("JSON root must be an array");

    // Basic validation to prevent runtime breakage
    cllSets = data.map((set) => ({
      id: set.id,
      title: set.title,
      sectionClass: set.sectionClass || "",
      gridClass: set.gridClass || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      cases: Array.isArray(set.cases) ? set.cases : []
    }));

  } catch (err) {
    console.error("Error loading CLL JSON data:", err);
    if (host) {
      host.innerHTML = `
        <div class="max-w-6xl mx-auto px-6 py-20">
          <div class="rounded-xl border border-red-900/50 bg-red-950/30 p-6 text-red-200">
            <div class="font-semibold mb-1">Failed to load algorithm data</div>
            <div class="text-sm text-red-300/90">
              Check that <span class="font-mono">${escapeHTML(DATA_URL)}</span> exists and that you are running a local server (not file://).
            </div>
          </div>
        </div>
      `;
    }
  }
}

function setHash(idOrAll) {
  if (idOrAll === "all") {
    history.replaceState(null, "", location.pathname + location.search);
  } else {
    history.replaceState(null, "", `#${idOrAll}`);
  }
}

function renderNav() {
  const host = document.getElementById(NAV_ID);
  if (!host) return;

  const pills = [
    { id: "all", label: "All" },
    ...cllSets.map((s) => ({
      id: s.id,
      label: s.title.replace(/^CLL\s+/i, "")
    }))
  ];

  host.innerHTML = `
    <div class="flex flex-wrap gap-2 items-center">
      ${pills
        .map(
          (p) => `
          <button
            type="button"
            class="${buttonClass(state.filter === p.id)}"
            data-filter="${escapeHTML(p.id)}"
          >
            ${escapeHTML(p.label)}
          </button>
        `
        )
        .join("")}
    </div>
  `;

  host.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-filter");
      setFilter(id, { scroll: true, updateHash: true });
    });
  });
}

function cardHTML(c) {
  const alt = c.alt
    ? `<p class="font-mono text-xs text-neutral-400">${escapeHTML(c.alt)}</p>`
    : "";

  return `
    <div class="group bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden hover:border-indigo-500 transition">
      <div class="bg-neutral-950 aspect-square flex items-center justify-center">
        <img src="${escapeHTML(c.img)}" alt="" class="w-48 h-48 object-contain" />
      </div>
      <div class="p-4">
        <p class="font-mono text-sm mb-1">${escapeHTML(c.alg)}</p>
        ${alt}
      </div>
    </div>
  `;
}

function sectionHTML(set) {
  const sectionClass = set.sectionClass ? ` ${set.sectionClass}` : "";
  const gridClass = set.gridClass || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return `
    <section class="py-20${sectionClass}" id="${escapeHTML(set.id)}" data-subset="${escapeHTML(set.id)}">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex items-end justify-between gap-4 mb-10">
          <h2 class="text-3xl font-semibold">${escapeHTML(set.title)}</h2>
          <div class="flex items-center gap-3 text-sm">
            <button
              type="button"
              class="text-indigo-400 hover:text-indigo-300 transition"
              data-show-only="${escapeHTML(set.id)}"
            >
              Show only
            </button>
            <a
              href="#${escapeHTML(set.id)}"
              class="text-neutral-400 hover:text-neutral-200 transition"
              aria-label="Anchor link"
              title="Anchor link"
            >
            </a>
          </div>
        </div>

        <div class="grid ${escapeHTML(gridClass)} gap-6">
          ${set.cases.map(cardHTML).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderSections() {
  const host = document.getElementById(SECTIONS_ID);
  if (!host) return;

  host.innerHTML = cllSets.map(sectionHTML).join("");

  // Wire up "Show only" buttons inside each subset header
  host.querySelectorAll("[data-show-only]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-show-only");
      setFilter(id, { scroll: true, updateHash: true });
    });
  });
}

function setFilter(id, { scroll = true, updateHash = true } = {}) {
  state.filter = id;

  const container = document.getElementById(SECTIONS_ID);
  if (!container) return;

  const sections = container.querySelectorAll("[data-subset]");
  sections.forEach((section) => {
    const sid = section.getAttribute("data-subset");
    const shouldShow = id === "all" || sid === id;
    section.classList.toggle("hidden", !shouldShow);
  });

  renderNav();

  if (updateHash) setHash(id);

  if (scroll && id !== "all") {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (scroll && id === "all") {
    const top = document.getElementById(SECTIONS_ID);
    if (top) top.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function initHashRouting() {
  const hash = (location.hash || "").replace("#", "").trim();
  if (!hash) return;

  const exists = cllSets.some((s) => s.id === hash);
  if (exists) {
    setFilter(hash, { scroll: false, updateHash: false });
    requestAnimationFrame(() => {
      const target = document.getElementById(hash);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

function initHashListener() {
  window.addEventListener("hashchange", () => {
    const hash = (location.hash || "").replace("#", "").trim();
    if (!hash) {
      setFilter("all", { scroll: false, updateHash: false });
      return;
    }
    const exists = cllSets.some((s) => s.id === hash);
    if (exists) setFilter(hash, { scroll: true, updateHash: false });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadData();

  // Only proceed if data loaded successfully
  if (!cllSets.length) return;

  renderNav();
  renderSections();
  initHashRouting();
  initHashListener();
});
