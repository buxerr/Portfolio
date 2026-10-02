import React from "react";

// Small, original pixel sprites share one palette and integer coordinates.
export function BiplaneSprite() {
  return (
    <svg viewBox="0 0 128 72" shapeRendering="crispEdges" aria-hidden="true">
      {/* Far wing and the open space between the two wings. */}
      <path d="M38 45h49l12 6v4H34v-5z" fill="#7f2728" stroke="#392727" strokeWidth="2" />
      <path d="M40 47h45l8 4H38z" fill="#e25c42" />
      <path d="M43 22h3v25h-3zm39 0h3v25h-3z" fill="#573d31" />
      <path d="m46 24 36 21m0-21L46 45" stroke="#d5b47a" strokeWidth="1" />
      {/* Tail fin, tapered fuselage, engine cowling. */}
      <path d="M12 33V18h7l9 17z" fill="#b53732" stroke="#392727" strokeWidth="2" />
      <path d="M14 21h4l5 12h-9z" fill="#f27a4b" />
      <path d="M7 38h20l25-6h42l12 5v11l-14 3H55l-28-7H7z" fill="#ac342e" stroke="#392727" strokeWidth="2" />
      <path d="m25 38 32-3h32l12 5H55l-27 2z" fill="#ef7049" />
      <path d="M40 44h51v5H55z" fill="#7d272c" />
      <path d="M9 37h23l-4 4H5v-2z" fill="#f9bd65" stroke="#633b2b" strokeWidth="1" />
      <path d="M91 34h11l7 6v8l-8 3H91z" fill="#c44132" />
      <path d="M93 36h7l5 4h-12z" fill="#f29154" />
      <path d="M102 39h5v9h-5z" fill="#825b48" />
      <path d="M108 40h5v7h-5z" fill="#e9ca84" stroke="#49382c" strokeWidth="2" />
      {/* Pilot, leather helmet, goggles and little windscreen. */}
      <path d="M56 33h19v5H56z" fill="#332927" />
      <path d="M60 29v-5h9v10H59z" fill="#654133" />
      <path d="M64 28h7v5h-7z" fill="#efc192" />
      <path d="M67 27h6v3h-6z" fill="#d9edf0" stroke="#3d4d57" strokeWidth="1" />
      <path d="M76 34v-9h4l5 9z" fill="#9edfea" stroke="#4b7582" strokeWidth="1" />
      {/* Upper wing sits above the cockpit, rather than flattening the silhouette. */}
      <path d="M31 17h57l13 6v5H28v-6z" fill="#a82f2e" stroke="#392727" strokeWidth="2" />
      <path d="M34 19h52l10 4H31z" fill="#f97c4a" />
      <path d="M32 25h66v2H32z" fill="#702b2b" />
      <path d="M40 20v4m9-4v4m9-4v4m9-4v4m9-4v4m9-4v4" stroke="#d9553d" strokeWidth="1" />
      <path d="M53 40h15v3H53z" fill="#f6d88e" />
      {/* Landing gear and two wheels. */}
      <path d="m59 51 5 10m18-10-9 10" stroke="#49362c" strokeWidth="3" />
      <path d="M61 60h17v2H61z" fill="#a69373" />
      <path d="M62 58h8v9h-8zm11 1h8v8h-8z" fill="#28282a" />
      <path d="M64 60h4v5h-4zm11 1h4v4h-4z" fill="#a7a398" />
      <path d="M21 46h3v8h-3zm0 7h6v3h-6z" fill="#49362c" />
      <g className="plane-propeller">
        <path d="M115 25h3v15h-3zm0 22h3v15h-3z" fill="#4d3930" />
        <path d="M115 25h3v4h-3zm0 33h3v4h-3z" fill="#eee0b4" />
        <path d="M112 41h8v5h-8z" fill="#382b28" />
        <rect x="114" y="42" width="3" height="2" fill="#ddb77c" />
      </g>
    </svg>
  );
}

export function GardenTree({ variant = 0 }) {
  const leaves = [];
  const palette = variant === 2
    ? ["#285d39", "#347446", "#488b4b", "#64a554", "#89bd63"]
    : ["#1d5534", "#27703a", "#368440", "#539c43", "#7ab94f"];
  for (let y = 4; y < 116; y += 4) {
    for (let x = 0; x < 120; x += 4) {
      const inCrown = [[55, 39, 41, 33], [30, 66, 29, 30], [85, 63, 33, 37], [59, 88, 43, 26]]
        .some(([cx, cy, rx, ry]) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 < 1);
      const noise = ((x * 19 + y * 37 + x * y * 3 + variant * 67) % 101) / 101;
      if (inCrown && !(noise > .96 && y > 80)) {
        const light = Math.max(0, Math.min(4, Math.floor(noise * 3 + (116 - x - y) / 75)));
        leaves.push(<rect key={`${x}-${y}`} x={x} y={y} width="5" height="5" fill={palette[light]} />);
        if (noise > .82) leaves.push(<rect key={`shine-${x}-${y}`} x={x} y={y} width="2" height="2" fill="#a1c965" opacity=".65" />);
      }
    }
  }
  return (
    <svg viewBox="0 0 120 164" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M49 160h28l-9-17-1-33 23-23-8-7-19 19-4-39h-9l2 50-26-26-7 8 31 33-2 24z" fill="#553a28" />
      <path d="m53 155 4-34-2-32h5l3 50 6 16z" fill="#ac713a" />
      <path d="m55 124-23-29 3-3 20 22zm10-14 17-21 3 1-20 26z" fill="#8a592f" />
      {leaves}
      <path d="M55 131h4v9h-4zm7 12h3v7h-3zm-12 6h3v6h-3z" fill="#65402c" />
      <path d="m43 162 8-9h18l10 9z" fill="#765034" />
      <path d="M35 160h14v4H35zm37-1h15v5H72z" fill="#397341" />
    </svg>
  );
}

export function GardenLife() {
  return (
    <div className="garden-life" aria-hidden="true">
      <svg className="garden-rabbit" viewBox="0 0 42 40" shapeRendering="crispEdges">
        <path d="M4 34h33v4H4z" fill="#2d683c" opacity=".6" />
        <path d="M9 23h7V5h5v15h3V2h5v19h5v5h3v7h-6v3H12v-3H6v-7h3z" fill="#fff0d4" stroke="#604b3c" strokeWidth="1" />
        <path d="M18 7h2v13h-2zm8-3h2v15h-2z" fill="#e3a59b" />
        <path d="M11 25h7v7h-7zm8 7h9v3h-9z" fill="#dfd2b7" />
        <rect x="31" y="24" width="2" height="3" fill="#322d2d" />
        <rect x="35" y="28" width="2" height="2" fill="#df958a" />
        <path d="M5 24h5v6H5z" fill="#fff8e6" />
      </svg>
      <svg className="garden-bird" viewBox="0 0 32 26" shapeRendering="crispEdges">
        <path d="M3 19h17v3H3z" fill="#72512f" />
        <path d="M12 18h2v6h-2zm6 0h2v6h-2z" fill="#dfad57" />
        <path d="M8 15V9h5V4h9v3h4v9h-6v4H10L3 13h5z" fill="#4794b5" stroke="#2c5163" strokeWidth="1" />
        <path d="M13 13h9v5h-9z" fill="#fff0cf" />
        <path d="M8 12h8v4h-5z" fill="#306b97" />
        <path d="M26 9h5v3h-5z" fill="#ebb858" />
        <rect x="22" y="8" width="2" height="2" fill="#292d31" />
        <rect x="14" y="5" width="5" height="2" fill="#83bdd2" />
      </svg>
    </div>
  );
}

export function MineEntrance() {
  return (
    <svg className="mine-entrance" viewBox="0 0 136 102" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M6 91V29h8V15h13V7h77v8h16v15h9v61z" fill="#2b252b" stroke="#211c23" strokeWidth="3" />
      <path d="M20 88V30h95v58z" fill="#161b24" />
      <path d="M39 30h8v56h-8zm45 0h7v56h-7z" fill="#35313c" />
      <path d="M28 88V26h9v62zm71 0V26h9v62z" fill="#5f4131" stroke="#261e20" strokeWidth="2" />
      <path d="M26 24h84v12H26z" fill="#915c36" stroke="#2c2020" strokeWidth="2" />
      <path d="M29 26h76v3H29zm1 12h3v44h-3zm72 0h3v44h-3z" fill="#c18a4f" />
      <path d="m35 36 12 12m51-12L86 48" stroke="#6f4b35" strokeWidth="6" />
      <path d="M31 28h3v3h-3zm71 0h3v3h-3zm-72 52h4v3h-4zm71 0h4v3h-4z" fill="#392e29" />
      <path d="m50 87-9 13m42-13 9 13" stroke="#847d70" strokeWidth="3" />
      <path d="M48 88h37v3H48zm-4 7h45v3H44z" fill="#654735" />
      <path d="M111 70h18v22h-18z" fill="#835432" stroke="#312426" strokeWidth="2" />
      <path d="m113 72 13 17m0-17-13 17" stroke="#b78147" strokeWidth="3" />
      <path d="M14 80h13v11H14z" fill="#47444b" />
      <path d="M11 84h8v7h-8zm104 9h12v4h-12z" fill="#697073" />
      <path d="M23 41v8m-6 1h12v23H17z" fill="#d6a044" stroke="#433122" strokeWidth="2" />
      <path d="M20 53h6v16h-6z" fill="#ffdf88" />
      <path d="M23 55h2v11h-2z" fill="#fff2c2" />
    </svg>
  );
}

export function CaveScenery() {
  const grit = Array.from({ length: 65 }, (_, i) => (
    <rect key={i} x={(i * 67) % 192} y={(i * 43 + 17) % 192} width={i % 3 + 2} height={i % 2 + 2} fill={i % 2 ? "#a2744b" : "#241c1e"} opacity=".26" />
  ));
  return (
    <div className="cave-scenery" aria-hidden="true">
      <svg className="cave-texture" width="100%" height="100%" shapeRendering="crispEdges">
        <defs>
          <pattern id="cave-dirt" width="192" height="192" patternUnits="userSpaceOnUse">
            <path d="M0 53h20V42h19V30h23v7h30v8h28v14h24v-8h23v-7h25" fill="none" stroke="#2d2020" strokeWidth="5" opacity=".35" />
            <path d="M0 144h29v10h31v-6h22v-16h29v6h24v-9h34v-9h23" fill="none" stroke="#946440" strokeWidth="3" opacity=".17" />
            <path d="M14 88h15v-6h14v4h6v16H20v-5h-6z" fill="#302629" stroke="#644f40" strokeWidth="2" />
            <path d="M21 86h17v3H21z" fill="#82684e" opacity=".5" />
            <path d="M125 13h13v-6h12v5h9v19h-31v-6h-3z" fill="#5b4635" stroke="#382b25" strokeWidth="2" />
            <path d="M131 12h14v3h-14z" fill="#916e4c" opacity=".5" />
            <path d="M96 175v-9h7v-5h13v6h6v12H96z" fill="#3c3336" stroke="#262024" strokeWidth="2" />
            {grit}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cave-dirt)" />
      </svg>
      <svg className="cave-ceiling" viewBox="0 0 1200 120" preserveAspectRatio="none" shapeRendering="crispEdges">
        <path d="M0 0h1200v19h-51v8h-63v-5h-81v9h-79v-8h-107v5h-77v-8h-101v11h-86v-6h-92v7h-75v-8h-92v7h-109v-9H69v7H0z" fill="#32241e" />
        {Array.from({ length: 13 }, (_, i) => {
          const x = 30 + i * 96;
          const end = 65 + (i * 17) % 40;
          return <g key={i} fill="none" strokeWidth="2">
            <path d={`M${x} 12v26l-9 14v${end - 42}m9-26 13 11v20m-14-25-19 10-5 15m28-4 9 11m-17-3-9 10`} stroke="#281e1b" strokeWidth="5" />
            <path d={`M${x} 12v26l-9 14v${end - 42}m9-26 13 11v20m-14-25-19 10-5 15m28-4 9 11m-17-3-9 10`} stroke="#9b6437" />
          </g>;
        })}
      </svg>
      <div className="cave-wall cave-wall--left" />
      <div className="cave-wall cave-wall--right" />
      <div className="cave-lights">
        {Array.from({ length: 14 }, (_, i) => <i key={i} style={{ "--glow-x": `${i % 2 ? 96 - (i % 4) : 3 + (i % 4)}%`, "--glow-y": `${18 + i * 5.1}%`, "--glow-delay": `${i * -.37}s` }} />)}
      </div>
      <svg className="cave-floor" viewBox="0 0 1200 170" preserveAspectRatio="none" shapeRendering="crispEdges">
        <path d="M0 69h40V55h33v12h27v13h51V56h45v-9h49v18h29v30h56V77h43v24h40v22h80v-14h41v-9h51v17h58V93h36V79h60V67h33V45h43v21h38v11h54V58h49V45h42v-8h44v32h41v-7h48V51h41v20h23v99H0z" fill="#29242c" stroke="#1c1d23" strokeWidth="6" />
        <path d="M0 124h75v-14h43v24h54v-12h51v14h75v18h67v-18h79v18h116v-12h100v-16h95v19h93v-15h85v-15h69v14h60v-9h58v50H0z" fill="#37333a" />
        <path d="M430 122h340v8H430zm36 10h275v7H466zm38 11h210v6H504z" fill="#2b98b5" />
        <path d="M480 129h75v3h-75zm114 7h58v3h-58zm-54 8h90v3h-90z" fill="#8be3e1" />
        <path d="M0 109h53v5H0zm117-10h31v6h-31zm704 8h29v6h-29zm158-22h29v6h-29z" fill="#69636a" />
      </svg>
    </div>
  );
}
