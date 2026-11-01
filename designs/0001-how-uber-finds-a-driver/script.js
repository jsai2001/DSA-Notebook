// How Uber finds a driver: the interactive scenes in this card (system-design.html).
// Plain browser JS, no dependencies. Each scene is set up by its own function
// at the bottom of the file.
(function () {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";
  const SQ3 = Math.sqrt(3);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const $ = (id) => document.getElementById(id);
  const fmt = (n) => n.toLocaleString("en-US");

  // Resolves after ms, or right away when the user prefers reduced motion.
  const wait = (ms) => new Promise((res) => setTimeout(res, reduceMotion.matches ? 0 : ms));

  function svgEl(tag, attrs, parent) {
    const node = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs || {})) node.setAttribute(k, v);
    if (parent) parent.appendChild(node);
    return node;
  }

  function svgText(parent, x, y, text, attrs) {
    const t = svgEl("text", Object.assign({ x, y }, attrs || {}), parent);
    t.textContent = text;
    return t;
  }

  // Client (mouse / touch) position -> SVG user units.
  function svgPoint(svg, evt) {
    const pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }

  // Small seeded random generator so the city looks the same on every load.
  function makeRng(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);


  // ---------- Hexagon grid (pointy-top, axial coordinates q, r) ----------
  // Same maths H3 relies on for neighbours: ring k around a cell has 6k cells.
  function makeHexGrid(size, ox, oy) {
    const grid = {
      size,
      center(q, r) {
        return { x: ox + size * SQ3 * (q + r / 2), y: oy + size * 1.5 * r };
      },
      corners(cx, cy) {
        const pts = [];
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 180) * (60 * i - 30);
          pts.push(`${(cx + size * Math.cos(a)).toFixed(2)},${(cy + size * Math.sin(a)).toFixed(2)}`);
        }
        return pts.join(" ");
      },
      fromPixel(x, y) {
        const px = x - ox;
        const py = y - oy;
        const q = ((SQ3 / 3) * px - py / 3) / size;
        const r = ((2 / 3) * py) / size;
        return cubeRound(q, r);
      },
      // All cells whose centre lies within the w x h area (plus a margin).
      cover(w, h) {
        const cells = [];
        const rows = Math.ceil(h / (size * 1.5)) + 2;
        const cols = Math.ceil(w / (size * SQ3)) + 2;
        for (let r = -1; r <= rows; r++) {
          for (let c = -1; c <= cols; c++) {
            const q = c - Math.floor(r / 2);
            const p = grid.center(q, r);
            if (p.x > -size && p.x < w + size && p.y > -size && p.y < h + size) {
              cells.push({ q, r, key: `${q},${r}`, x: p.x, y: p.y });
            }
          }
        }
        return cells;
      },
    };
    return grid;
  }

  function cubeRound(q, r) {
    const s = -q - r;
    let rq = Math.round(q);
    let rr = Math.round(r);
    const rs = Math.round(s);
    const dq = Math.abs(rq - q);
    const dr = Math.abs(rr - r);
    const ds = Math.abs(rs - s);
    if (dq > dr && dq > ds) rq = -rr - rs;
    else if (dr > ds) rr = -rq - rs;
    return { q: rq, r: rr, key: `${rq},${rr}` };
  }

  const hexDistance = (a, b) =>
    (Math.abs(a.q - b.q) + Math.abs(a.q + a.r - b.q - b.r) + Math.abs(a.r - b.r)) / 2;

  // ---------- The shared city (scenes 1 and 2) ----------
  const CITY_W = 720;
  const CITY_H = 440;
  const cityGrid = makeHexGrid(24, 12, 14);

  function makeDrivers(count, seed) {
    const rand = makeRng(seed);
    const drivers = [];
    for (let i = 0; i < count; i++) {
      const x = 10 + rand() * (CITY_W - 20);
      const y = 10 + rand() * (CITY_H - 20);
      drivers.push({ id: i + 1, x, y, cell: cityGrid.fromPixel(x, y) });
    }
    return drivers;
  }

  function drawStreets(parent, w, h, step) {
    const g = svgEl("g", { "aria-hidden": "true" }, parent);
    for (let x = step / 2; x < w; x += step) svgEl("line", { class: "street", x1: x, y1: 0, x2: x, y2: h }, g);
    for (let y = step / 2; y < h; y += step) svgEl("line", { class: "street", x1: 0, y1: y, x2: w, y2: y }, g);
    return g;
  }

  function drawRider(parent, label) {
    const g = svgEl("g", { class: "rider" }, parent);
    svgEl("circle", { class: "halo", r: 14 }, g);
    svgEl("circle", { class: "dot", r: 7 }, g);
    svgText(g, 0, -18, label || "You", { "text-anchor": "middle" });
    return g;
  }

  // Random spot that isn't hugging the edge, for the "move me" buttons.
  const spotRng = makeRng(7);
  const randomSpot = () => ({ x: 80 + spotRng() * (CITY_W - 160), y: 70 + spotRng() * (CITY_H - 140) });

  // ---------- Scene 1: check every driver ----------
  function setupNaive() {
    const svg = $("naive-map");
    drawStreets(svg, CITY_W, CITY_H, 60);
    const lines = svgEl("g", { "aria-hidden": "true" }, svg);
    const dots = svgEl("g", { "aria-hidden": "true" }, svg);
    const drivers = makeDrivers(400, 42);
    const nodes = drivers.map((d) => svgEl("circle", { class: "driver", cx: d.x, cy: d.y, r: 3.5 }, dots));
    const riderNode = drawRider(svg);
    let rider = { x: CITY_W / 2, y: CITY_H / 2 };
    let token = 0;

    function placeRider() {
      riderNode.setAttribute("transform", `translate(${rider.x.toFixed(1)} ${rider.y.toFixed(1)})`);
    }
    function reset() {
      token++;
      lines.replaceChildren();
      nodes.forEach((n) => n.setAttribute("class", "driver"));
      $("naive-checks").textContent = "0";
      $("naive-nearest").textContent = "–";
      $("naive-status").textContent = "";
    }

    async function run() {
      reset();
      const my = token;
      const btn = $("naive-run");
      btn.disabled = true;
      let best = null;
      let bestD = Infinity;
      const BATCH = 16;
      for (let i = 0; i < drivers.length; i++) {
        const d = drivers[i];
        svgEl("line", { class: "scan-line", x1: rider.x, y1: rider.y, x2: d.x, y2: d.y }, lines);
        const dd = dist(d, rider);
        if (dd < bestD) {
          bestD = dd;
          best = i;
        }
        if ((i + 1) % BATCH === 0 || i === drivers.length - 1) {
          $("naive-checks").textContent = fmt(i + 1);
          await wait(25);
          if (my !== token) {
            btn.disabled = false;
            return;
          }
        }
      }
      const b = drivers[best];
      svgEl("line", { class: "pick-line", x1: rider.x, y1: rider.y, x2: b.x, y2: b.y }, lines);
      nodes[best].setAttribute("class", "driver is-pick");
      nodes[best].setAttribute("r", 6);
      $("naive-nearest").textContent = `#${b.id}`;
      $("naive-status").textContent =
        `Found driver #${b.id}, but only after ${fmt(drivers.length)} distance calculations for a single request. ` +
        `A real city has tens of thousands of drivers and thousands of riders asking at once.`;
      btn.disabled = false;
    }

    function moveTo(p) {
      nodes.forEach((n) => n.setAttribute("r", 3.5));
      rider = p;
      placeRider();
      reset();
    }

    svg.addEventListener("click", (e) => moveTo(svgPoint(svg, e)));
    $("naive-move").addEventListener("click", () => moveTo(randomSpot()));
    $("naive-run").addEventListener("click", run);
    placeRider();

    // Calculator
    const dIn = $("calc-drivers");
    const rIn = $("calc-riders");
    function calc() {
      const d = Number(dIn.value);
      const r = Number(rIn.value);
      $("calc-drivers-out").textContent = fmt(d);
      $("calc-riders-out").textContent = fmt(r);
      $("calc-total").textContent = fmt(d * r);
    }
    dIn.addEventListener("input", calc);
    rIn.addEventListener("input", calc);
    calc();
  }

  // ---------- Scene 2: hexagon cells and rings ----------
  function setupHexes() {
    const svg = $("hex-map");
    drawStreets(svg, CITY_W, CITY_H, 60);
    const cellLayer = svgEl("g", { "aria-hidden": "true" }, svg);
    const lines = svgEl("g", { "aria-hidden": "true" }, svg);
    const dots = svgEl("g", { "aria-hidden": "true" }, svg);
    const riderNode = drawRider(svg);

    const cells = cityGrid.cover(CITY_W, CITY_H);
    const cellNodes = new Map();
    for (const c of cells) {
      cellNodes.set(c.key, svgEl("polygon", { class: "cell", points: cityGrid.corners(c.x, c.y) }, cellLayer));
    }

    let rider = { x: CITY_W / 2, y: CITY_H / 2 };
    let drivers = [];
    let nodes = [];
    let token = 0;
    const MAX_RING = 4;

    function setDensity(count) {
      drivers = makeDrivers(count, count === 400 ? 42 : 99);
      dots.replaceChildren();
      nodes = drivers.map((d) => svgEl("circle", { class: "driver", cx: d.x, cy: d.y, r: 3.5 }, dots));
      reset();
    }
    function placeRider() {
      riderNode.setAttribute("transform", `translate(${rider.x.toFixed(1)} ${rider.y.toFixed(1)})`);
    }
    function reset() {
      token++;
      lines.replaceChildren();
      cellNodes.forEach((n) => n.setAttribute("class", "cell"));
      nodes.forEach((n) => {
        n.setAttribute("class", "driver");
        n.setAttribute("r", 3.5);
      });
      $("hex-cells").textContent = "0";
      $("hex-checked").textContent = "0";
      $("hex-skipped").textContent = "0";
      $("hex-status").textContent = "";
      $("hex-run").disabled = false;
    }

    async function run() {
      reset();
      const my = token;
      const btn = $("hex-run");
      btn.disabled = true;
      const needed = Number($("hex-needed").value);
      const home = cityGrid.fromPixel(rider.x, rider.y);
      // Index drivers by cell, the way a real system would: cell -> drivers.
      const byCell = new Map();
      drivers.forEach((d, i) => {
        if (!byCell.has(d.cell.key)) byCell.set(d.cell.key, []);
        byCell.get(d.cell.key).push(i);
      });

      let found = [];
      let ring = 0;
      for (ring = 0; ring <= MAX_RING; ring++) {
        // Light up ring `ring` and gather the drivers in its cells.
        for (const c of cells) {
          const k = hexDistance(c, home);
          if (k === ring) {
            cellNodes.get(c.key).setAttribute("class", `cell ring-${Math.min(ring, 3)}`);
            for (const i of byCell.get(c.key) || []) {
              found.push(i);
              nodes[i].setAttribute("class", "driver is-candidate");
            }
          }
        }
        const totalCells = 3 * ring * (ring + 1) + 1;
        $("hex-cells").textContent = fmt(totalCells);
        $("hex-checked").textContent = fmt(found.length);
        $("hex-skipped").textContent = fmt(drivers.length - found.length);
        const enough = found.length >= needed;
        $("hex-status").textContent =
          ring === 0
            ? `Your cell has ${found.length} driver${found.length === 1 ? "" : "s"}.${enough ? "" : " Not enough, so add the 6 neighbours."}`
            : `Ring ${ring}: ${totalCells} cells, ${found.length} driver${found.length === 1 ? "" : "s"}.${
                enough || ring === MAX_RING ? "" : ` Still fewer than ${needed}, so add the next ring.`
              }`;
        if (enough) break;
        await wait(900);
        if (my !== token) return;
      }

      // Rank the candidates (straight line here; scene 5 shows why real ranking uses road ETA).
      found.sort((a, b) => dist(drivers[a], rider) - dist(drivers[b], rider));
      for (const i of found) {
        const d = drivers[i];
        svgEl("line", { class: "cand-line", x1: rider.x, y1: rider.y, x2: d.x, y2: d.y }, lines);
      }
      if (found.length) {
        const b = drivers[found[0]];
        svgEl("line", { class: "pick-line", x1: rider.x, y1: rider.y, x2: b.x, y2: b.y }, lines);
        nodes[found[0]].setAttribute("class", "driver is-pick");
        nodes[found[0]].setAttribute("r", 6);
      }
      const shownRing = Math.min(ring, MAX_RING);
      const totalCells = 3 * shownRing * (shownRing + 1) + 1;
      const pct = ((found.length / drivers.length) * 100).toFixed(1);
      $("hex-status").textContent =
        found.length >= needed
          ? `Done: searched ${totalCells} cell${totalCells === 1 ? "" : "s"} and checked ${found.length} of ${fmt(drivers.length)} drivers (${pct}%). The other ${fmt(drivers.length - found.length)} were never looked at.`
          : `Searched ${totalCells} cells and only found ${found.length}. A real search would keep widening, or tell you no cars are nearby.`;
      btn.disabled = false;
    }

    function moveTo(p) {
      rider = p;
      placeRider();
      reset();
    }

    svg.addEventListener("click", (e) => moveTo(svgPoint(svg, e)));
    $("hex-move").addEventListener("click", () => moveTo(randomSpot()));
    $("hex-run").addEventListener("click", run);
    const needIn = $("hex-needed");
    needIn.addEventListener("input", () => {
      $("hex-needed-out").textContent = needIn.value;
      reset();
    });
    document.querySelectorAll("#hexes [data-density]").forEach((b) => {
      b.addEventListener("click", () => {
        document.querySelectorAll("#hexes [data-density]").forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
        setDensity(Number(b.dataset.density));
      });
    });
    placeRider();
    setDensity(400);
  }

  // ---------- Scene 3: squares vs hexagons ----------
  function setupWhyHex() {
    const svg = $("why-svg");
    const UNIT = 70; // distance between side-neighbour centres, in px
    const reaches = [];

    // Square grid on the left
    const sq = { x: 170, y: 175 };
    svgText(svg, sq.x, 34, "Square grid", { class: "title-text", "text-anchor": "middle" });
    const sqG = svgEl("g", {}, svg);
    const sqPts = [];
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const cx = sq.x + dx * UNIT;
        const cy = sq.y + dy * UNIT;
        svgEl("rect", {
          class: dx === 0 && dy === 0 ? "shape center" : "shape",
          x: cx - UNIT / 2, y: cy - UNIT / 2, width: UNIT, height: UNIT,
        }, sqG);
        if (dx || dy) sqPts.push({ x: cx, y: cy, far: dx !== 0 && dy !== 0 });
      }
    }
    for (const p of sqPts) {
      svgEl("line", { class: p.far ? "far" : "near", x1: sq.x, y1: sq.y, x2: p.x, y2: p.y }, sqG);
    }
    for (const p of sqPts) {
      svgEl("circle", { class: p.far ? "pt far-pt" : "pt", cx: p.x, cy: p.y, r: 5 }, sqG);
      const mx = (sq.x + p.x) / 2;
      const my = (sq.y + p.y) / 2;
      svgText(sqG, mx + (p.far ? 10 : p.x === sq.x ? 16 : 0), my + (p.far ? 0 : p.y === sq.y ? -8 : 4),
        p.far ? "1.41" : "1.0", { class: p.far ? "len far-len" : "len near-len", "text-anchor": "middle" });
    }
    svgEl("circle", { class: "pt", cx: sq.x, cy: sq.y, r: 6 }, sqG);
    reaches.push(svgEl("circle", { class: "reach", cx: sq.x, cy: sq.y, r: UNIT }, sqG));

    // Hexagon cluster on the right: neighbour centres are size * sqrt(3) apart.
    const hx = { x: 510, y: 175 };
    const size = UNIT / SQ3;
    const hexGrid = makeHexGrid(size, hx.x, hx.y);
    svgText(svg, hx.x, 34, "Hexagon grid", { class: "title-text", "text-anchor": "middle" });
    const hxG = svgEl("g", {}, svg);
    const ring = [[1, 0], [1, -1], [0, -1], [-1, 0], [-1, 1], [0, 1]];
    svgEl("polygon", { class: "shape center", points: hexGrid.corners(hx.x, hx.y) }, hxG);
    const hxPts = ring.map(([q, r]) => hexGrid.center(q, r));
    for (const p of hxPts) svgEl("polygon", { class: "shape", points: hexGrid.corners(p.x, p.y) }, hxG);
    for (const p of hxPts) svgEl("line", { class: "near", x1: hx.x, y1: hx.y, x2: p.x, y2: p.y }, hxG);
    for (const p of hxPts) {
      svgEl("circle", { class: "pt", cx: p.x, cy: p.y, r: 5 }, hxG);
      const mx = (hx.x + p.x) / 2;
      const my = (hx.y + p.y) / 2;
      svgText(hxG, mx + (p.y === hx.y ? 0 : 12), my + (p.y === hx.y ? -8 : 4), "1.0", {
        class: "len near-len", "text-anchor": "middle",
      });
    }
    svgEl("circle", { class: "pt", cx: hx.x, cy: hx.y, r: 6 }, hxG);
    reaches.push(svgEl("circle", { class: "reach", cx: hx.x, cy: hx.y, r: UNIT }, hxG));

    svgText(svg, sq.x, 300, "Corners sit outside the circle", { class: "len far-len", "text-anchor": "middle" });
    svgText(svg, hx.x, 300, "Every neighbour is on the circle", { class: "len near-len", "text-anchor": "middle" });

    const toggle = $("why-circle");
    const sync = () => reaches.forEach((c) => (toggle.checked ? c.removeAttribute("hidden") : c.setAttribute("hidden", "")));
    toggle.addEventListener("change", sync);
    sync();
  }

  // ---------- Scene 4: keep only the latest location ----------
  function setupLatest() {
    const svg = $("ping-map");
    const W = 420;
    const H = 300;
    const grid = makeHexGrid(30, 15, 15);
    const cellLayer = svgEl("g", { "aria-hidden": "true" }, svg);
    for (const c of grid.cover(W, H)) svgEl("polygon", { class: "cell", points: grid.corners(c.x, c.y) }, cellLayer);
    const trails = svgEl("g", { "aria-hidden": "true" }, svg);
    const live = svgEl("g", { "aria-hidden": "true" }, svg);

    const PING_EVERY = 4; // seconds
    const TRAIL_MAX = 8;
    const rand = makeRng(5);
    const colors = ["var(--rider)", "var(--pick)", "var(--medium-text)", "var(--hard-text)"];
    const drivers = ["D1", "D2", "D3", "D4"].map((name, i) => {
      const angle = rand() * Math.PI * 2;
      const d = {
        name,
        color: colors[i],
        x: 60 + rand() * (W - 120),
        y: 50 + rand() * (H - 100),
        vx: Math.cos(angle) * 9,
        vy: Math.sin(angle) * 9,
        phase: i, // drivers ping at different seconds
        trail: [],
        stored: null,
        storedAt: 0,
      };
      d.dot = svgEl("circle", { r: 7, cx: d.x, cy: d.y, fill: d.color, stroke: "var(--card-bg)", "stroke-width": 2 }, live);
      d.label = svgText(live, d.x, d.y - 12, name, { class: "label-text", "text-anchor": "middle" });
      return d;
    });

    const tbody = $("ping-rows");
    drivers.forEach((d) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `<th scope="row"><span class="swatch-dot" style="background:${d.color}"></span>${d.name}</th><td>–</td><td>–</td><td>–</td>`;
      tbody.appendChild(tr);
      d.row = tr;
    });

    let clock = 0;
    let pings = 0;
    let timer = null;
    let userPaused = false;

    // Pretend lat/lng so the table reads like real data.
    const latLng = (d) => `${(12.97 + (H - d.y) / 4000).toFixed(4)}, ${(77.59 + d.x / 4000).toFixed(4)}`;

    function ping(d) {
      if (d.stored) {
        // The previous ping becomes history: shown faded, but not kept in the store.
        const old = svgEl("circle", { class: "trail", cx: d.stored.x, cy: d.stored.y, r: 4, fill: d.color }, trails);
        d.trail.push(old);
        if (d.trail.length > TRAIL_MAX) d.trail.shift().remove();
        d.trail.forEach((n, i) => n.setAttribute("opacity", (0.12 + (0.4 * (i + 1)) / d.trail.length).toFixed(2)));
      }
      d.stored = { x: d.x, y: d.y };
      d.storedAt = clock;
      pings++;
      const cell = grid.fromPixel(d.x, d.y);
      d.row.cells[1].textContent = latLng(d);
      d.row.cells[2].textContent = `hex ${cell.q},${cell.r}`;
      d.row.classList.add("is-new");
      requestAnimationFrame(() => setTimeout(() => d.row.classList.remove("is-new"), 300));

      if (!reduceMotion.matches) {
        const ring = svgEl("circle", { class: "ping-ring", cx: d.x, cy: d.y, r: 8 }, live);
        ring.animate([{ r: 8, opacity: 1 }, { r: 26, opacity: 0 }], { duration: 700, easing: "ease-out" }).onfinish = () => ring.remove();
      }
    }

    function tick() {
      clock++;
      for (const d of drivers) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 20 || d.x > W - 20) d.vx *= -1;
        if (d.y < 20 || d.y > H - 20) d.vy *= -1;
        // Wander a little so paths aren't straight lines.
        const turn = (rand() - 0.5) * 0.5;
        const c = Math.cos(turn);
        const s = Math.sin(turn);
        [d.vx, d.vy] = [d.vx * c - d.vy * s, d.vx * s + d.vy * c];
        d.dot.setAttribute("cx", d.x.toFixed(1));
        d.dot.setAttribute("cy", d.y.toFixed(1));
        d.label.setAttribute("x", d.x.toFixed(1));
        d.label.setAttribute("y", (d.y - 12).toFixed(1));
        if ((clock + d.phase) % PING_EVERY === 0) ping(d);
        d.row.cells[3].textContent = d.stored ? `${clock - d.storedAt} s` : "–";
      }
      $("ping-clock").textContent = `${clock} s`;
      $("ping-count").textContent = fmt(pings);
      $("ping-rows-count").textContent = String(drivers.length);
    }

    const playBtn = $("ping-play");
    function play() {
      if (timer) return;
      timer = setInterval(tick, 1000);
      playBtn.textContent = "Pause";
      playBtn.setAttribute("aria-pressed", "true");
    }
    function pause() {
      clearInterval(timer);
      timer = null;
      playBtn.textContent = "Play";
      playBtn.setAttribute("aria-pressed", "false");
    }
    playBtn.addEventListener("click", () => {
      if (timer) {
        userPaused = true;
        pause();
      } else {
        userPaused = false;
        play();
      }
    });
    $("ping-step").addEventListener("click", () => {
      userPaused = true;
      pause();
      tick();
    });

    // Every driver sends a first ping so the store isn't empty.
    drivers.forEach(ping);
    drivers.forEach((d) => (d.row.cells[3].textContent = "0 s"));
    $("ping-count").textContent = fmt(pings);

    // Play while on screen (unless the user paused or prefers less motion).
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !userPaused && !reduceMotion.matches) play();
          else if (!e.isIntersecting) pause();
        }
      }, { threshold: 0.4 }).observe($("latest"));
    }
  }

  // ---------- Scene 5: straight line vs road ETA ----------
  function setupEta() {
    const svg = $("eta-map");
    const M_PER_PX = 3; // 100 px = 300 m
    const rider = { x: 385, y: 190 };
    const drivers = [
      { name: "A", x: 285, y: 190, eta: 15, why: "across the river; the only bridge is far north and busy",
        route: [[285, 190], [285, 40], [385, 40], [385, 190]] },
      { name: "B", x: 600, y: 320, eta: 4, why: "same side, straight down a main road",
        route: [[600, 320], [600, 190], [385, 190]] },
      { name: "C", x: 520, y: 60, eta: 7, why: "same side, but one-way streets force a detour",
        route: [[520, 60], [620, 60], [620, 120], [455, 120], [455, 190], [385, 190]] },
    ];
    drivers.forEach((d) => (d.meters = Math.round((dist(d, rider) * M_PER_PX) / 10) * 10));

    // Streets
    const streets = svgEl("g", { "aria-hidden": "true" }, svg);
    const streetLines = [
      [[40, 40], [285, 40]], [[40, 190], [285, 190]], [[40, 320], [285, 320]],
      [[120, 20], [120, 340]], [[285, 20], [285, 340]], [[200, 20], [200, 340]],
      [[385, 20], [385, 340]], [[455, 20], [455, 340]], [[600, 20], [600, 340]], [[520, 20], [520, 340]],
      [[385, 40], [620, 40]], [[385, 60], [620, 60]], [[385, 120], [620, 120]], [[385, 190], [620, 190]], [[385, 320], [620, 320]],
      [[620, 20], [620, 340]],
    ];
    for (const [[x1, y1], [x2, y2]] of streetLines) svgEl("line", { class: "street", x1, y1, x2, y2 }, streets);

    // River with one bridge near the top
    svgEl("path", {
      class: "water",
      d: "M 310 0 C 330 80, 300 160, 318 240 S 330 330, 315 360 L 360 360 C 375 330, 352 250, 362 170 S 345 70, 358 0 Z",
    }, svg);
    svgEl("rect", { class: "bridge", x: 290, y: 32, width: 90, height: 16, rx: 3 }, svg);
    svgText(svg, 335, 75, "River", { class: "label-text", "text-anchor": "middle", "font-style": "italic" });
    svgText(svg, 335, 26, "Bridge", { class: "label-text", "text-anchor": "middle" });

    const pathLayer = svgEl("g", { "aria-hidden": "true" }, svg);
    const dotLayer = svgEl("g", { "aria-hidden": "true" }, svg);
    for (const d of drivers) {
      d.straight = svgEl("line", { class: "straight", x1: d.x, y1: d.y, x2: rider.x, y2: rider.y }, pathLayer);
      d.road = svgEl("polyline", { class: "route", points: d.route.map((p) => p.join(",")).join(" ") }, pathLayer);
      d.dot = svgEl("circle", { class: "driver", cx: d.x, cy: d.y, r: 8 }, dotLayer);
      svgText(dotLayer, d.x, d.y - 14, d.name, { class: "label-text", "text-anchor": "middle" });
      d.tag = svgText(dotLayer, d.x, d.y + 26, "", { class: "label-text", "text-anchor": "middle" });
    }
    const riderNode = drawRider(svg);
    riderNode.setAttribute("transform", `translate(${rider.x} ${rider.y})`);

    const tbody = $("eta-rows");
    function render(mode) {
      const byLine = mode === "line";
      const ranked = [...drivers].sort((a, b) => (byLine ? a.meters - b.meters : a.eta - b.eta));
      const best = ranked[0];
      for (const d of drivers) {
        const isBest = d === best;
        d.straight.style.display = byLine ? "" : "none";
        d.road.style.display = byLine ? "none" : "";
        d.straight.setAttribute("class", `straight${isBest ? " is-best" : ""}`);
        d.road.setAttribute("class", `route${isBest ? " is-best" : ""}`);
        d.dot.setAttribute("class", `driver${isBest ? " is-pick" : ""}`);
        d.tag.textContent = byLine ? `${d.meters} m` : `${d.eta} min`;
      }
      tbody.replaceChildren();
      ranked.forEach((d, i) => {
        const tr = document.createElement("tr");
        if (i === 0) tr.className = "is-best";
        tr.innerHTML = `<td>${i + 1}</td><th scope="row">${d.name}</th><td>${d.meters} m</td><td>${d.eta} min</td>`;
        tbody.appendChild(tr);
      });
      $("eta-status").textContent = byLine
        ? `Straight line picks ${best.name} (${best.meters} m), but ${best.name} is ${best.why}: ${best.eta} minutes to reach you.`
        : `Road ETA picks ${best.name}: ${best.eta} minutes (${best.why}), even though it's ${best.meters} m away in a straight line.`;
    }

    const buttons = document.querySelectorAll("#eta [data-rank]");
    buttons.forEach((b) =>
      b.addEventListener("click", () => {
        buttons.forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
        render(b.dataset.rank);
      })
    );
    render("line");
  }

  // ---------- Scene 6: batch matching ----------
  function setupBatch() {
    const svg = $("batch-svg");
    const RIDERS = ["You", "John"];
    const DRIVERS = ["D1", "D2", "D3"];
    // Matches the story: D1 is 4 min from you and 2 from John; John's next
    // best is 15 min; your next best is 5 min.
    const DEFAULT = [
      [4, 5, 12],
      [2, 18, 15],
    ];
    let eta = DEFAULT.map((row) => row.slice());
    let mode = "greedy";

    const riderPos = [{ x: 120, y: 95 }, { x: 120, y: 215 }];
    const driverPos = [{ x: 520, y: 60 }, { x: 520, y: 150 }, { x: 520, y: 240 }];

    const lineLayer = svgEl("g", { "aria-hidden": "true" }, svg);
    const labelLayer = svgEl("g", { "aria-hidden": "true" }, svg);
    const nodeLayer = svgEl("g", { "aria-hidden": "true" }, svg);
    const pairLines = RIDERS.map((_, r) =>
      DRIVERS.map((_, d) => svgEl("line", {
        class: "assign", x1: riderPos[r].x, y1: riderPos[r].y, x2: driverPos[d].x, y2: driverPos[d].y,
      }, lineLayer))
    );
    RIDERS.forEach((name, r) => {
      const g = svgEl("g", { class: "node rider-node", transform: `translate(${riderPos[r].x} ${riderPos[r].y})` }, nodeLayer);
      svgEl("circle", { r: 22 }, g);
      svgText(g, -34, 5, name, { "text-anchor": "end", "font-weight": "600" });
    });
    DRIVERS.forEach((name, d) => {
      const g = svgEl("g", { class: "node driver-node", transform: `translate(${driverPos[d].x} ${driverPos[d].y})` }, nodeLayer);
      svgEl("circle", { r: 22 }, g);
      svgText(g, 0, 5, name, { class: "inside", "text-anchor": "middle" });
    });

    // Every way to give the two riders two different drivers.
    function options() {
      const all = [];
      for (let a = 0; a < DRIVERS.length; a++) {
        for (let b = 0; b < DRIVERS.length; b++) {
          if (a !== b) all.push({ pick: [a, b], total: eta[0][a] + eta[1][b] });
        }
      }
      return all;
    }
    // One at a time, in request order: each rider takes their closest free driver.
    function greedy() {
      const taken = new Set();
      return RIDERS.map((_, r) => {
        let best = -1;
        for (let d = 0; d < DRIVERS.length; d++) {
          if (!taken.has(d) && (best < 0 || eta[r][d] < eta[r][best])) best = d;
        }
        taken.add(best);
        return best;
      });
    }
    function batch() {
      return options().reduce((best, o) => (o.total < best.total ? o : best)).pick;
    }

    const matrix = $("batch-matrix");
    const inputs = RIDERS.map((name, r) => {
      const tr = document.createElement("tr");
      const th = document.createElement("th");
      th.scope = "row";
      th.textContent = name;
      tr.appendChild(th);
      const row = DRIVERS.map((dname, d) => {
        const td = document.createElement("td");
        const input = document.createElement("input");
        input.type = "number";
        input.min = "1";
        input.max = "60";
        input.step = "1";
        input.inputMode = "numeric";
        input.value = String(eta[r][d]);
        input.setAttribute("aria-label", `${dname} to ${name}, minutes`);
        input.addEventListener("input", () => {
          const v = Number(input.value);
          const ok = Number.isInteger(v) && v >= 1 && v <= 60;
          input.setAttribute("aria-invalid", String(!ok));
          if (ok) {
            eta[r][d] = v;
            render();
          }
        });
        td.appendChild(input);
        tr.appendChild(td);
        return input;
      });
      matrix.appendChild(tr);
      return row;
    });

    function render() {
      const g = greedy();
      const b = batch();
      const pick = mode === "greedy" ? g : b;
      labelLayer.replaceChildren();
      RIDERS.forEach((_, r) =>
        DRIVERS.forEach((_, d) => {
          const chosen = pick[r] === d;
          pairLines[r][d].setAttribute("class", `assign${chosen ? " is-chosen" : ""}`);
          if (chosen) {
            const rp = riderPos[r];
            const dp = driverPos[d];
            const t = 0.85; // put the label near the driver, where lines are apart
            const lx = rp.x + (dp.x - rp.x) * t;
            const ly = rp.y + (dp.y - rp.y) * t - 8;
            const order = mode === "greedy" ? `${r + 1}. ` : "";
            svgText(labelLayer, lx, ly, `${order}${eta[r][d]} min`, { class: "label-text", "text-anchor": "middle" });
          }
        })
      );

      const you = eta[0][pick[0]];
      const john = eta[1][pick[1]];
      $("batch-you").textContent = `${you} min (${DRIVERS[pick[0]]})`;
      $("batch-john").textContent = `${john} min (${DRIVERS[pick[1]]})`;
      $("batch-total").textContent = `${you + john} min`;

      const gTotal = eta[0][g[0]] + eta[1][g[1]];
      const bTotal = eta[0][b[0]] + eta[1][b[1]];
      const same = g[0] === b[0] && g[1] === b[1];
      if (mode === "greedy") {
        $("batch-status").textContent = same
          ? `You take your closest driver (${DRIVERS[g[0]]}), then John takes his closest free one. Here that's already the best plan: ${gTotal} min total.`
          : `You ask first and get your closest driver, ${DRIVERS[g[0]]} (${eta[0][g[0]]} min). John is left with ${DRIVERS[g[1]]}: ${eta[1][g[1]]} min. Total wait ${gTotal} min.`;
      } else {
        $("batch-status").textContent = same
          ? `The batch finds the same plan as one at a time: ${bTotal} min total.`
          : `Looking at both requests together: you wait ${eta[0][b[0]] - eta[0][g[0]] >= 0 ? `${eta[0][b[0]] - eta[0][g[0]]} min longer` : `${eta[0][g[0]] - eta[0][b[0]]} min less`}` +
            ` (${eta[0][g[0]]} → ${eta[0][b[0]]}), John goes from ${eta[1][g[1]]} to ${eta[1][b[1]]} min. Total drops from ${gTotal} to ${bTotal} min.`;
      }

      const tbody = $("batch-options");
      tbody.replaceChildren();
      options()
        .sort((x, y) => x.total - y.total)
        .forEach((o) => {
          const tr = document.createElement("tr");
          const isBatch = o.pick[0] === b[0] && o.pick[1] === b[1];
          const isGreedy = o.pick[0] === g[0] && o.pick[1] === g[1];
          if (isBatch) tr.className = "is-best";
          const tags = [isBatch ? "Batch picks this" : "", isGreedy ? "One at a time" : ""]
            .filter(Boolean)
            .map((t) => `<span class="tag-pill">${t}</span>`)
            .join(" ");
          tr.innerHTML =
            `<td>${DRIVERS[o.pick[0]]} (${eta[0][o.pick[0]]} min)</td>` +
            `<td>${DRIVERS[o.pick[1]]} (${eta[1][o.pick[1]]} min)</td>` +
            `<td>${o.total} min</td><td>${tags}</td>`;
          tbody.appendChild(tr);
        });
    }

    const buttons = document.querySelectorAll("#batch [data-mode]");
    buttons.forEach((btn) =>
      btn.addEventListener("click", () => {
        buttons.forEach((o) => o.setAttribute("aria-pressed", String(o === btn)));
        mode = btn.dataset.mode;
        render();
      })
    );
    $("batch-reset").addEventListener("click", () => {
      eta = DEFAULT.map((row) => row.slice());
      inputs.forEach((row, r) =>
        row.forEach((input, d) => {
          input.value = String(eta[r][d]);
          input.setAttribute("aria-invalid", "false");
        })
      );
      render();
    });
    render();
  }

  setupNaive();
  setupHexes();
  setupWhyHex();
  setupLatest();
  setupEta();
  setupBatch();
})();
