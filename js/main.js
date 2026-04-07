const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

async function loadSite() {
  const res = await fetch(new URL("../data/site.json", import.meta.url));
  if (!res.ok) throw new Error("Could not load data/site.json");
  return res.json();
}

function renderNav(navItems) {
  const desktop = qs(".nav-desktop__list");
  const mobile = qs(".mobile-panel__list");
  const fragD = document.createDocumentFragment();
  const fragM = document.createDocumentFragment();
  for (const item of navItems) {
    const a = document.createElement("a");
    a.href = `#${item.id}`;
    a.textContent = item.label;
    const liD = document.createElement("li");
    const liM = document.createElement("li");
    liD.appendChild(a.cloneNode(true));
    liM.appendChild(a);
    fragD.appendChild(liD);
    fragM.appendChild(liM);
  }
  desktop.appendChild(fragD);
  mobile.appendChild(fragM);
}

function renderCouple(names) {
  const el = qs("#couple-names");
  el.innerHTML = "";
  for (const row of names) {
    const line = document.createElement("span");
    const isAnd = row.line.trim() === "&";
    line.className = isAnd ? "line line--and" : "line";
    line.textContent = row.line;
    el.appendChild(line);
  }
}

function formatDisplayDate(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderHero(images) {
  const sorted = [...images].sort((a, b) => a.position - b.position);
  const slides = qs(".hero__slides");
  const dots = qs(".hero__dots");
  slides.innerHTML = "";
  dots.innerHTML = "";

  sorted.forEach((img, i) => {
    const slide = document.createElement("div");
    slide.className = "hero-slide" + (i === 0 ? " is-active" : "");
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${i + 1} of ${sorted.length}`);
    const image = document.createElement("img");
    image.src = img.url;
    image.alt = img.alt || "";
    image.loading = i === 0 ? "eager" : "lazy";
    image.decoding = "async";
    slide.appendChild(image);
    slides.appendChild(slide);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
    dot.setAttribute("aria-label", `Show slide ${i + 1}`);
    if (i === 0) dot.classList.add("is-active");
    dot.addEventListener("click", () => goToSlide(i));
    dots.appendChild(dot);
  });

  let index = 0;
  const slideEls = () => qsa(".hero-slide", slides);

  function goToSlide(i) {
    const slidesList = slideEls();
    const dotBtns = qsa("button", dots);
    index = (i + slidesList.length) % slidesList.length;
    slidesList.forEach((s, j) => s.classList.toggle("is-active", j === index));
    dotBtns.forEach((b, j) => {
      b.classList.toggle("is-active", j === index);
      b.setAttribute("aria-selected", j === index ? "true" : "false");
    });
  }

  let timer = setInterval(() => goToSlide(index + 1), 6500);
  slides.addEventListener("mouseenter", () => clearInterval(timer));
  slides.addEventListener("mouseleave", () => {
    clearInterval(timer);
    timer = setInterval(() => goToSlide(index + 1), 6500);
  });
}

function renderSchedule(schedule) {
  const host = qs("#schedule-body");
  host.innerHTML = "";
  for (const ev of schedule.events) {
    const card = document.createElement("article");
    card.className = "event-card";
    const h = document.createElement("h3");
    h.textContent = ev.name;
    const meta = document.createElement("div");
    meta.className = "meta";
    const parts = [];
    if (ev.start_at_utc) {
      const t = new Date(ev.start_at_utc);
      parts.push(t.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" }));
    }
    if (ev.attire) parts.push(`Attire: ${ev.attire}`);
    meta.textContent = parts.join(" · ");
    const note = document.createElement("p");
    note.textContent = ev.venue || ev.note || "";
    card.appendChild(h);
    card.appendChild(meta);
    if (note.textContent) card.appendChild(note);
    host.appendChild(card);
  }
}

function renderGallery(images) {
  const grid = qs("#gallery-grid");
  grid.innerHTML = "";
  const sorted = [...images].sort((a, b) => a.position - b.position);
  for (const img of sorted) {
    const image = document.createElement("img");
    image.src = img.url;
    image.alt = img.alt || "";
    image.loading = "lazy";
    grid.appendChild(image);
  }
}

function startCountdown(isoUtc) {
  const el = qs("#countdown");
  const end = new Date(isoUtc).getTime();

  function tick() {
    const now = Date.now();
    let diff = end - now;
    if (diff <= 0) {
      el.textContent = "We are married!";
      return;
    }
    const s = Math.floor(diff / 1000) % 60;
    const m = Math.floor(diff / (1000 * 60)) % 60;
    const h = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    el.textContent = `${d} d  ${h} h  ${m} min  ${s} s`;
  }

  tick();
  setInterval(tick, 1000);
}

function wireMobileNav() {
  const btn = qs(".nav-toggle");
  const panel = qs("#mobile-panel");
  const links = qsa("#mobile-panel a");

  function close() {
    panel.hidden = true;
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("nav-open");
  }

  function open() {
    panel.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Close menu");
    document.body.classList.add("nav-open");
  }

  btn.addEventListener("click", () => {
    if (panel.hidden) open();
    else close();
  });

  links.forEach((a) => a.addEventListener("click", () => close()));
}

function main() {
  loadSite()
    .then((site) => {
      renderNav(site.nav);
      renderCouple(site.couple.names);
      qs("#wedding-date-display").textContent = formatDisplayDate(
        site.wedding.date_iso
      );
      qs("#wedding-place").textContent = `${site.wedding.city}, ${site.wedding.state}`;
      renderHero(site.hero_images);
      renderSchedule(site.schedule);
      qs("#travel-body").innerHTML = site.travel.html;
      qs("#registry-body").innerHTML =
        `<p>${site.registry.message}</p>`;
      qs("#faqs-body").innerHTML = site.faqs.html;
      renderGallery(site.hero_images);
      startCountdown(site.wedding.event_datetime_utc);
      wireMobileNav();
    })
    .catch((err) => {
      console.error(err);
      qs("#main").prepend(
        Object.assign(document.createElement("p"), {
          textContent:
            "Could not load data/site.json. Serve this folder over HTTP (e.g. npx serve) so the JSON file can load.",
          style: "padding:2rem;text-align:center;",
        })
      );
    });
}

main();
