import React, { useEffect, useRef, useState } from "react";
import { HERO_SKILLS, SKILLS, STATUS_COLORS } from "./data.js";
import { useProjects } from "./projects.js";
import { BiplaneSprite, GardenTree, GardenLife, CaveScenery, MineEntrance } from "./Scenery.jsx";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <main className="error-screen">
        <div className="parchment-card">
          <span className="eyebrow">A small detour</span>
          <h1>Something went wrong</h1>
          <p>Head back to the surface and try again.</p>
          <a className="button button--wood" href="#/">Back home <ArrowIcon /></a>
        </div>
      </main>
    );
  }
}

function getHashPath() {
  const raw = typeof window === "undefined" ? "/" : window.location.hash.replace(/^#/, "");
  if (!raw || raw === "/") return "/";
  if (raw.startsWith("/")) return raw.split("?")[0];
  return `/${raw.split("?")[0]}`;
}

function parseRoute(path) {
  if (path === "/" || path === "/projects" || path === "/about") return { page: "home" };
  if (path === "/skills") return { page: "skills" };
  const project = path.match(/^\/p\/([^/]+)$/);
  if (project) return { page: "project", slug: project[1] };
  return { page: "notfound" };
}

function useHashRouter() {
  const [path, setPath] = useState(getHashPath);
  useEffect(() => {
    const onHash = () => setPath(getHashPath());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return { path };
}

function usePageTitle(path, projects) {
  useEffect(() => {
    const route = parseRoute(path);
    const project = route.page === "project" ? projects.find((item) => item.slug === route.slug) : null;
    const title = route.page === "skills" ? "Skills" : project?.title || "Playful software";
    document.title = `${title} · N.F. Studio`;
  }, [path, projects]);
}

function PixelWallpaper({ pixelSize = 4 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const cssWidth = canvas.parentElement?.clientWidth || window.innerWidth;
      const cssHeight = canvas.parentElement?.clientHeight || window.innerHeight;
      const width = Math.max(160, Math.floor(cssWidth / pixelSize));
      const height = Math.max(90, Math.floor(cssHeight / pixelSize));
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) return;

      const sky = context.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, "#4aa7f1");
      sky.addColorStop(0.64, "#a3e6ff");
      sky.addColorStop(1, "#dcf4ff");
      context.fillStyle = sky;
      context.fillRect(0, 0, width, height);

      const hill = (phase, base, amplitude, color) => {
        context.fillStyle = color;
        for (let x = 0; x < width; x++) {
          const position = x / width;
          const y = Math.floor(
            base - Math.sin((position + phase) * Math.PI) * amplitude -
              Math.sin((position * 3 + phase) * Math.PI) * amplitude * 0.22,
          );
          context.fillRect(x, y, 1, height - y);
        }
      };
      // The landscape occupies a fixed band above the grass, even on tall phones.
      const landscape = Math.min(310, Math.max(220, cssWidth * .24)) / pixelSize;
      hill(.18, height - landscape * .9, landscape * .64, "#4b8db7");
      hill(.61, height - landscape * .73, landscape * .6, "#376d83");
      hill(.05, height - landscape * .48, landscape * .33, "#38874c");
      hill(.52, height - landscape * .25, landscape * .32, "#50a54e");

      // Both the stream and its bridge use the same cross-section geometry.
      // Start below the mountain layer, where the green valley is already visible.
      const riverStart = Math.floor(height - landscape * .58);
      const riverEnd = height - 5;
      const riverSection = (y) => {
        const flow = Math.max(0, Math.min(1, (y - riverStart) / (riverEnd - riverStart)));
        return {
          center: Math.floor(width * (.55 + Math.sin(flow * Math.PI * 1.8) * .035 - flow * .035)),
          span: Math.max(3, Math.round((12 + flow * flow * Math.min(110, cssWidth * .17)) / pixelSize)),
        };
      };
      const bridgeY = height - Math.round(90 / pixelSize);
      const bridgeChannel = riverSection(bridgeY + 4);
      const bridgeBankOverlap = Math.max(4, Math.ceil((18 - bridgeChannel.span) / 2));
      const bridgeBaseWidth = bridgeChannel.span + bridgeBankOverlap * 2;
      // Extend both ends by 15% overall; shift 20 screen pixels right on desktop, scaling down on phones.
      const bridgeWidth = Math.round(bridgeBaseWidth * 1.15);
      const bridgeShift = Math.round(Math.min(20, cssWidth / 64) * width / cssWidth);
      const bridgeLeft = Math.round(bridgeChannel.center - Math.floor(bridgeChannel.span / 2) - bridgeBankOverlap
        - (bridgeWidth - bridgeBaseWidth) / 2 + bridgeShift);
      const bridgeRise = Math.max(2, Math.min(4, Math.round(bridgeBaseWidth * .12)));
      const bridgeDeckY = (offset) => {
        const position = offset / (bridgeWidth - 1) * 2 - 1;
        return bridgeY - Math.round(bridgeRise * (1 - position * position));
      };

      const houseLeft = cssWidth <= 480 ? 34 : cssWidth <= 760 ? 55 : Math.min(210, Math.max(80, cssWidth * .11));
      const houseWidth = cssWidth <= 480 ? 130 : cssWidth <= 760 ? 146 : Math.min(228, Math.max(140, cssWidth * .17));
      const pathX = (houseLeft + houseWidth * 40 / 96) / pixelSize;
      const pathY = height - (33 + houseWidth * 6 / 96) / pixelSize;
      const pathSteps = Math.max(1, Math.ceil(bridgeLeft - pathX));
      for (let step = 0; step <= pathSteps; step++) {
        const flow = step / pathSteps;
        const x = Math.round(pathX + (bridgeLeft - pathX) * flow);
        const y = Math.round(pathY + (bridgeY - pathY) * flow + Math.sin(flow * Math.PI) * 3);
        context.fillStyle = step % 3 ? "#c8b273" : "#e0ce92";
        context.fillRect(x, y, 2, 2);
      }
      for (let y = riverStart; y < riverEnd; y++) {
        const { center, span } = riverSection(y);
        context.fillStyle = "#49685f";
        context.fillRect(center - Math.floor(span / 2) - 2, y, span + 4, 1);
        context.fillStyle = y % 4 === 0 ? "#6ad2e9" : "#309dc9";
        context.fillRect(center - Math.floor(span / 2), y, span, 1);
        if (y % 5 < 2) {
          context.fillStyle = "#b3f4f5";
          context.fillRect(center - Math.floor(span / 2) + 1, y, Math.max(1, Math.floor(span / 3)), 1);
        }
        if (y % 8 === 0) {
          context.fillStyle = "#82917b";
          context.fillRect(center + Math.floor(span / 2) + 1, y, 3, 2);
        }
      }
      // Deterministic grass, wildflowers and pebbles add detail without flicker.
      let landscapeSeed = 17421;
      const random = () => {
        landscapeSeed = (Math.imul(landscapeSeed, 1664525) + 1013904223) >>> 0;
        return landscapeSeed / 4294967296;
      };
      for (let i = 0; i < width * 3; i++) {
        const x = Math.floor(random() * width);
        const y = height - 7 - Math.floor(random() * landscape * .3);
        if (x > width * .44 && x < width * .61) continue;
        context.fillStyle = i % 3 ? "#6aaf4c" : "#367946";
        context.fillRect(x, y, 1, i % 2 + 1);
        if (i % 11 === 0) {
          context.fillStyle = ["#f4de7c", "#fff3c7", "#e88c6e"][i % 3];
          context.fillRect(x - 1, y - 2, 3, 1);
          context.fillRect(x, y - 3, 1, 3);
          context.fillStyle = "#c39446";
          context.fillRect(x, y - 2, 1, 1);
        }
        if (i % 23 === 0) {
          context.fillStyle = "#657568";
          context.fillRect(x, y, 3, 2);
          context.fillStyle = "#a3a48a";
          context.fillRect(x, y, 2, 1);
        }
      }
      // A low timber arch: the deck, edge beam and handrail follow the same curve.
      for (let offset = 0; offset < bridgeWidth; offset++) {
        const x = bridgeLeft + offset;
        const deckY = bridgeDeckY(offset);
        context.fillStyle = "#493323";
        context.fillRect(x, deckY - 1, 1, 5);
        context.fillStyle = offset % 4 === 0 ? "#956233" : "#ba874c";
        context.fillRect(x, deckY, 1, 2);
        context.fillStyle = "#76502d";
        context.fillRect(x, deckY + 2, 1, 1);
        context.fillStyle = "#533822";
        context.fillRect(x, deckY - 6, 1, 2);
        context.fillStyle = "#d2a164";
        context.fillRect(x, deckY - 6, 1, 1);
      }
      const bridgePostCount = Math.max(3, Math.round((bridgeWidth - 3) / 5));
      for (let post = 0; post <= bridgePostCount; post++) {
        const offset = 1 + Math.round(post * (bridgeWidth - 3) / bridgePostCount);
        const x = bridgeLeft + offset;
        const deckY = bridgeDeckY(offset);
        context.fillStyle = "#674329";
        context.fillRect(x, deckY - 5, 2, 6);
        context.fillStyle = "#e0b369";
        context.fillRect(x, deckY - 5, 1, 5);
      }
    };
    draw();
    const observer = new ResizeObserver(draw);
    if (canvasRef.current?.parentElement) observer.observe(canvasRef.current.parentElement);
    return () => observer.disconnect();
  }, [pixelSize]);

  return <canvas ref={canvasRef} className="pixel-wallpaper" aria-hidden="true" />;
}

function spawnCloudsEnsured() {
  const clouds = Array.from({ length: 6 }, (_, index) => ({
    id: `cloud-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 6)}`,
    x: -20 + Math.random() * 120,
    top: 7 + Math.random() * 21,
    speed: (3 + Math.random() * 5) * 0.7,
    scale: 0.9 + Math.random() * 1.2,
    alpha: 0.64 + Math.random() * 0.36,
  }));
  let visible = clouds.filter((cloud) => cloud.x >= 0 && cloud.x <= 100).length;
  for (let index = 0; visible < 3 && index < clouds.length; index++) {
    if (clouds[index].x < 0 || clouds[index].x > 100) {
      clouds[index].x = Math.random() * 90;
      visible++;
    }
  }
  return clouds;
}

function CloudSprite({ scale = 1 }) {
  const rows = ["  xxx  ", " xxxxx ", "xxxxxxx", " xxxxx "];
  return (
    <div className="cloud-shape" aria-hidden="true">
      {rows.map((row, rowIndex) => (
        <div className="cloud-row" key={rowIndex}>
          {row.split("").map((cell, cellIndex) => (
            <span
              className={cell === "x" ? "cloud-cell cloud-cell--filled" : "cloud-cell"}
              key={cellIndex}
              style={{ "--pixel-size": `${10 * scale}px` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function PixelClouds() {
  const [clouds, setClouds] = useState(spawnCloudsEnsured);
  const lastFrame = useRef(0);
  const animationFrame = useRef(0);
  useEffect(() => {
    const step = (time) => {
      if (!lastFrame.current) lastFrame.current = time;
      const delta = Math.min(0.05, (time - lastFrame.current) / 1000);
      lastFrame.current = time;
      setClouds((previous) =>
        previous.map((cloud) => ({
          ...cloud,
          x: cloud.x + cloud.speed * delta > 120 ? -20 : cloud.x + cloud.speed * delta,
        })),
      );
      animationFrame.current = requestAnimationFrame(step);
    };
    animationFrame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame.current);
  }, []);

  return (
    <div className="scene-clouds" aria-hidden="true">
      {clouds.map((cloud) => (
        <div
          className="scene-cloud"
          key={cloud.id}
          style={{ left: `${cloud.x}%`, top: `${cloud.top}%`, opacity: cloud.alpha }}
        >
          <CloudSprite scale={cloud.scale} />
        </div>
      ))}
    </div>
  );
}

function PixelBalloonSprite({ variant = 0 }) {
  const palette = [
    { body: "#e96f45", light: "#ffc080", dark: "#a83b33", basket: "#70442c" },
    { body: "#e8bb42", light: "#ffe69a", dark: "#ad762e", basket: "#754b32" },
    { body: "#568bd1", light: "#b5e3ff", dark: "#365b9b", basket: "#754b32" },
    { body: "#a769bb", light: "#e3b7e9", dark: "#71418d", basket: "#754b32" },
    { body: "#55a977", light: "#a8e69d", dark: "#377250", basket: "#754b32" },
  ][variant % 5];
  return (
    <svg viewBox="0 0 40 52" width="38" height="50" shapeRendering="crispEdges">
      <rect x="15" y="37" width="10" height="8" fill="#452c25" />
      <rect x="13" y="34" width="2" height="9" fill="#a87851" />
      <rect x="25" y="34" width="2" height="9" fill="#a87851" />
      <rect x="12" y="9" width="16" height="25" fill={palette.dark} />
      <rect x="9" y="13" width="22" height="17" fill={palette.body} />
      <rect x="14" y="8" width="12" height="3" fill={palette.body} />
      <rect x="16" y="11" width="4" height="18" fill={palette.light} />
      <rect x="10" y="17" width="2" height="10" fill={palette.body} />
      <rect x="28" y="17" width="2" height="10" fill={palette.dark} />
      <rect x="19" y="34" width="2" height="4" fill="#e1c69b" />
      <rect x="13" y="46" width="14" height="3" fill={palette.dark} />
    </svg>
  );
}

function PixelBalloons() {
  const [balloons, setBalloons] = useState(() => {
    const count = 3 + Math.floor(Math.random() * 3);
    return Array.from({ length: count }, (_, index) => ({
      id: `balloon-${Date.now()}-${index}`,
      variant: index,
      scale: 0.86 + Math.random() * 0.45,
      baseTop: 18 + Math.random() * 19,
      bobAmplitude: 0.8 + Math.random() * 0.8,
      bobSpeed: 0.8 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      x: -10 + Math.random() * 95,
      speed: 2 + Math.random() * 2.5,
    }));
  });
  const lastFrame = useRef(0);
  const animationFrame = useRef(0);
  useEffect(() => {
    const step = (time) => {
      if (!lastFrame.current) lastFrame.current = time;
      const delta = Math.min(0.05, (time - lastFrame.current) / 1000);
      lastFrame.current = time;
      setBalloons((previous) =>
        previous.map((balloon) => {
          const x = balloon.x + balloon.speed * delta;
          const phase = balloon.phase + balloon.bobSpeed * delta;
          return {
            ...balloon,
            x: x > 110 ? -12 : x,
            y: balloon.baseTop + Math.sin(phase) * balloon.bobAmplitude,
            phase,
          };
        }),
      );
      animationFrame.current = requestAnimationFrame(step);
    };
    animationFrame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame.current);
  }, []);
  return (
    <div className="scene-balloons" aria-hidden="true">
      {balloons.map((balloon) => (
        <div
          className="scene-balloon"
          key={balloon.id}
          style={{
            left: `${balloon.x}%`,
            top: `${balloon.y ?? balloon.baseTop}%`,
            transform: `scale(${balloon.scale})`,
          }}
        >
          <PixelBalloonSprite variant={balloon.variant} />
        </div>
      ))}
    </div>
  );
}

function PixelPlaneSprite() {
  return <BiplaneSprite />;
}

function PixelPlane() {
  const stageRef = useRef(null);
  const planeRef = useRef(null);
  useEffect(() => {
    let animationFrame = 0;
    const fly = (time) => {
      const stage = stageRef.current;
      const plane = planeRef.current;
      if (stage && plane) {
        const bounds = stage.getBoundingClientRect();
        const size = Math.min(bounds.width, bounds.height);
        const radiusX = size * .25;
        const radiusY = size * .12;
        const centerX = bounds.width * .5;
        const centerY = bounds.height * .22;
        const angle = (time / 1000) * .6;
        const x = centerX + radiusX * Math.cos(angle);
        const y = centerY + radiusY * Math.sin(angle);
        const heading = Math.atan2(radiusY * Math.cos(angle), -radiusX * Math.sin(angle)) * 180 / Math.PI;
        plane.style.transform = "translate(" + (x - plane.offsetWidth / 2) + "px, " + (y - plane.offsetHeight / 2) + "px) rotate(" + heading + "deg)";
      }
      animationFrame = requestAnimationFrame(fly);
    };
    animationFrame = requestAnimationFrame(fly);
    return () => cancelAnimationFrame(animationFrame);
  }, []);
  return (
    <div className="scene-plane" ref={stageRef} aria-hidden="true">
      <div className="plane" ref={planeRef}><PixelPlaneSprite /></div>
    </div>
  );
}

function PixelSun() {
  return (
    <div className="pixel-sun" aria-hidden="true">
      <svg viewBox="0 0 64 64" shapeRendering="crispEdges">
        <rect x="25" y="25" width="14" height="14" fill="#ffe27c" />
        <rect x="28" y="22" width="8" height="20" fill="#ffe27c" />
        <rect x="22" y="28" width="20" height="8" fill="#ffe27c" />
        <rect x="29" y="4" width="6" height="13" fill="#fff1aa" />
        <rect x="29" y="47" width="6" height="13" fill="#fff1aa" />
        <rect x="4" y="29" width="13" height="6" fill="#fff1aa" />
        <rect x="47" y="29" width="13" height="6" fill="#fff1aa" />
        <rect x="12" y="12" width="7" height="7" fill="#fff1aa" />
        <rect x="45" y="45" width="7" height="7" fill="#fff1aa" />
        <rect x="45" y="12" width="7" height="7" fill="#fff1aa" />
        <rect x="12" y="45" width="7" height="7" fill="#fff1aa" />
      </svg>
    </div>
  );
}

function PixelTrees() {
  return (
    <div className="scene-trees" aria-hidden="true">
      <div className="scene-tree scene-tree--one"><GardenTree /></div>
      <div className="scene-tree scene-tree--two"><GardenTree variant={1} /></div>
      <div className="scene-tree scene-tree--three"><GardenTree variant={2} /></div>
    </div>
  );
}

function PixelHouseSprite({ scale = 1 }) {
  return (
    <svg viewBox="0 0 96 64" width={96 * scale} height={64 * scale} shapeRendering="crispEdges">
      <rect x="22" y="30" width="52" height="28" fill="#b7773f" />
      <rect x="22" y="30" width="52" height="5" fill="#e5a953" />
      <rect x="22" y="38" width="52" height="3" fill="#92552f" />
      <rect x="22" y="47" width="52" height="3" fill="#92552f" />
      <rect x="22" y="55" width="52" height="3" fill="#92552f" />
      <rect x="16" y="27" width="64" height="7" fill="#553a34" />
      <rect x="20" y="23" width="56" height="7" fill="#85422c" />
      <rect x="26" y="18" width="44" height="7" fill="#a04d30" />
      <rect x="34" y="40" width="12" height="18" fill="#51301f" />
      <rect x="36" y="42" width="8" height="14" fill="#2e251d" />
      <rect x="52" y="40" width="16" height="12" fill="#93d9fa" />
      <rect x="52" y="46" width="16" height="3" fill="#497da2" />
      <rect x="59" y="40" width="3" height="12" fill="#497da2" />
      <rect x="60" y="12" width="9" height="12" fill="#88402a" />
      <rect x="58" y="11" width="13" height="3" fill="#513730" />
    </svg>
  );
}

function PixelHouse({ scale = 2.5 }) {
  const chimneyPuffs = Array.from({ length: 5 }, (_, index) => ({
    id: index,
    delay: index * 0.8 + Math.random() * 0.4,
    duration: 3.5 + Math.random() * 1.5,
    drift: Math.random() * 14 - 7,
  }));
  return (
    <div className="scene-house" style={{ "--house-width": `${96 * scale}px`, "--house-scale": scale }} aria-hidden="true">
      <div className="house-art"><PixelHouseSprite scale={scale} /></div>
      <div className="house-smoke">
        {chimneyPuffs.map((puff) => (
          <span
            className="smoke-pixel"
            key={puff.id}
            style={{ "--smoke-delay": `${puff.delay}s`, "--smoke-duration": `${puff.duration}s`, "--smoke-drift": `${puff.drift}px` }}
          />
        ))}
      </div>
    </div>
  );
}

function SkyScenery({ className = "" }) {
  return (
    <div className={`sky-scenery ${className}`} aria-hidden="true">
      <PixelWallpaper />
      <div className="distant-cloud-bank" />
      <PixelSun />
      <PixelTrees />
      <GardenLife />
      <PixelClouds />
      <PixelBalloons />
      <PixelPlane />
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 12" aria-hidden="true" className="arrow-icon">
      <path d="M1 6h16M12 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function PixelCatSprite() {
  return (
    <svg viewBox="0 0 28 20" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M3 7h4V2h5v4h5V2h5v5h4v8h-4v3H7v-3H3z" fill="#fff0d5" stroke="#3a281f" strokeWidth="2" />
      <rect x="8" y="10" width="2" height="2" fill="#35241e" />
      <rect x="19" y="10" width="2" height="2" fill="#35241e" />
      <rect x="12" y="14" width="4" height="2" fill="#d88978" />
    </svg>
  );
}

function PixelLeafSprite() {
  return (
    <svg className="eyebrow-leaf" viewBox="0 0 20 20" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M3 7h4V3h9v4h3v6h-4v4H8v-4H4V9H3z" fill="#75a94e" stroke="#385d38" strokeWidth="2" />
      <path d="M6 14 15 5" stroke="#d4e59a" strokeWidth="2" />
    </svg>
  );
}

function CrystalSprite({ variant = "violet", className = "" }) {
  const palette = {
    violet: { dark: "#56358f", body: "#8f54df", light: "#e0aaff" },
    blue: { dark: "#1d657d", body: "#32b9d1", light: "#9af3f2" },
    teal: { dark: "#276c59", body: "#50bd87", light: "#b7f1a1" },
  }[variant];
  return (
    <svg className={"pixel-crystal " + className} viewBox="0 0 32 44" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M10 2h12l8 12v18L16 42 2 31V14z" fill={palette.dark} stroke="#211a24" strokeWidth="2" />
      <path d="M11 4h5v29l-9-5V15z" fill={palette.body} />
      <path d="M17 4h4l7 11v14l-7 5-4-2z" fill={palette.light} />
      <path d="M11 4h10v4H11z" fill="#fff1d3" opacity=".75" />
    </svg>
  );
}

function CaveRockClusterSprite() {
  return (
    <svg className="cave-rock-sprite" viewBox="0 0 144 72" shapeRendering="crispEdges" aria-hidden="true">
      <path d="m2 61 3-12 9-4 4-8 11-2 7 7 10-3 5-9 13-2 9 7 8-5 12 2 8 9 11-4 11 5 7 7 10-2 3 5v17H2z" fill="#2d211d" />
      <path d="m5 57 2-9 8-4 4-7 9-1 6 6-2 9-9 7-14-1z" fill="#5f4836" stroke="#2c201b" strokeWidth="3" />
      <path d="m18 45 8-7 7 4-2 5-8 2z" fill="#927454" />
      <path d="m29 57 2-15 8-4 5-8 12-2 8 7-1 14-9 10-17 1z" fill="#765a40" stroke="#30221b" strokeWidth="3" />
      <path d="m39 39 7-7 8-1 4 4-10 3-4 6z" fill="#a1845f" />
      <path d="m61 60 1-12 8-5 3-8 10-3 9 5 3 13-8 12-17 1z" fill="#584536" stroke="#2c201b" strokeWidth="3" />
      <path d="m73 41 8-6 7 3-6 4-5 5z" fill="#80664c" />
      <path d="m90 57 2-16 9-5 4-10 13 1 7 8-1 14-9 12-18 1z" fill="#806344" stroke="#30221b" strokeWidth="3" />
      <path d="m103 34 7-5 9 2 3 5-11-1-5 5z" fill="#b09268" />
      <path d="m119 59 2-12 8-5 9 3 4 6v12h-20z" fill="#614a37" stroke="#2c201b" strokeWidth="3" />
      <path d="m128 47 7 1 3 4h-9z" fill="#927454" />
      <rect x="51" y="54" width="4" height="3" fill="#392a21" />
      <rect x="110" y="47" width="4" height="3" fill="#392a21" />
    </svg>
  );
}
function TreasureChestSprite() {
  return (
    <svg className="treasure-chest" viewBox="0 0 68 48" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M7 17V9h7V4h40v5h7v8h4v27H3V17z" fill="#633d25" stroke="#241a17" strokeWidth="3" />
      <path d="M10 14V9h7V6h34v3h7v5z" fill="#bd772f" />
      <path d="M6 19h56v22H6z" fill="#9b5628" stroke="#321f19" strokeWidth="2" />
      <path d="M10 22h48v4H10zm0 13h48v4H10z" fill="#d99a43" />
      <path d="M29 18h10v24H29z" fill="#f0c65c" stroke="#51301e" strokeWidth="2" />
      <rect x="32" y="26" width="4" height="6" fill="#51301e" />
    </svg>
  );
}


function Brand() {
  return (
    <a className="brand-plaque" href="#/" aria-label="N.F. Studio home">
      <span className="brand-critters" aria-hidden="true"><PixelCatSprite /></span>
      <span className="brand-monogram">N.F.</span>
    </a>
  );
}

function scrollToProjects(event) {
  event.preventDefault();
  const go = () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
  if (parseRoute(getHashPath()).page !== "home") {
    window.location.hash = "/";
    window.setTimeout(go, 100);
  } else {
    go();
  }
}

function SiteHeader() {
  return (
    <header className="site-header">
      <Brand />
      <nav className="wood-nav" aria-label="Main navigation">
        <a className="wood-link" href="https://linkedin.com/in/niko-filipi%C4%87-637189240" target="_blank" rel="nofollow noopener noreferrer" referrerPolicy="no-referrer">
          <span className="linkedin-mark" aria-hidden="true">in</span><span>LinkedIn</span>
        </a>
        <a className="wood-link" href="https://github.com/buxerr" target="_blank" rel="nofollow noopener noreferrer" referrerPolicy="no-referrer">
          <GithubIcon /><span>GitHub</span>
        </a>
        <a className="wood-link" href="#/skills"><SkillsIcon /><span>Skills</span></a>

      </nav>
    </header>
  );
}

function GithubIcon() {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.21.68-.48v-1.68c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.64.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.96 0-1.1.39-2 1.03-2.7-.1-.25-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.97a9.6 9.6 0 0 1 2.5.34c1.9-1.3 2.75-1.03 2.75-1.03.54 1.38.2 2.41.1 2.66.64.7 1.03 1.6 1.03 2.7 0 3.86-2.35 4.7-4.58 4.95.36.31.68.93.68 1.88V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function SkillsIcon() {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 19V9h4v10H4Zm6 0V5h4v14h-4Zm6 0v-7h4v7h-4Z" fill="currentColor" />
    </svg>
  );
}

function PixelBadge({ children, light = false }) {
  return <span className={`pixel-badge${light ? " pixel-badge--light" : ""}`}>{children}</span>;
}

function ImageOrThumb({ project, className = "" }) {
  const [showImage, setShowImage] = useState(Boolean(project.img));
  useEffect(() => setShowImage(Boolean(project.img)), [project.img]);
  if (showImage) {
    return <img className={className} src={project.img} style={{ objectFit: project.imageFit }} alt={project.title} onError={() => setShowImage(false)} />;
  }
  return <div className={`generated-thumb ${className}`} aria-label={`Pixel art preview for ${project.title}`}><PixelThumb seed={project.slug} /></div>;
}

function PixelThumb({ seed }) {
  let state = 2166136261;
  for (const char of seed) state = Math.imul(state ^ char.charCodeAt(0), 16777619);
  const cells = [];
  let next = state >>> 0;
  for (let index = 0; index < 160; index++) {
    next = (Math.imul(next, 1664525) + 1013904223) >>> 0;
    const value = next / 4294967296;
    if (value > 0.68) cells.push(<rect key={index} x={index % 16} y={Math.floor(index / 16)} width="1" height="1" fill={value > 0.91 ? "#dfaa4b" : "#764b38"} />);
  }
  return (
    <svg viewBox="0 0 16 10" width="100%" height="100%" shapeRendering="crispEdges" aria-hidden="true">
      <rect width="16" height="10" fill="#241b2b" />
      {cells}
      <rect x="3" y="6" width="10" height="1" fill="#4d80ad" />
      <rect x="5" y="5" width="6" height="2" fill="#72bfdc" />
    </svg>
  );
}

function ProjectMeta({ project }) {
  return (
    <div className="project-meta">
      {project.tags.slice(0, 3).map((tag) => <span className="project-tag" key={tag}>{tag}</span>)}
      <span className="project-year">{project.year}</span>
    </div>
  );
}

function FeaturedCard({ project }) {
  return (
    <a className="featured-card" href={`#/p/${project.slug}`}>
      <div className="featured-image-frame">
        <ImageOrThumb project={project} className="featured-image pixel-image" />
        <span className="image-corner image-corner--tl" />
        <span className="image-corner image-corner--br" />
        <span className="featured-status">{project.status}</span>
      </div>
      <div className="featured-copy">
        <span className="card-eyebrow">Featured project · {project.year}</span>
        <h2>{project.title}</h2>
        <p>{project.summary}</p>
        <ProjectMeta project={project} />
        <span className="open-project">Open project <ArrowIcon /></span>
      </div>
    </a>
  );
}

function FeaturedBoard({ projects, loaded, error }) {
  const featured = projects.filter((project) => project.highlighted).slice(0, 4);
  return (
    <section className="featured-board" aria-labelledby="featured-title">
      <div className="section-kicker">
        <PixelBadge>On the surface</PixelBadge>
        <span className="slot-count">{String(featured.length).padStart(2, "0")} / 04</span>
      </div>
      <h2 id="featured-title" className="visually-hidden">Highlighted projects</h2>
      {featured.length ? (
        <div className={`featured-list${featured.length > 1 ? " featured-list--many" : ""}`}>
          {featured.map((project) => <FeaturedCard key={project.slug} project={project} />)}
        </div>
      ) : (
        <div className="feature-empty">
          <p>{!loaded ? "Discovering projects…" : error ? "Projects are taking a little longer to load. Please try again shortly." : "The next discovery is taking shape."}</p>
        </div>
      )}
      <div className="feature-slots" aria-label={`${featured.length} of 4 highlighted project slots used`}>
        {Array.from({ length: 4 }, (_, index) => (
          <span className={index < featured.length ? "feature-slot feature-slot--filled" : "feature-slot"} key={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, number }) {
  return (
    <a className="project-card" href={`#/p/${project.slug}`}>
      <div className="project-card__image-frame">
        <ImageOrThumb project={project} className="project-card__image pixel-image" />
        <span className="project-card__number">{String(number).padStart(2, "0")}</span>
      </div>
      <div className="project-card__body">
        <div className="project-card__heading">
          <h3>{project.title}</h3>
          <span className={`status-dot status-dot--${project.status}`} aria-label={project.status} title={project.status} />
        </div>
        <p>{project.summary}</p>
        <ProjectMeta project={project} />
        <span className="card-link">View project <ArrowIcon /></span>
      </div>
    </a>
  );
}

function Lantern({ className = "" }) {
  return (
    <svg className={`lantern ${className}`} viewBox="0 0 34 54" aria-hidden="true" shapeRendering="crispEdges">
      <path d="M11 7V3h12v4" fill="none" stroke="#5b3525" strokeWidth="3" />
      <rect x="7" y="8" width="20" height="4" fill="#79502f" />
      <rect x="5" y="12" width="24" height="28" fill="#512f23" />
      <rect x="9" y="15" width="16" height="22" fill="#f6b64e" />
      <rect x="12" y="18" width="10" height="16" fill="#ffe096" />
      <rect x="7" y="40" width="20" height="4" fill="#79502f" />
      <rect x="13" y="44" width="8" height="3" fill="#503329" />
      <rect x="16" y="19" width="3" height="12" fill="#fff3bd" opacity=".8" />
    </svg>
  );
}

function Underground({ projects, loaded, error }) {
  const surfaceSlugs = new Set(projects.filter((project) => project.highlighted).slice(0, 4).map((project) => project.slug));
  const allProjects = projects.filter((project) => !surfaceSlugs.has(project.slug));
  return (
    <section className="underground" id="projects" aria-labelledby="all-projects-title">
      <CaveScenery />
      <div className="soil-lip" aria-hidden="true">
        <div className="grass-pixels" />
        <div className="hanging-roots" />
      </div>
      <div className="cave-side cave-side--left" aria-hidden="true">
        <CaveRockClusterSprite />
        <CrystalSprite variant="teal" />
      </div>
      <div className="cave-side cave-side--right" aria-hidden="true">
        <CaveRockClusterSprite />
        <CrystalSprite variant="blue" />
      </div>
      <div className="underground-inner">
        <div className="cave-title">
          <PixelBadge light>Below the garden</PixelBadge>
          <div className="title-plaque">
            <h2 id="all-projects-title">All Projects</h2>
            <span className="sign-lantern sign-lantern--left" aria-hidden="true"><Lantern /></span>
            <span className="sign-lantern sign-lantern--right" aria-hidden="true"><Lantern /></span>
          </div>
          <p>Little builds, big ideas, and everything in between.</p>
        </div>
        <div className="projects-grid">
          {!allProjects.length && <p className="catalog-notice" role="status">{!loaded ? "Discovering projects…" : error ? "Projects are taking a little longer to load. Please try again shortly." : "More discoveries are on their way."}</p>}
          {allProjects.map((project, index) => <ProjectCard key={project.slug} project={project} number={index + 1} />)}
        </div>
      </div>
      <div className="cave-bottom-art" aria-hidden="true">
        <MineEntrance />
        <CrystalSprite variant="violet" className="crystal--purple" />
        <CrystalSprite variant="blue" className="crystal--blue" />
        <TreasureChestSprite />
      </div>
    </section>
  );
}

function SubpageFrame({ children, className = "" }) {
  return (
    <main className={`subpage ${className}`}>
      <SkyScenery className="sky-scenery--subpage" />
      <SiteHeader />
      <div className="subpage-content">{children}</div>
      <a className="back-home button button--wood" href="#/"><span aria-hidden="true">←</span> Back to the garden</a>
    </main>
  );
}

function ProjectPage({ slug, projects, loaded, error }) {
  if (!loaded || (error && !projects.length)) return <SubpageFrame><p className="catalog-notice" role="status">{!loaded ? "Discovering projects…" : "Projects are taking a little longer to load. Please try again shortly."}</p></SubpageFrame>;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <NotFound />;
  return (
    <SubpageFrame className="project-detail-page">
      <article className="detail-card">
        <PixelBadge>{project.year} · {project.status}</PixelBadge>
        <div className="detail-image-frame"><ImageOrThumb project={project} className="detail-image pixel-image" /></div>
        <h1>{project.title}</h1>
        <p className="detail-summary">{project.summary}</p>
        <p className="detail-body">{project.body}</p>
        <ProjectMeta project={project} />
        {project.url && (
          <a className="button button--parchment detail-action" href={project.url} target="_blank" rel="nofollow noopener noreferrer">
            {project.linkLabel} <ArrowIcon />
          </a>
        )}
      </article>
    </SubpageFrame>
  );
}

function SkillsPage() {
  return (
    <SubpageFrame className="skills-page">
      <div className="skills-intro parchment-card">
        <PixelBadge>Field notes</PixelBadge>
        <h1>Tools of the trade</h1>
        <p>A growing collection of languages, tools, and techniques used to bring each little world to life.</p>
      </div>
      <div className="skills-grid">
        {SKILLS.map((category) => (
          <section className="skill-card" key={category.category}>
            <h2>{category.category}</h2>
            <ul>
              {category.items.map((skill) => (
                <li key={skill.name}>
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-desc">{skill.desc}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </SubpageFrame>
  );
}

function NotFound() {
  return (
    <SubpageFrame className="not-found-page">
      <div className="parchment-card">
        <PixelBadge>Map fragment 404</PixelBadge>
        <h1>Lost in the clouds</h1>
        <p>This little path doesn’t lead anywhere yet.</p>
      </div>
    </SubpageFrame>
  );
}

function Home({ projects, loaded, error }) {
  return (
    <div className="portfolio-home">
      <section className="surface-scene" aria-label="Pixel art garden and featured work">
        <SkyScenery />
        <PixelHouse />
        <SiteHeader />
        <div className="surface-content" id="about">
          <section className="intro-card parchment-card">
            <span className="eyebrow"><PixelLeafSprite /> A small corner of the internet</span>
            <h1>Hi — I'm Niko Filipić</h1>
            <p>I'm a Croatian developer from Zagreb studying at Algebra University College. I build Android and web apps and enjoy UI design, algorithms and turning ideas into shipped products. I'm passionate about robotics — especially FPV drones and other UAVs.</p>
            <div className="hero-skills" aria-label="Selected skills">
              {HERO_SKILLS.slice(0, 8).map((skill) => <span className="hero-skill" key={skill}>{skill}</span>)}
            </div>
            <a className="hero-more" href="#/skills">View more <ArrowIcon /></a>
            <a className="button button--parchment intro-link" href="#projects" onClick={scrollToProjects}>Explore all projects <ArrowIcon /></a>
            <span className="parchment-vine parchment-vine--top" aria-hidden="true">❧</span>
            <span className="parchment-vine parchment-vine--bottom" aria-hidden="true">❧</span>
          </section>
          <FeaturedBoard projects={projects} loaded={loaded} error={error} />
        </div>

        <div className="ground-separator" aria-hidden="true"><span /></div>
      </section>
      <Underground projects={projects} loaded={loaded} error={error} />
      <footer className="site-footer">
        <Brand />
        <span>Made with care, one pixel at a time.</span>
        <a href="#about">Back to the surface ↑</a>
      </footer>
    </div>
  );
}

export default function App() {
  const { path } = useHashRouter();
  const catalog = useProjects();
  usePageTitle(path, catalog.projects);
  const route = parseRoute(path);
  let page = <NotFound />;
  if (route.page === "home") page = <Home {...catalog} />;
  if (route.page === "skills") page = <SkillsPage />;
  if (route.page === "project") page = <ProjectPage slug={route.slug} {...catalog} />;
  return <ErrorBoundary key={path}>{page}</ErrorBoundary>;
}
