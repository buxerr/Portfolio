export const PROJECTS = [
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

export const SKILLS = [
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

export const HERO_SKILLS = [
  "C++",
  "Java",
  "JavaScript",
  "Python",
  "SQL",
  "Android",
  "Firebase",
  "Git",
];

export const STATUS_COLORS = {
  completed: "bg-emerald-500/90 text-emerald-50 border-emerald-700",
  ongoing: "bg-amber-400/90 text-amber-950 border-amber-700",
  abandoned: "bg-rose-500/90 text-rose-50 border-rose-700",
};
