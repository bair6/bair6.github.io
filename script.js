"use strict";
(() => {
  const profile = window.PROFILE || {};
  const $ = id => document.getElementById(id);
  const set = (id, value) => { if (typeof value === "string" && value.trim()) $(id).textContent = value; };
  set("name", profile.name); set("footer-name", profile.siteName); set("intro", profile.intro);
  set("headline", profile.headline); set("bio", profile.bio);
  if (profile.siteName) { document.title = profile.siteName; document.querySelector(".wordmark>span:last-child").textContent = profile.siteName; }
  if (profile.bio) document.querySelector('meta[name="description"]').content = profile.bio;
  $("year").textContent = new Date().getFullYear();
  (Array.isArray(profile.tags) ? profile.tags : []).forEach(tag => { const el = document.createElement("span"); el.textContent = tag; $("tags").append(el); });
  const validGithub = typeof profile.github === "string" && /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(profile.github);
  if (validGithub) {
    ["github-link", "contact-github"].forEach(id => { $(id).href = `https://github.com/${encodeURIComponent(profile.github)}`; $(id).hidden = false; });
    $("contact-empty").hidden = true;
  }
  if (typeof profile.email === "string" && /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(profile.email)) {
    $("email-link").href = `mailto:${profile.email}`; $("email-link").hidden = false; $("contact-empty").hidden = true;
  }
  try { const saved = localStorage.getItem("homepage-theme"); if (["light", "dark"].includes(saved)) document.documentElement.dataset.theme = saved; } catch {}
  const theme = $("theme");
  const dark = () => document.documentElement.dataset.theme ? document.documentElement.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const updateThemeLabel = () => theme.setAttribute("aria-label", dark() ? "切换浅色模式" : "切换深色模式");
  updateThemeLabel();
  theme.addEventListener("click", () => { const next = dark() ? "light" : "dark"; document.documentElement.dataset.theme = next; try { localStorage.setItem("homepage-theme", next); } catch {} updateThemeLabel(); });
  function safeUrl(value) { try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) ? url.href : null; } catch { return null; } }
  function renderProjects(projects) {
    const fragment = document.createDocumentFragment();
    projects.forEach((project, i) => {
      const url = safeUrl(project.url); if (!url) return;
      const link = document.createElement("a"); link.className = "project"; link.href = url; link.target = "_blank"; link.rel = "noopener noreferrer";
      const number = document.createElement("span"); number.className = "project-index"; number.textContent = String(i + 1).padStart(2, "0");
      const body = document.createElement("div"); const title = document.createElement("h3"); title.textContent = project.title || "未命名项目";
      const description = document.createElement("p"); description.textContent = project.description || "在 GitHub 查看项目详情。"; body.append(title, description);
      const meta = document.createElement("div"); meta.className = "project-meta";
      (Array.isArray(project.tags) ? project.tags : []).forEach(tag => { const el = document.createElement("span"); el.textContent = tag; meta.append(el); }); body.append(meta);
      const arrow = document.createElement("span"); arrow.className = "project-arrow"; arrow.textContent = "↗"; arrow.setAttribute("aria-hidden", "true");
      link.append(number, body, arrow); fragment.append(link);
    });
    if (fragment.childElementCount) { $("project-list").replaceChildren(fragment); $("projects-description").textContent = "从想法到实现，每一个作品都是一次探索。"; }
  }
  if (Array.isArray(profile.projects) && profile.projects.length) renderProjects(profile.projects);
  else if (validGithub) {
    $("projects-description").textContent = "正在读取 GitHub 公开项目……";
    fetch(`https://api.github.com/users/${encodeURIComponent(profile.github)}/repos?sort=updated&per_page=30`, { signal: AbortSignal.timeout(10000) })
      .then(response => { if (!response.ok) throw new Error("GitHub API unavailable"); return response.json(); })
      .then(repos => {
        const projects = repos.filter(repo => !repo.fork && !repo.archived && repo.name.toLowerCase() !== `${profile.github}.github.io`.toLowerCase()).slice(0, 6);
        if (!projects.length) { $("projects-description").textContent = "新的作品正在酝酿，欢迎稍后再来。"; return; }
        renderProjects(projects.map(repo => ({ title: repo.name, description: repo.description, url: repo.html_url, tags: [repo.language, repo.stargazers_count ? `★ ${repo.stargazers_count}` : null].filter(Boolean) })));
      })
      .catch(() => { $("projects-description").textContent = "暂时无法读取项目，可以通过上方链接访问我的 GitHub。"; });
  }
})();
