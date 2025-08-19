import React, { useEffect, useMemo, useRef, useState } from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen grid place-items-center p-6">
          <div className="pixel-card bg-white/90 p-6 text-center">
            <h2 className="font-mono text-xl">Something went wrong</h2>
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = "/";
              }}
              className="mt-3 inline-block pixel-border bg-white/80 px-3 py-1 hover:bg-white"
            >
              Back Home
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const PROJECTS = [
  {
    slug: "countdown-live-wallpaper",
    title: "Countdown Live Wallpaper",
    status: "completed",
    year: 2022,
    tags: ["Android", "Java", "Play Store"],
    summary: "Android live wallpaper that counts down to events, published on Google Play.",
    body: `This started when I couldn't find a wallpaper app I liked to count down to an event, so I built my own and shipped it to Google Play. I kept refining it with customization options and learned a lot about how Android wallpapers interact with the OS, and how to design reliable background updates. Link: https://play.google.com/store/apps/details?id=com.Buddy.countdown`,
    highlighted: true,
    img: "/assets/countdown.png"
  },
  {
    slug: "5-inch-fpv-drone",
    title: "5-Inch FPV Drone",
    status: "completed",
    year: 2023,
    tags: ["FPV", "UAV", "5-inch", "Betaflight"],
    summary: "Durable 5\" freestyle quad tuned for smooth HD footage.",
    body: `Carbon frame build with 2207 motors on 6S, F4 FC, GPS rescue and ELRS link. Tuned PIDs for cinematic lines and reliable failsafe handling.`,
    highlighted: false,
    img: "/assets/5-inch.jpg"
  },
  {
    slug: "10-inch-fpv-drone",
    title: "10-Inch FPV Drone",
    status: "completed",
    year: 2025,
    tags: ["FPV", "UAV", "Long Range", "INAV"],
    summary: "Long-range rig optimized for endurance flights.",
    body: `10" props with low‑kv motors and a high‑capacity Li‑ion pack for efficient cruise. Focused on vibration isolation and link reliability.`,
    highlighted: false,
    img: "/assets/10-inch.jpg"
  },
  {
    slug: "2-4m-autonomous-powered-glider",
    title: "2.4m Autonomous Powered Glider",
    status: "ongoing",
    year: 2025,
    tags: ["UAV", "Autopilot", "Glider", "ArduPilot"],
    summary: "Large-span glider platform with onboard autopilot experiments.",
    body: `Work‑in‑progress airframe for waypoint and loiter tests. Integrates GPS, telemetry and power monitoring with a lightweight fuselage.`,
    highlighted: false,
    img: "/assets/glider.jpg"
  },
  {
    slug: "bluejammer",
    title: "Bluejammer",
    status: "ongoing",
    year: 2025,
    tags: ["Bluetooth", "Android", "Tools"],
    summary: "Bluetooth jammer to learn more about RF",
    body: `Stress testing the limits of bluetooth technology and learning more about it.`,
    highlighted: false,
    img: "/assets/bluejammer.jpg"
  },
  {
    slug: "ghost-soundboard",
    title: "Ghost Soundboard",
    status: "completed",
    year: 2023,
    tags: ["Android", "Audio", "DSP"],
    summary: "Mobile soundboard that layers eerie stingers and loops for ambience.",
    body: `Simple project to learn more about audio development on Android platforms.`,
    highlighted: false,
    img: "/assets/ghost.jpg"
  },
  {
    slug: "5-5m-flying-wing",
    title: "5.5m Flying Wing",
    status: "ongoing",
    year: 2025,
    tags: ["UAV", "Wing Design", "CAD"],
    summary: "Large flying-wing concept focusing on structure and spars.",
    body: `Studying airfoil selection, spar layout and modular sections for transport with future autopilot integration.`,
    highlighted: false,
    img: "/assets/wing.png"
  },
  {
    slug: "buddy-app-website",
    title: "Buddy — App & Website",
    status: "abandoned",
    year: 2023,
    tags: ["Android", "Firebase", "Web", "Payments"],
    summary: "Dog-walker finder with chat, bookings and PayPal; plus a companion website.",
    body: `An end‑to‑end project for finding nearby dog walkers. I designed the data model in Firebase to store messages, images and user data, implemented messaging, bookings and PayPal payments, and built a basic website alongside the mobile app to increase reach. Focus areas: auth, real‑time updates, storage, and clean UI.`,
    highlighted: false,
    img: "/assets/buddy.png"
  },
  {
    slug: "cad-gps-holder",
    title: "CAD - GPS Holder",
    status: "completed",
    year: 2025,
    tags: ["CAD", "3D Print"],
    summary: "3D-printed GPS mount designed for FPV frames.",
    body: `3d printable GPS and antenna holder for my 5 inch drone. Robust and elegant design.`,
    highlighted: false,
    img: "/assets/gps.png"
  }
];

const SKILLS = [
  {
    category: "Programming Languages",
    items: [
      { name: "C", desc: "Low-level programming, pointers, and memory-aware code." },
      { name: "C++", desc: "OOP, STL, and data-structure heavy problem solving." },
      { name: "C#", desc: "Strongly typed OOP; basics and ecosystem familiarity." },
      { name: "Java", desc: "OOP, Android fundamentals, and tooling." },
      { name: "Python", desc: "Scripting, utilities, and quick prototyping." },
      { name: "JavaScript", desc: "Interactive web features and client logic." },
      { name: "SQL", desc: "Relational queries and schema design basics." },
    ],
  },
  {
    category: "Web & Markup",
    items: [
      { name: "HTML", desc: "Semantic layout and accessible structure." },
      { name: "CSS", desc: "Responsive styling and component theming." },
      { name: "XML", desc: "Structured data for configs and UI layouts." },
    ],
  },
  {
    category: "CS Fundamentals",
    items: [
      { name: "Data Structures", desc: "Lists, trees, graphs, hash maps and usage trade‑offs." },
      { name: "Algorithms", desc: "Time/space analysis and problem decomposition." },
      { name: "Testing", desc: "Verifying correctness and preventing regressions." },
      { name: "Debugging", desc: "Systematic issue isolation and fixes." },
    ],
  },
  {
    category: "Platforms & IDEs",
    items: [
      { name: "Android", desc: "Activities, services, lifecycle, and publishing to Play." },
      { name: "Visual Studio Code", desc: "Daily driver with extensions and tasks." },
      { name: "Visual Studio", desc: "C/C++/C# workflows and debuggers." },
      { name: "JetBrains IntelliJ IDEA", desc: "Java/Kotlin projects and inspections." },
    ],
  },
  {
    category: "Version Control & Collaboration",
    items: [
      { name: "Git", desc: "Branching, merging, and clean history management." },
      { name: "GitHub", desc: "PRs, issues, and project hosting." },
      { name: "Microsoft Teams", desc: "Team comms and file collaboration." },
      { name: "Zoom", desc: "Remote meetings and screen shares." },
    ],
  },
  {
    category: "Design & Productivity",
    items: [
      { name: "Adobe Illustrator", desc: "Vector graphics and icons." },
      { name: "Adobe Photoshop", desc: "Raster edits and mockups." },
      { name: "UI Design", desc: "Usability and layout for clear flows." },
      { name: "Logo Design", desc: "Simple, legible marks for products." },
      { name: "Word", desc: "Structured documents and formatting." },
      { name: "Excel", desc: "Spreadsheets and basic analysis." },
      { name: "PowerPoint", desc: "Concise, visual presentations." },
      { name: "CAD", desc: "Basic drafting for technical parts." },
      { name: "ChatGPT", desc: "Idea exploration and code assistance." },
    ],
  },
];

const HERO_SKILLS = [
  "C++",
  "Java",
  "JavaScript",
  "Python",
  "SQL",
  "Android",
  "Firebase",
  "Git",
];

const STATUS_COLORS = {
  completed: "bg-emerald-500/90 text-emerald-50 border-emerald-700",
  ongoing: "bg-amber-400/90 text-amber-950 border-amber-700",
  abandoned: "bg-rose-500/90 text-rose-50 border-rose-700",
};

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function usePageTitle(path, base = "Niko Filipić | Software Engineer & UAV Developer") {
  useEffect(() => {
    if (!path || path === "/") document.title = base;
    else document.title = `${base} — ${path}`;
  }, [path, base]);
}

function getHashPath() {
  const h = typeof window !== "undefined" ? window.location.hash : "#/";
  let p = h.replace(/^#/, "");
  if (!p.startsWith("/")) p = "/" + p;
  return p || "/";
}

function useHashRouter() {
  const [path, setPath] = useState(getHashPath());
  useEffect(() => {
    const onHash = () => setPath(getHashPath());
    window.addEventListener("hashchange", onHash);
    if (!window.location.hash) window.location.hash = "/";
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const navigate = (to) => {
    const t = to.startsWith("#") ? to : "#" + to;
    if (window.location.hash !== t) window.location.hash = t;
  };
  return { path, navigate };
}

function parseRoute(path) {
  if (!path || path === "/") return { page: "home" };
  const clean = (path.split("?")[0] || "").replace(/\/+$/, "");
  if (clean === "/skills") return { page: "skills" };
  const m = clean.match(/^\/p\/(.+)$/);
  if (m) {
    let slug = m[1];
    try {
      slug = decodeURIComponent(slug);
    } catch {}
    if (!slug) return { page: "notfound" };
    if (!PROJECTS.some((p) => p.slug === slug)) return { page: "notfound" };
    return { page: "project", slug };
  }
  return { page: "notfound" };
}

function hashString(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed) {
  let x = seed >>> 0;
  return () => ((x = (Math.imul(x, 1664525) + 1013904223) >>> 0) / 4294967296);
}

function hslStr(h, s, l) {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function PixelWallpaper({ pixelSize = 6 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    function draw() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const cssW = canvas.parentElement?.clientWidth || 1280;
      const cssH = canvas.parentElement?.clientHeight || 720;
      const w = Math.max(160, Math.floor(cssW / pixelSize));
      const h = Math.max(90, Math.floor(cssH / pixelSize));
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      for (let y = 0; y < h; y++) {
        const t = y / h;
        const r = Math.floor(90 + 40 * (1 - t));
        const g = Math.floor(170 + 60 * (1 - t));
        const b = 255;
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(0, y, w, 1);
      }
      const hill = (phase, baseY, amp, color) => {
        ctx.fillStyle = color;
        for (let x = 0; x < w; x++) {
          const t = x / w;
          const y = Math.floor(
            baseY -
              Math.sin((t + phase) * Math.PI) * amp -
              Math.sin((t * 3 + phase) * Math.PI) * amp * 0.25,
          );
          ctx.fillRect(x, y, 1, h - y);
        }
      };
      hill(0.1, Math.floor(h * 0.7), Math.floor(h * 0.08), "#2fa24c");
      hill(0.6, Math.floor(h * 0.75), Math.floor(h * 0.1), "#42d66a");
    }
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pixelSize]);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full [image-rendering:pixelated]"
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
}

function spawnCloudsEnsured() {
  const n = 6;
  const arr = Array.from({ length: n }, (_, i) => {
    const x = -20 + Math.random() * 120;
    return {
      id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
      x,
      top: 8 + Math.random() * 22,
      speed: 3 + Math.random() * 5,
      scale: 1 + Math.random() * 1.2,
      alpha: 0.5 + Math.random() * 0.5,
    };
  });
  let visible = arr.filter((c) => c.x >= 0 && c.x <= 100).length;
  for (let i = 0; visible < 3 && i < arr.length; i++) {
    if (arr[i].x < 0 || arr[i].x > 100) {
      arr[i].x = Math.random() * 90;
      visible++;
    }
  }
  return arr;
}

function stepClouds(items, dt) {
  return items.map((c) => {
    let x = c.x + c.speed * dt;
    if (x > 120) x = -20;
    return { ...c, x };
  });
}

function CloudSprite({ scale = 1 }) {
  const size = 10 * scale;
  const block = "bg-white";
  const rows = ["  xxx  ", " xxxxx ", "xxxxxxx", " xxxxx "];
  return (
    <div className="[image-rendering:pixelated]">
      {rows.map((row, ri) => (
        <div key={ri} className="flex">
          {row.split("").map((ch, ci) => (
            <div
              key={ci}
              className={classNames(ch === "x" ? block : "bg-transparent")}
              style={{ width: size, height: size }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function PixelClouds() {
  const [clouds, setClouds] = useState(() => spawnCloudsEnsured());
  const rafRef = useRef(0);
  const lastRef = useRef(0);
  useEffect(() => {
    const loop = (ts) => {
      if (!lastRef.current) lastRef.current = ts;
      const dt = Math.min(0.05, (ts - lastRef.current) / 1000);
      lastRef.current = ts;
      setClouds((prev) => stepClouds(prev, dt));
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-[3]">
      {clouds.map((c) => (
        <div
          key={c.id}
          className="absolute"
          style={{ left: `${c.x}%`, top: `${c.top}%`, opacity: c.alpha }}
        >
          <CloudSprite scale={c.scale} />
        </div>
      ))}
    </div>
  );
}

function PixelBalloonSprite({ variant = 0 }) {
  const palette = [
    { body: "#e74c3c", shine: "#f29f97", basket: "#8e5a3c" },
    { body: "#f1c40f", shine: "#f7dc6f", basket: "#8e5a3c" },
    { body: "#3498db", shine: "#85c1e9", basket: "#6b5c4a" },
    { body: "#9b59b6", shine: "#c39bd3", basket: "#6b5c4a" },
    { body: "#2ecc71", shine: "#7dcea0", basket: "#6b5c4a" },
  ];
  const c = palette[variant % palette.length];
  return (
    <svg viewBox="0 0 32 40" width="32" height="40" shapeRendering="crispEdges">
      <rect x="14" y="30" width="4" height="6" fill={c.basket} />
      <rect x="12" y="28" width="2" height="6" fill="#c7b299" />
      <rect x="18" y="28" width="2" height="6" fill="#c7b299" />
      <rect x="8" y="8" width="16" height="18" fill={c.body} />
      <rect x="10" y="10" width="4" height="14" fill={c.shine} />
      <rect x="6" y="16" width="20" height="4" fill={c.body} />
      <rect x="12" y="34" width="8" height="2" fill="#5b3b1f" />
    </svg>
  );
}

function stepBalloons(items, dt) {
  return items.map((b) => {
    let x = b.x + b.speed * dt;
    let phase = b.phase + b.bobSpeed * dt;
    let y = b.baseTop + Math.sin(phase) * b.bobAmp;
    if (x > 110) {
      x = -12;
      y = b.baseTop;
    }
    return { ...b, x, y, phase };
  });
}

function PixelBalloons() {
  const [items, setItems] = useState(() => {
    const count = 3 + Math.floor(Math.random() * 3);
    return Array.from({ length: count }, (_, i) => ({
      id: `balloon-${Date.now()}-${i}`,
      variant: i,
      scale: 0.9 + Math.random() * 0.5,
      baseTop: 42 + Math.random() * 12,
      bobAmp: 0.8 + Math.random() * 0.8,
      bobSpeed: 0.8 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      x: -10 + Math.random() * 90,
      y: 40,
      speed: 2 + Math.random() * 2.5,
    }));
  });
  const rafRef = useRef(0);
  const lastRef = useRef(0);
  useEffect(() => {
    const loop = (ts) => {
      if (!lastRef.current) lastRef.current = ts;
      const dt = Math.min(0.05, (ts - lastRef.current) / 1000);
      lastRef.current = ts;
      setItems((prev) => stepBalloons(prev, dt));
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {items.map((b) => (
        <div
          key={b.id}
          className="absolute [image-rendering:pixelated]"
          style={{ left: `${b.x}vw`, top: `${b.y}%` }}
        >
          <div style={{ transform: `scale(${b.scale})` }}>
            <PixelBalloonSprite variant={b.variant} />
          </div>
        </div>
      ))}
    </div>
  );
}

function PixelPlaneSprite() {
  return (
    <svg viewBox="0 0 48 24" width="48" height="24" shapeRendering="crispEdges">
      <rect x="6" y="11" width="6" height="3" fill="#9aa7b7" />
      <rect x="12" y="10" width="16" height="6" fill="#c7d3e3" />
      <rect x="14" y="8" width="12" height="3" fill="#b9c9dc" />
      <rect x="10" y="12" width="4" height="2" fill="#b9c9dc" />
      <rect x="24" y="9" width="6" height="4" fill="#7db3ff" />
      <rect x="28" y="11" width="6" height="6" fill="#9aa7b7" />
      <rect x="34" y="12" width="2" height="4" fill="#677385" />
      <g className="plane-propeller">
        <rect x="36" y="13" width="8" height="2" fill="#444" />
        <rect x="40" y="9" width="2" height="10" fill="#444" />
      </g>
      <rect x="20" y="12" width="2" height="2" fill="#2b2b2b" />
    </svg>
  );
}

function PixelPlane() {
  const wrapRef = useRef(null);
  const planeRef = useRef(null);
  useEffect(() => {
    let raf = 0;
    const loop = (t) => {
      const wrap = wrapRef.current;
      const el = planeRef.current;
      if (!wrap || !el) {
        raf = requestAnimationFrame(loop);
        return;
      }
      const rect = wrap.getBoundingClientRect();
      const s = Math.min(rect.width, rect.height);
      const rx = s * 0.25;
      const ry = s * 0.12;
      const cx = rect.width * 0.5;
      const cy = rect.height * 0.22;
      const a = (t / 1000) * 0.6;
      const x = cx + rx * Math.cos(a);
      const y = cy + ry * Math.sin(a);
      const dx = -rx * Math.sin(a);
      const dy = ry * Math.cos(a);
      const heading = Math.atan2(dy, dx) * (180 / Math.PI);
      el.style.transform = `translate(${x - 24}px, ${y - 12}px) rotate(${heading}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 z-[4]">
      <div
        ref={planeRef}
        className="[image-rendering:pixelated]"
        style={{ position: "absolute", width: 48, height: 24 }}
      >
        <PixelPlaneSprite />
      </div>
    </div>
  );
}

function PixelSunSprite({ scale = 1 }) {
  const s = 6 * scale;
  return (
    <svg viewBox="0 0 56 56" width={s * 9.333} height={s * 9.333} shapeRendering="crispEdges">
      <rect x="24" y="24" width="8" height="8" fill="#f7d34a" />
      <rect x="22" y="26" width="12" height="4" fill="#f7d34a" />
      <rect x="26" y="22" width="4" height="12" fill="#f7d34a" />
      {[...Array(8)].map((_, i) => {
        const rays = [
          [28, 0, 0, 8],
          [28, 48, 0, 8],
          [48, 28, 8, 0],
          [0, 28, 8, 0],
          [44, 8, 2, 2],
          [44, 44, 2, 2],
          [8, 44, 2, 2],
          [8, 8, 2, 2],
        ][i];
        return (
          <rect
            key={i}
            x={rays[0]}
            y={rays[1]}
            width={rays[2] || 2}
            height={rays[3] || 2}
            fill="#ffe27a"
          />
        );
      })}
    </svg>
  );
}

function PixelSun() {
  return (
    <div className="pointer-events-none absolute z-[2]" style={{ right: "3%", top: "4%" }}>
      <PixelSunSprite scale={2} />
    </div>
  );
}

function PixelTreeSprite({ scale = 1 }) {
  const s = 8 * scale;
  const rows = ["  xxx  ", " xxxxx ", "xxxxxxx", " xxxxx ", "  xxx  ", "  xxx  "];
  return (
    <div className="[image-rendering:pixelated]">
      {rows.map((row, ri) => (
        <div key={ri} className="flex">
          {row.split("").map((ch, ci) => (
            <div
              key={ci}
              className={classNames(ch === "x" ? "bg-green-700" : "bg-transparent")}
              style={{ width: s, height: s }}
            />
          ))}
        </div>
      ))}
      <div className="flex">
        <div style={{ width: s * 3 }} />
        <div className="bg-amber-800" style={{ width: s * 2, height: s * 3 }} />
      </div>
    </div>
  );
}

function PixelTrees() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      <div className="absolute" style={{ right: "10%", bottom: "17%" }}>
        <PixelTreeSprite scale={1} />
      </div>
      <div className="absolute" style={{ right: "6%", bottom: "16%" }}>
        <PixelTreeSprite scale={1.25} />
      </div>
      <div className="absolute" style={{ right: "2%", bottom: "15%" }}>
        <PixelTreeSprite scale={0.9} />
      </div>
    </div>
  );
}

function PixelHouseSprite({ scale = 1 }) {
  const w = 96 * scale;
  const h = 64 * scale;
  return (
    <svg viewBox="0 0 96 64" width={w} height={h} shapeRendering="crispEdges">
      <rect x="22" y="30" width="52" height="28" fill="#b7773f" />
      <rect x="22" y="30" width="52" height="2" fill="#8a552c" />
      <rect x="22" y="38" width="52" height="2" fill="#8a552c" />
      <rect x="22" y="46" width="52" height="2" fill="#8a552c" />
      <rect x="22" y="54" width="52" height="2" fill="#8a552c" />
      <rect x="16" y="28" width="64" height="6" fill="#6b3a1a" />
      <rect x="20" y="24" width="56" height="6" fill="#7a4420" />
      <rect x="24" y="20" width="48" height="6" fill="#8a4c24" />
      <rect x="60" y="12" width="8" height="12" fill="#8b3f2a" />
      <rect x="58" y="12" width="10" height="2" fill="#6e3222" />
      <rect x="34" y="40" width="12" height="18" fill="#5c3a1f" />
      <rect x="36" y="42" width="8" height="14" fill="#3f2616" />
      <rect x="52" y="40" width="16" height="12" fill="#9ec9ff" />
      <rect x="52" y="46" width="16" height="2" fill="#84b7ff" />
      <rect x="60" y="40" width="2" height="12" fill="#84b7ff" />
    </svg>
  );
}

function PixelHouse({ scale = 1 }) {
  const w = 96 * scale;
  const h = 64 * scale;
  const chimneyLeft = 60 * scale;
  const chimneyTop = 10 * scale;
  const puffs = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    delay: i * 0.6 + Math.random() * 0.3,
    dur: 3 + Math.random() * 2,
    dx: Math.random() * 10 - 5,
  }));
  return (
    <div
      className="pointer-events-none absolute z-[2]"
      style={{ left: "50%", transform: "translateX(-50%)", bottom: "17%" }}
    >
      <div className="relative" style={{ width: w, height: h }}>
        <PixelHouseSprite scale={scale} />
        <div className="absolute" style={{ left: chimneyLeft, top: chimneyTop }}>
          {puffs.map((p) => (
            <span
              key={p.id}
              className="smoke"
              style={{
                left: `${p.dx}px`,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CrtMonitor({ children }) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-[1vh] z-10"
      style={{ width: "min(98vw, calc(100vh - 8vh))", maxHeight: "calc(100vh - 8vh)" }}
    >
      <div className="relative w-full h-full" style={{ aspectRatio: "1 / 1" }}>
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 400 400"
          shapeRendering="crispEdges"
        >
          <rect x="0" y="0" width="400" height="400" fill="#c9c7b8" />
          <rect x="8" y="8" width="384" height="384" fill="#d7d5c6" />
          <rect x="18" y="18" width="364" height="364" fill="#cfcdbd" />
          <rect x="140" y="332" width="120" height="18" fill="#b9b7a6" />
          <rect x="110" y="352" width="180" height="12" fill="#a4a291" />
          <rect x="80" y="366" width="240" height="12" fill="#8e8c7d" />
          <rect x="60" y="318" width="36" height="12" fill="#b9b7a6" />
          <rect x="100" y="318" width="20" height="12" fill="#6e6e66" />
          <rect x="292" y="318" width="8" height="8" fill="#2edb55" />
          <rect x="304" y="318" width="8" height="8" fill="#2edb55" opacity=".5" />
        </svg>
        <div
          className="absolute rounded-[6px] overflow-hidden crt-screen"
          style={{ left: "5%", right: "5%", top: "7%", bottom: "22%" }}
        >
          <AmbientAudioControl inside />
          <div className="absolute inset-0 overflow-y-auto overflow-x-hidden font-mono selection:bg-black selection:text-white bg-[#82e6ff]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function DecoPlant({ scale = 1 }) {
  const w = 220 * scale;
  const h = 260 * scale;
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 132 156"
      shapeRendering="crispEdges"
      className="select-none pointer-events-none"
    >
      <rect x="20" y="112" width="92" height="26" fill="#b9723e" />
      <rect x="16" y="108" width="100" height="30" fill="#c47e47" />
      <rect x="22" y="116" width="88" height="16" fill="#d08950" />
      <rect x="24" y="118" width="84" height="12" fill="#db945a" />
      <rect x="28" y="106" width="76" height="6" fill="#8b532f" />
      <rect x="30" y="102" width="72" height="4" fill="#6f4326" />
      <g fill="#1f6b36">
        <path d="M66 104 L72 66 L88 82 L70 104 Z" />
        <path d="M54 104 L58 72 L44 82 L50 104 Z" />
        <path d="M84 104 L92 78 L108 92 L92 104 Z" />
        <path d="M40 104 L44 82 L26 96 L36 104 Z" />
      </g>
      <g fill="#2f8d4a">
        <path d="M70 78 L76 56 L86 64 L74 80 Z" />
        <path d="M54 86 L58 62 L46 74 L52 90 Z" />
        <path d="M92 88 L100 64 L112 78 L98 92 Z" />
        <path d="M34 90 L40 72 L26 82 L32 98 Z" />
      </g>
      <g fill="#3aa85a">
        <path d="M64 60 L70 44 L78 50 L68 64 Z" />
        <path d="M50 70 L54 52 L44 60 L48 74 Z" />
        <path d="M86 72 L92 54 L100 62 L90 76 Z" />
        <path d="M30 76 L36 60 L26 66 L30 84 Z" />
      </g>
      <rect x="32" y="136" width="68" height="6" fill="#a3683b" />
      <g fill="#cabfb1" opacity="0.9">
        <rect x="32" y="146" width="10" height="4" />
        <rect x="44" y="146" width="10" height="4" />
        <rect x="56" y="146" width="10" height="4" />
        <rect x="68" y="146" width="10" height="4" />
        <rect x="80" y="146" width="10" height="4" />
        <rect x="92" y="146" width="10" height="4" />
      </g>
    </svg>
  );
}

function DecoClock({ scale = 1 }) {
  const w = 240 * scale;
  const h = 120 * scale;
  const [time, setTime] = useState(() => {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  });
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      setTime(`${hh}:${mm}`);
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const font = {
    0: [".XXX.", ".X.X.", ".X.X.", ".X.X.", ".X.X.", ".X.X.", ".XXX."],
    1: ["..X..", "..X..", "..X..", "..X..", "..X..", "..X..", "..X.."],
    2: [".XXX.", "...X.", "...X.", ".XXX.", ".X...", ".X...", ".XXX."],
    3: [".XXX.", "...X.", "...X.", ".XXX.", "...X.", "...X.", ".XXX."],
    4: [".X.X.", ".X.X.", ".X.X.", ".XXX.", "...X.", "...X.", "...X."],
    5: [".XXX.", ".X...", ".X...", ".XXX.", "...X.", "...X.", ".XXX."],
    6: [".XXX.", ".X...", ".X...", ".XXX.", ".X.X.", ".X.X.", ".XXX."],
    7: [".XXX.", "...X.", "...X.", "..X..", "..X..", "..X..", "..X.."],
    8: [".XXX.", ".X.X.", ".X.X.", ".XXX.", ".X.X.", ".X.X.", ".XXX."],
    9: [".XXX.", ".X.X.", ".X.X.", ".XXX.", "...X.", "...X.", ".XXX."],
    ":": [".....", "..X..", ".....", "..X..", ".....", "..X..", "....."],
  };
  const drawText = (txt, startX, startY, sz, color) => {
    const cells = [];
    let xoff = startX;
    for (let i = 0; i < txt.length; i++) {
      const ch = txt[i];
      const grid = font[ch] || font["0"];
      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < 5; x++) {
          if (grid[y][x] === "X")
            cells.push(
              <rect
                key={`${i}-${x}-${y}`}
                x={xoff + x * sz}
                y={startY + y * sz}
                width={sz}
                height={sz}
                fill={color}
              />,
            );
        }
      }
      xoff += 5 * sz + sz;
    }
    return cells;
  };
  const sz = 6;
  const startX = 26;
  const startY = 44;
  const digits = drawText(time, startX, startY, sz, "#EC0003");
  return (
    <svg width={w} height={h} viewBox="0 0 240 120" shapeRendering="crispEdges" className="select-none pointer-events-none">
      <rect x="10" y="28" width="220" height="70" fill="#3a3a3a" />
      <rect x="16" y="34" width="208" height="58" fill="#111" />
      <rect x="44" y="98" width="36" height="12" fill="#2b2b2b" />
      <rect x="160" y="98" width="36" height="12" fill="#2b2b2b" />
      {digits}
    </svg>
  );
}

function PixelPoster({ variant = 0, scale = 1 }) { const w = 120 * scale, h = 160 * scale; let inner = null; if (variant === 0) { inner = (<g><rect x="8" y="8" width="104" height="144" fill="#f9f7ee"/><rect x="10" y="10" width="100" height="140" fill="#fff"/><rect x="18" y="108" width="84" height="18" fill="#222"/><rect x="20" y="100" width="80" height="12" fill="#b11f2a"/><rect x="26" y="94" width="30" height="8" fill="#b11f2a"/><rect x="56" y="92" width="20" height="10" fill="#b11f2a"/><rect x="34" y="96" width="16" height="6" fill="#86b6ff"/><rect x="54" y="96" width="14" height="6" fill="#86b6ff"/><rect x="62" y="106" width="6" height="6" fill="#7a0f17"/><rect x="24" y="120" width="18" height="18" fill="#111"/><rect x="78" y="120" width="18" height="18" fill="#111"/><rect x="26" y="122" width="14" height="14" fill="#555"/><rect x="80" y="122" width="14" height="14" fill="#555"/><rect x="18" y="90" width="84" height="4" fill="#7a0f17"/></g>); } else if (variant === 1) { inner = (<g><rect x="8" y="8" width="104" height="144" fill="#eaf6ff"/><rect x="56" y="46" width="8" height="8" fill="#6b86ff"/><rect x="26" y="72" width="68" height="4" fill="#6b86ff"/><rect x="20" y="66" width="12" height="16" fill="#6b86ff"/><rect x="88" y="66" width="12" height="16" fill="#6b86ff"/><rect x="58" y="30" width="4" height="20" fill="#6b86ff"/><rect x="40" y="60" width="4" height="16" fill="#6b86ff"/><rect x="72" y="60" width="4" height="16" fill="#6b86ff"/><rect x="46" y="60" width="28" height="4" fill="#6b86ff"/><rect x="50" y="92" width="20" height="12" fill="#aa7744"/><rect x="54" y="84" width="12" height="8" fill="#aa7744"/></g>); } else { inner = (<g><rect x="8" y="8" width="104" height="144" fill="#cfe6ff"/>{[...Array(10)].map((_,i)=> <rect key={`v${i}`} x={10} y={10 + i*14} width={100} height={1} fill="#9dc7ff"/>) }{[...Array(6)].map((_,i)=> <rect key={`h${i}`} x={10 + i*16} y={10} width={1} height={140} fill="#9dc7ff"/>) }<rect x="54" y="60" width="12" height="12" fill="#1e5fb8"/><rect x="44" y="70" width="32" height="4" fill="#1e5fb8"/><rect x="30" y="84" width="60" height="4" fill="#1e5fb8"/><rect x="20" y="96" width="80" height="2" fill="#1e5fb8"/><rect x="58" y="40" width="4" height="28" fill="#1e5fb8"/><rect x="34" y="66" width="4" height="28" fill="#1e5fb8"/><rect x="82" y="66" width="4" height="28" fill="#1e5fb8"/><rect x="28" y="92" width="12" height="12" fill="#1e5fb8"/><rect x="80" y="92" width="12" height="12" fill="#1e5fb8"/><rect x="26" y="104" width="16" height="2" fill="#1e5fb8"/><rect x="78" y="104" width="16" height="2" fill="#1e5fb8"/></g>); } return (<svg width={w} height={h} viewBox="0 0 120 160" shapeRendering="crispEdges" className="select-none pointer-events-none"><rect x="0" y="0" width="120" height="160" fill="#6f4a2b"/><rect x="4" y="4" width="112" height="152" fill="#845a34"/><rect x="8" y="8" width="104" height="144" fill="#f4f1e6"/>{inner}</svg>); }

function WallPosters(){ const ultra = useIsWide(1600); if(!ultra) return null; return (<div className="absolute inset-x-0 z-[4] pointer-events-none" style={{ top: '1.5vh', bottom: '40vh' }}><div className="absolute left-[6%] top-[3vh]"><PixelPoster variant={0} scale={2.4} /></div><div className="absolute left-1/2 -translate-x-1/2 top-[4vh]"><PixelPoster variant={1} scale={2.5} /></div><div className="absolute right-[7%] top-[6vh]"><PixelPoster variant={2} scale={2.3} /></div></div>); }

function UltraDecor() {
  const ultra = useIsWide(1600);
  if (!ultra) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-[5]">
      <div className="absolute left-[2vw] bottom-[20vh]">
        <DecoPlant scale={1.4} />
      </div>
      <div className="absolute right-[2vw] bottom-[20vh]">
        <DecoClock scale={1.3} />
      </div>
    </div>
  );
}

function PixelBadge({ children }) {
  return (
    <span className="inline-block text-xs uppercase tracking-wider bg-black/70 text-white pixel-border px-3 py-1">
      {children}
    </span>
  );
}

function SiteHeader() {
  return (
    <div className="sticky top-0 z-30 px-8 pt-3">
      <div className="flex gap-2">
        <a
          href="https://linkedin.com/in/niko-filipi%C4%87-637189240"
          target="_blank"
          rel="noreferrer"
          className="pixel-border bg-white/90 px-3 py-1 hover:bg-white"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/buxerr"
          target="_blank"
          rel="noreferrer"
          className="pixel-border bg-white/90 px-3 py-1 hover:bg-white"
        >
          GitHub
        </a>
        <a
          href="mailto:nikotfic@gmail.com"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "mailto:nikotfic@gmail.com";
          }}
          className="pixel-border bg-white/90 px-3 py-1 hover:bg-white"
        >
          Email
        </a>
      </div>
    </div>
  );
}

function PixelThumb({ seed = "seed", fossil = false }) {
  const hash = hashString(seed);
  const rand = rng(hash);
  const cols = 16;
  const rows = 10;
  const hue = Math.floor(rand() * 360);
  const bg = fossil ? "hsl(25, 28%, 20%)" : hslStr(hue, 65, 75);
  const fg = fossil ? "hsl(25, 30%, 45%)" : hslStr((hue + 20) % 360, 70, 35);
  const accents = hslStr((hue + 200) % 360, 70, fossil ? 35 : 45);
  const pixels = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const r = rand();
      if (r > 0.7) pixels.push({ x, y, c: fg });
      else if (r > 0.66) pixels.push({ x, y, c: accents });
    }
  }
  return (
    <svg
      viewBox={`0 0 ${cols} ${rows}`}
      className="w-full h-full block"
      shapeRendering="crispEdges"
      style={{ background: bg, filter: fossil ? "grayscale(100%) contrast(120%) opacity(0.9)" : undefined }}
    >
      {pixels.map((p, i) => (
        <rect key={i} x={p.x} y={p.y} width="1" height="1" fill={p.c} />
      ))}
    </svg>
  );
}

function ImgOrThumb({ src, alt, fallback, className }) {
  const [ok, setOk] = useState(!!src);
  useEffect(() => {
    setOk(!!src);
  }, [src]);
  if (ok)
    return <img src={src} alt={alt} className={className} onError={() => setOk(false)} />;
  return fallback;
}

function Garden({ projects }) {
  const filtered = useMemo(() => projects.filter((p) => p.highlighted), [projects]);
  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-6 pb-24">
      <div className="mb-4 flex items-center gap-2">
        <PixelBadge>Highlighted Projects</PixelBadge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <a
            key={p.slug}
            href={`#/p/${p.slug}`}
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = `#/p/${p.slug}`;
            }}
            className="group"
          >
            <div className="pixel-card h-full">
              <div className="p-3 pb-0">
                <span className={classNames("px-2 py-1 pixel-border text-xs", STATUS_COLORS[p.status])}>
                  {p.status}
                </span>
              </div>
              <div className="px-3 pt-3">
                <div className="aspect-square w-[70%] mx-auto overflow-hidden pixel-border [image-rendering:pixelated] bg-white/60">
                  {p.img ? (
                    <ImgOrThumb
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover block"
                      fallback={<PixelThumb seed={p.slug} />}
                    />
                  ) : (
                    <PixelThumb seed={p.slug} />
                  )}
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-mono text-base sm:text-lg tracking-wider drop-shadow group-hover:scale-[1.01] transition">
                  {p.title}
                </h3>
              </div>
              <div className="px-3 pb-3 text-sm opacity-90">
                <p>{p.summary}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] uppercase bg-black/70 text-white pixel-border px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                  <span className="text-[10px] uppercase bg-white/70 pixel-border px-2 py-0.5">{p.year}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function FossilFish() {
  return (
    <svg viewBox="0 0 96 40" className="w-32 h-auto" shapeRendering="crispEdges">
      <rect x="8" y="18" width="56" height="4" fill="#cdbfa9" />
      <rect x="8" y="19" width="56" height="2" fill="#efe2cc" />
      <rect x="20" y="12" width="2" height="16" fill="#efe2cc" />
      <rect x="26" y="13" width="2" height="14" fill="#efe2cc" />
      <rect x="32" y="12" width="2" height="16" fill="#efe2cc" />
      <rect x="38" y="13" width="2" height="14" fill="#efe2cc" />
      <rect x="44" y="12" width="2" height="16" fill="#efe2cc" />
      <rect x="50" y="13" width="2" height="14" fill="#efe2cc" />
      <rect x="60" y="14" width="10" height="12" fill="#efe2cc" />
      <rect x="70" y="12" width="14" height="16" fill="#cdbfa9" />
      <rect x="72" y="14" width="12" height="12" fill="#efe2cc" />
      <rect x="82" y="18" width="8" height="4" fill="#efe2cc" />
      <rect x="86" y="14" width="4" height="12" fill="#efe2cc" />
      <rect x="68" y="10" width="6" height="4" fill="#efe2cc" />
      <rect x="66" y="22" width="6" height="4" fill="#efe2cc" />
      <rect x="74" y="18" width="2" height="2" fill="#754c24" />
    </svg>
  );
}

function HumanSkeleton() {
  return (
    <svg viewBox="0 0 120 60" className="w-40 h-auto" shapeRendering="crispEdges">
      <rect x="50" y="6" width="20" height="12" fill="#efe2cc" />
      <rect x="54" y="10" width="4" height="2" fill="#754c24" />
      <rect x="62" y="10" width="4" height="2" fill="#754c24" />
      <rect x="58" y="18" width="4" height="18" fill="#efe2cc" />
      <rect x="48" y="20" width="24" height="2" fill="#efe2cc" />
      <rect x="50" y="24" width="20" height="2" fill="#efe2cc" />
      <rect x="52" y="28" width="16" height="2" fill="#efe2cc" />
      <rect x="44" y="20" width="6" height="2" fill="#efe2cc" />
      <rect x="38" y="22" width="6" height="2" fill="#efe2cc" />
      <rect x="34" y="24" width="6" height="2" fill="#efe2cc" />
      <rect x="70" y="20" width="6" height="2" fill="#efe2cc" />
      <rect x="76" y="22" width="6" height="2" fill="#efe2cc" />
      <rect x="82" y="24" width="6" height="2" fill="#efe2cc" />
      <rect x="55" y="36" width="10" height="6" fill="#efe2cc" />
      <rect x="56" y="42" width="4" height="12" fill="#efe2cc" />
      <rect x="64" y="42" width="4" height="12" fill="#efe2cc" />
      <rect x="54" y="54" width="6" height="2" fill="#efe2cc" />
      <rect x="64" y="54" width="6" height="2" fill="#efe2cc" />
    </svg>
  );
}

function UndergroundDecor() {
  const items = [
    { Cmp: HumanSkeleton, left: "18%", bottom: "18%", scale: 1.1 },
    { Cmp: FossilFish, left: "62%", bottom: "14%", scale: 1 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {items.map((it, i) => (
        <div
          key={i}
          className="absolute opacity-90"
          style={{ left: it.left, bottom: it.bottom, transform: `scale(${it.scale})` }}
        >
          <it.Cmp />
        </div>
      ))}
    </div>
  );
}

function Underground({ projects }) {
  const rest = projects.filter((p) => !p.highlighted);
  if (rest.length === 0) return null;
  return (
    <section className="relative min-h-[90vh] z-10">
      <UndergroundDecor />
      <div className="sticky top-0 h-16 flex items-center justify-center">
        <PixelBadge>All Projects</PixelBadge>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((p) => (
            <a
              key={p.slug}
              href={`#/p/${p.slug}`}
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = `#/p/${p.slug}`;
              }}
              className="group"
            >
              <div className="pixel-card bg-black/30 text-white/90">
                <div className="p-3 pb-0">
                  <span className={classNames("px-2 py-1 pixel-border text-xs", STATUS_COLORS[p.status])}>
                    {p.status}
                  </span>
                </div>
                <div className="px-3 pt-3">
                  <div className="aspect-square w-[70%] mx-auto overflow-hidden pixel-border [image-rendering:pixelated] bg-white/60">
                    {p.img ? (
                      <ImgOrThumb
                        src={p.img}
                        alt={p.title}
                        className="w-full h-full object-cover block"
                        fallback={<PixelThumb seed={p.slug} />}
                      />
                    ) : (
                      <PixelThumb seed={p.slug} />
                    )}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-mono text-base sm:text-lg tracking-wider">{p.title}</h3>
                </div>
                <div className="px-3 pb-3 text-sm opacity-90">
                  <p>{p.summary}</p>
                  <div className="mt-2 text-[10px] uppercase">{p.year}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectPage({ slug }) {
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return <NotFound />;
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <PixelWallpaper pixelSize={5} />
        <PixelSun />
        <PixelBalloons />
        <PixelClouds />
        <PixelPlane />
        <PixelTrees />
        <PixelHouse />
        <GroundSeparator />
      </div>
      <div className="relative z-10">
        <SiteHeader />
        <nav className="px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              if (window.history.length > 1) window.history.back();
              else window.location.hash = "/";
            }}
            className="pixel-border bg-white/70 px-3 py-1 hover:bg-white"
          >
            ⬅ Back to Highlights
          </a>
          <span className="text-xs opacity-70">/p/{slug}</span>
        </nav>
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-3xl mx-auto pixel-card bg:white/85 bg-white/85">
            <div className="p-4 sm:p-6">
              <div className="mb-4">
                <div className="[image-rendering:pixelated] aspect-square w-[70%] mx-auto overflow-hidden pixel-border bg-white/60">
                  {project.img ? (
                    <ImgOrThumb
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover block"
                      fallback={<PixelThumb seed={project.slug} />}
                    />
                  ) : (
                    <PixelThumb seed={project.slug} />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <h1 className="font-mono text-2xl tracking-wider drop-shadow">{project.title}</h1>
                <span className={classNames("px-2 py-1 pixel-border text-xs", STATUS_COLORS[project.status])}>
                  {project.status}
                </span>
              </div>
              <p className="mt-2 text-sm opacity-80">{project.summary}</p>
              <div className="mt-4 text-sm leading-relaxed whitespace-pre-wrap">{project.body}</div>
              <div className="mt-6 flex flex-wrap gap-2">
                {(project.tags || []).map((t) => (
                  <span key={t} className="text-[10px] uppercase bg-black/70 text-white pixel-border px-2 py-0.5">
                    {t}
                  </span>
                ))}
                <span className="text-[10px] uppercase bg-white/70 pixel-border px-2 py-0.5">{project.year}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillsPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <PixelWallpaper pixelSize={5} />
        <PixelSun />
        <PixelBalloons />
        <PixelClouds />
        <PixelPlane />
        <PixelTrees />
        <PixelHouse />
        <GroundSeparator />
      </div>
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="my-6 flex items-center justify-between">
            <PixelBadge>Skills</PixelBadge>
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                if (window.history.length > 1) window.history.back();
                else window.location.hash = "/";
              }}
              className="pixel-border bg-white/80 px-3 py-1 hover:bg-white"
            >
              ⬅ Back
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SKILLS.map((cat) => (
              <div key={cat.category} className="pixel-card p-4 bg-white/85">
                <h3 className="font-mono text-lg tracking-wider mb-2">{cat.category}</h3>
                <ul className="space-y-2">
                  {cat.items.map((it) => (
                    <li key={it.name} className="flex items-start gap-2">
                      <span className="pixel-border bg:black/70 bg-black/70 text-white px-2 py-0.5 text-[10px] uppercase shrink-0">
                        {it.name}
                      </span>
                      <span className="text-sm opacity-90 leading-snug">{it.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center relative">
      <div className="absolute inset-0">
        <PixelWallpaper pixelSize={5} />
        <PixelSun />
        <PixelBalloons />
        <PixelClouds />
        <PixelPlane />
        <PixelTrees />
        <PixelHouse />
        <GroundSeparator />
      </div>
      <div className="relative z-10 pixel-card bg-white/80 p-6">
        <h2 className="font-mono text-xl">404 — Lost in the Clouds</h2>
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            if (window.history.length > 1) window.history.back();
            else window.location.hash = "/";
          }}
          className="mt-3 inline-block pixel-border bg-white/80 px-3 py-1 hover:bg-white"
        >
          Back Home
        </a>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <div className="relative">
        <PixelWallpaper />
        <PixelSun />
        <PixelBalloons />
        <PixelClouds />
        <PixelPlane />
        <PixelTrees />
        <PixelHouse />
        <SiteHeader />
        <div className="relative z-10 w-[90%] max-w-[900px] mx-auto mt-14 sm:mt-16">
          <div className="bg-white/60">
            <div className="p-4 sm:p-6">
              <h1 className="font-mono text-2xl sm:text-3xl tracking-wider">Hi — I'm Niko Filipić</h1>
              <p className="mt-2 text-sm sm:text-base opacity-80">
                I'm a Croatian developer from Zagreb studying at Algebra University College. I build Android and web apps and enjoy UI design, algorithms and turning ideas into shipped products. I'm passionate about robotics — especially FPV drones and other UAVs.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] uppercase">
                {HERO_SKILLS.slice(0, 8).map((s) => (
                  <span key={s} className="pixel-border bg-black/70 text:white bg-black/70 text-white px-2 py-0.5">
                    {s}
                  </span>
                ))}
                <a
                  href="#/skills"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = "/skills";
                  }}
                  className="ml-1 pixel-border bg-white/90 px-3 py-1 hover:bg-white"
                >
                  View more →
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 mt-6 sm:mt-10">
          <Garden projects={PROJECTS} />
        </div>
        <GroundSeparator />
      </div>
      <div className="min-h-[110vh] relative earth-bg text-white">
        <Underground projects={PROJECTS} />
      </div>
    </div>
  );
}

function GroundSeparator() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-8 [image-rendering:pixelated]">
      <div
        className="h-full w-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #1e7e36 0 8px, #146c2e 8px 16px), repeating-linear-gradient(0deg, rgba(0,0,0,0.12) 0 2px, transparent 2px 4px)",
          backgroundBlendMode: "multiply",
        }}
      />
    </div>
  );
}

function RetroRig({ children }) {
  return (
    <div className="relative h-screen w-screen overflow-visible bg-[#d9d2c7]">
      <div className="absolute inset-x-0 bottom-0 h-[38vh]" style={{ background: "linear-gradient(#a8733a,#7a4f2c)" }} />
      <WallPosters />
      <UltraDecor />
      <CrtMonitor>{children}</CrtMonitor>
    </div>
  );
}

function StyleOverlays() {
  return (
    <style>{`
html, body, #root { background: #82e6ff; }
.pixel-border { position: relative; box-shadow: 0 0 0 2px rgba(0,0,0,0.8), 4px 4px 0 0 rgba(0,0,0,0.25); border-radius: 0; }
.pixel-card { background: rgba(255,255,255,0.5); backdrop-filter: blur(2px) saturate(110%); border-radius: 0; box-shadow: 0 0 0 2px rgba(0,0,0,1), 6px 6px 0 0 rgba(0,0,0,0.25); }
.earth-bg { background: repeating-linear-gradient(to bottom, #5c3b22 0 18px, #4a2f1b 18px 36px, #3f2816 36px 54px); }
.crt-screen { background: #82e6ff; box-shadow: none; }
.crt-scanlines { display: none; }
.pixel-img { image-rendering: pixelated; image-rendering: crisp-edges; }
@keyframes propSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.plane-propeller { animation: propSpin 0.35s linear infinite; transform-origin: 40px 14px; }
@keyframes cloudMove { from { transform: translateX(0); } to { transform: translateX(140vw); } }
.cloud-anim { animation-name: cloudMove; animation-timing-function: linear; animation-iteration-count: infinite; will-change: transform; }
@keyframes balloonBob { 0% { transform: translateY(0); } 50% { transform: translateY(-6px); } 100% { transform: translateY(0); } }
.balloon-bob { animation-name: balloonBob; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
@keyframes balloonDrift { from { transform: translateX(0); } to { transform: translateX(20vw); } }
.balloon-drift { animation-name: balloonDrift; animation-timing-function: linear; animation-iteration-count: infinite; }
.retro-btn { width: 32px; height: 28px; display: grid; place-items: center; background:#d4d0c8; border:1px solid #000; box-shadow: inset -2px -2px 0 #7f7f7f, inset 2px 2px 0 #ffffff, 2px 2px 0 rgba(0,0,0,0.25); image-rendering: pixelated; border-radius: 0; }
.retro-btn:active { box-shadow: inset 2px 2px 0 #7f7f7f, inset -2px -2px 0 #ffffff; transform: translate(1px,1px); }
@keyframes smokeRise { 0% { transform: translateY(0) scale(1); opacity: 0; } 15% { opacity: .6; } 100% { transform: translateY(-80px) scale(1.8); opacity: 0; } }
.smoke { position: absolute; width: 8px; height: 8px; background: #e6e6e6; animation-name: smokeRise; animation-iteration-count: infinite; animation-timing-function: ease-out; image-rendering: pixelated; }
`}</style>
  );
}

function useIsWide(min = 1024) {
  const [wide, setWide] = useState(
    () => typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia(`(min-width: ${min}px)`).matches
      : true,
  );
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia(`(min-width: ${min}px)`);
    const handler = (e) => setWide(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, [min]);
  return wide;
}

function PixelSpeaker({ on }) {
  return (
    <svg viewBox="0 0 16 12" width="16" height="12" shapeRendering="crispEdges">
      <rect x="1" y="4" width="3" height="4" fill="#333" />
      <rect x="4" y="3" width="2" height="6" fill="#333" />
      <rect x="6" y="4" width="1" height="4" fill="#333" />
      {on ? (
        <g>
          <rect x="9" y="3" width="1" height="1" fill="#333" />
          <rect x="10" y="2" width="1" height="1" fill="#333" />
          <rect x="10" y="5" width="1" height="1" fill="#333" />
          <rect x="11" y="1" width="1" height="1" fill="#333" />
          <rect x="11" y="6" width="1" height="1" fill="#333" />
        </g>
      ) : (
        <g>
          <rect x="9" y="3" width="1" height="1" fill="#333" />
          <rect x="10" y="4" width="1" height="1" fill="#333" />
          <rect x="11" y="5" width="1" height="1" fill="#333" />
          <rect x="10" y="6" width="1" height="1" fill="#333" />
          <rect x="9" y="7" width="1" height="1" fill="#333" />
        </g>
      )}
    </svg>
  );
}

function AmbientAudioControl({ inside = false }) {
  const [on, setOn] = useState(false);
  const ctxRef = useRef(null);
  const masterRef = useRef(null);
  const timersRef = useRef([]);
  const ambRef = useRef({ src: null, hp: null, lp: null, gain: null });

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const playChirp = (ctx, t, panVal) => {
    const master = masterRef.current;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    const bp = ctx.createBiquadFilter();
    const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    const f0 = 2800 + Math.random() * 2400;
    const up = Math.random() < 0.5;
    const f1 = up ? f0 * (1.25 + Math.random() * 0.25) : f0 * (0.7 + Math.random() * 0.15);
    osc.type = "triangle";
    bp.type = "bandpass";
    bp.Q.value = 10;
    bp.frequency.setValueAtTime(f0, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.06 + Math.random() * 0.03, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18 + Math.random() * 0.08);
    osc.frequency.setValueAtTime(f0, t);
    osc.frequency.exponentialRampToValueAtTime(f1, t + 0.16);
    const vibr = ctx.createOscillator();
    const vibrGain = ctx.createGain();
    vibr.type = "sine";
    vibr.frequency.value = 7 + Math.random() * 3;
    vibrGain.gain.value = f0 * 0.02;
    vibr.connect(vibrGain);
    vibrGain.connect(osc.frequency);
    if (p) p.pan.value = panVal;
    osc.connect(bp);
    bp.connect(g);
    if (p) {
      g.connect(p);
      p.connect(master);
    } else {
      g.connect(master);
    }
    osc.start(t);
    vibr.start(t);
    osc.stop(t + 0.24);
    vibr.stop(t + 0.24);
  };

  const startAmbience = (ctx) => {
    const length = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * 0.05;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 500;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 3000;
    const g = ctx.createGain();
    g.gain.value = 0.03;
    src.connect(hp);
    hp.connect(lp);
    lp.connect(g);
    g.connect(masterRef.current);
    src.start();
    ambRef.current = { src, hp, lp, gain: g };
  };

  const stopAmbience = () => {
    const a = ambRef.current;
    if (a.src) {
      try {
        a.src.stop();
      } catch {}
    }
    ambRef.current = { src: null, hp: null, lp: null, gain: null };
  };

  const start = async () => {
    let ctx = ctxRef.current;
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      ctxRef.current = ctx;
      const master = ctx.createGain();
      master.gain.value = 0.22;
      master.connect(ctx.destination);
      masterRef.current = master;
      startAmbience(ctx);
      const loop = () => {
        const delay = 250 + Math.random() * 900;
        const id = setTimeout(() => {
          if (!ctx || ctx.state !== "running") {
            loop();
            return;
          }
          const now = ctx.currentTime + 0.03;
          const birds = 2 + Math.floor(Math.random() * 2);
          for (let b = 0; b < birds; b++) {
            const pan = (Math.random() * 2 - 1) * 0.7;
            const chirps = 3 + Math.floor(Math.random() * 3);
            let t = now + Math.random() * 0.15;
            for (let i = 0; i < chirps; i++) {
              playChirp(ctx, t, pan);
              t += 0.06 + Math.random() * 0.07;
            }
          }
          loop();
        }, delay);
        timersRef.current.push(id);
      };
      loop();
    }
    await ctx.resume();
  };

  const stop = async () => {
    clearTimers();
    stopAmbience();
    const ctx = ctxRef.current;
    if (ctx) await ctx.suspend();
  };

  useEffect(
    () => () => {
      clearTimers();
      stopAmbience();
      const ctx = ctxRef.current;
      if (ctx) ctx.close();
    },
    [],
  );

  const pos = inside ? "absolute top-2 right-2" : "fixed top-3 right-3";
  return (
    <button
      aria-label={on ? "Sound on" : "Sound off"}
      onClick={async () => {
        if (!on) {
          await start();
          setOn(true);
        } else {
          await stop();
          setOn(false);
        }
      }}
      className={`${pos} z-[60] retro-btn`}
    >
      <PixelSpeaker on={on} />
    </button>
  );
}

(function runSmokeTests() {
  try {
    const clouds = spawnCloudsEnsured();
    console.assert(Array.isArray(clouds) && clouds.length >= 3, "Clouds should spawn at least 3");
    console.assert(new Set(PROJECTS.map((p) => p.slug)).size === PROJECTS.length, "Project slugs must be unique");
    const r1 = parseRoute("/");
    console.assert(r1.page === "home", "Home route failed");
    const r2 = parseRoute("/skills");
    console.assert(r2.page === "skills", "Skills route failed");
    const r3 = parseRoute("/p/countdown-live-wallpaper");
    console.assert(r3.page === "project" && r3.slug === "countdown-live-wallpaper", "Project route failed");
    const r4 = parseRoute("/p/not-a-real-one");
    console.assert(r4.page === "notfound", "NotFound for invalid slug failed");
    const r5 = parseRoute("/p/ghost-soundboard");
    console.assert(r5.page === "project" && r5.slug === "ghost-soundboard", "Project route for ghost failed");
    const r6 = parseRoute("/skills?tab=all");
    console.assert(r6.page === "skills", "Querystring handling failed");
    const r7 = parseRoute("/p/cad-gps-holder");
    console.assert(r7.page === "project" && r7.slug === "cad-gps-holder", "Project route CAD failed");
    const testB = [{ id: "t", x: 111, y: 40, speed: 5, baseTop: 40, bobAmp: 2, bobSpeed: 1, phase: 0 }];
    const stepped = stepBalloons(testB, 1);
    console.assert(stepped[0].x <= -11.9, "Balloon wrap failed");
    console.assert(stepped.length === testB.length, "Balloon count must remain constant");
  } catch (e) {}
})();

export default function App() {
  const wide = useIsWide(1400);
  const { path } = useHashRouter();
  usePageTitle(path);
  const r = parseRoute(path);
  let view = null;
  if (r.page === "home") view = <Home />;
  else if (r.page === "skills") view = <SkillsPage />;
  else if (r.page === "project") view = <ProjectPage slug={r.slug} />;
  else view = <NotFound />;
  const content = wide ? (
    <RetroRig>
      <ErrorBoundary key={path}>{view}</ErrorBoundary>
    </RetroRig>
  ) : (
    <React.Fragment>
      <AmbientAudioControl />
      <ErrorBoundary key={path}>{view}</ErrorBoundary>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <StyleOverlays />
      {content}
    </React.Fragment>
  );
}
