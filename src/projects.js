import { useEffect, useState } from "react";

const STATUSES = new Set(["completed", "ongoing", "abandoned"]);

export function validateProjects(data) {
  if (!Array.isArray(data)) throw new Error("Project data must be an array.");
  const slugs = new Set();
  return data.map((project) => {
    if (!project || typeof project !== "object") throw new Error("Each project must be an object.");
    const { slug, title, summary, body, year, status, tags, highlighted, img = "", imageFit = "cover", url = "", linkLabel = "Visit project" } = project;
    if (typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slugs.has(slug)) {
      throw new Error("Projects need unique, lowercase slugs.");
    }
    slugs.add(slug);
    if (![title, summary, body, linkLabel].every((value) => typeof value === "string" && value.trim())) {
      throw new Error(`Missing text for ${slug}.`);
    }
    if (!Number.isInteger(year) || !STATUSES.has(status) || typeof highlighted !== "boolean") {
      throw new Error(`Invalid year, status, or highlighted flag for ${slug}.`);
    }
    if (!Array.isArray(tags) || !tags.every((tag) => typeof tag === "string" && tag.trim())) {
      throw new Error(`Invalid tags for ${slug}.`);
    }
    if (typeof img !== "string" || (img && (!/^\/assets\/[a-zA-Z0-9_./ -]+$/.test(img) || img.includes("..")))) {
      throw new Error(`Use a local /assets/ image for ${slug}.`);
    }
    if (!["cover", "contain"].includes(imageFit)) throw new Error(`Invalid imageFit for ${slug}.`);
    if (typeof url !== "string" || (url && !/^https:\/\/[^\s]+$/.test(url))) {
      throw new Error(`Use an HTTPS project link for ${slug}.`);
    }
    return { slug, title, summary, body, year, status, tags, highlighted, img, imageFit, url, linkLabel };
  });
}

export function useProjects() {
  const [catalog, setCatalog] = useState({ projects: [], loaded: false, error: null });
  useEffect(() => {
    let disposed = false;
    let busy = false;
    let controller;
    let fingerprint = null;
    const refresh = async () => {
      if (busy || disposed || document.hidden) return;
      busy = true;
      controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 10000);
      try {
        const response = await fetch("/projects.json", { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error(`Project request failed (${response.status}).`);
        const projects = validateProjects(await response.json());
        const nextFingerprint = JSON.stringify(projects);
        if (!disposed) {
          if (nextFingerprint !== fingerprint) {
            fingerprint = nextFingerprint;
            setCatalog({ projects, loaded: true, error: null });
          } else {
            setCatalog((previous) => previous.error ? { ...previous, error: null } : previous);
          }
        }
      } catch (error) {
        // A partial file save must not erase a catalog that has already loaded.
        if (!disposed) setCatalog((previous) => ({ ...previous, loaded: true, error: error.message }));
      } finally {
        window.clearTimeout(timeout);
        busy = false;
      }
    };
    refresh();
    const interval = window.setInterval(refresh, 30000);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      disposed = true;
      controller?.abort();
      window.clearInterval(interval);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);
  return catalog;
}
