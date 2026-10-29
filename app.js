(() => {
  "use strict";
  const data = window.portfolioData;
  if (!data) return;
  const projects = data.projects;
  const grid = document.querySelector("#project-grid");
  const caseDialog = document.querySelector("#case-dialog");
  const imageDialog = document.querySelector("#image-dialog");
  const resumeDialog = document.querySelector("#resume-dialog");
  const navigation = document.querySelector("#navigation");
  const menu = document.querySelector(".menu-button");
  let caseId = null;
  let returnFocus = null;
  let routeOrigin = null;

  const escape = (value = "") => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const icon = name => `<i data-icon="${name}"></i>`;
  const renderIcons = () => window.portfolioIcons?.render();
  const safeUrl = value => {
    if (!value || !/^(https:\/\/|\.\/assets\/)/.test(value)) return "";
    return escape(value);
  };

  function processVisual(project) {
    if (project.visual === "student") {
      return `<div class="process-visual"><div class="process-top"><span>PROJECT OWNERSHIP</span><span>RESEARCH PROJECT</span></div><h4>多维学生状态评估</h4><div class="student-ownership"><strong>80,000+</strong><span>多源数据 · 清洗与预处理</span></div><div class="student-dimensions"><span>学业发展</span><span>消费行为</span><span>身体健康</span><span>心理健康</span></div><div class="process-bottom"><span>指标体系 → 分维度建模 → 验证</span><span>北京市级立项</span></div></div>`;
    }
    return `<div class="process-visual"><div class="process-top"><span>BUSINESS PROBLEM → DECISION SUPPORT</span><span>2026</span></div><h4>从收入变化，到经营判断。</h4><div class="process-steps"><span>业务问题</span><span class="step-arrow">→</span><span>四项指标</span><span>滚动 / 留出验证</span><span class="step-arrow">→</span><span>分析与汇报</span></div><div class="process-bottom"><span>Metric decomposition · Validation</span><span>Internal Analysis</span></div></div>`;
  }

  function renderCard(project, index) {
    const media = project.image
      ? `<img src="${safeUrl(project.image)}" alt="${escape(project.imageAlt)}" loading="lazy" width="1200" height="800">`
      : processVisual(project);
    return `<article class="work-card" data-project="${escape(project.id)}">
      <a class="work-media work-media--${escape(project.visual)}" href="#case/${escape(project.id)}" aria-label="查看 ${escape(project.title)} 案例">${media}<span class="image-expand">${icon("arrow-up-right")}</span></a>
      <div class="card-heading"><h3><a href="#case/${escape(project.id)}">${escape(project.title)}</a></h3><span class="card-year">0${index + 1} / ${escape(project.year)}</span></div>
      <p class="work-subtitle">${escape(project.subtitle)}</p>
      <dl class="work-facts"><div><dt>ROLE</dt><dd>${escape(project.role)}</dd></div><div><dt>STATUS</dt><dd>${escape(project.status)}</dd></div></dl>
      <div class="tags">${project.tools.slice(0, 4).map(tool => `<span>${escape(tool)}</span>`).join("")}</div>
      <div class="card-links"><a class="text-link" href="#case/${escape(project.id)}">View Case Study ${icon("arrow-up-right")}</a>${project.demo ? `<a class="text-link" href="${safeUrl(project.demo)}" target="_blank" rel="noopener noreferrer">Live Demo ${icon("arrow-up-right")}</a>` : ""}</div>
    </article>`;
  }

  function picture(src, caption, className = "") {
    return `<figure class="${className}"><button class="case-image-button" type="button" data-image="${safeUrl(src)}" data-caption="${escape(caption)}" aria-label="放大：${escape(caption)}" title="放大图片"><img src="${safeUrl(src)}" alt="${escape(caption)}" loading="lazy"><span class="image-expand">${icon("expand")}</span></button><figcaption>${escape(caption)}</figcaption></figure>`;
  }

  function section(title, value, wide = false) {
    const body = Array.isArray(value) ? `<ul>${value.map(item => `<li>${escape(item)}</li>`).join("")}</ul>` : `<p>${escape(value)}</p>`;
    return `<section class="case-section${wide ? " case-section--wide" : ""}"><h3>${title}</h3>${body}</section>`;
  }

  function renderCase(project) {
    const featured = projects.filter(item => item.featured);
    const index = featured.findIndex(item => item.id === project.id);
    const next = featured[(index + 1) % featured.length];
    const modelTable = project.models ? `<section class="case-section case-section--wide"><h3>Methods / 分维度方法与阶段成果</h3><table class="case-models"><thead><tr><th>维度</th><th>方法</th><th>阶段成果</th></tr></thead><tbody>${project.models.map(row => `<tr>${row.map(cell => `<td>${escape(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></section>` : "";
    document.querySelector("#case-content").innerHTML = `<div class="case-inner">
      <header class="case-header"><p class="eyebrow">${escape(project.period)} / ${escape(project.status)}</p><h2 id="case-title" tabindex="-1">${escape(project.fullTitle)}</h2><p class="case-intro">${escape(project.subtitle)}</p><div class="case-meta"><span>${escape(project.role)}</span><span>${escape(project.status)}</span></div>${project.demo ? `<a class="button button-primary" href="${safeUrl(project.demo)}" target="_blank" rel="noopener noreferrer">View Live Demo ${icon("arrow-up-right")}</a>` : ""}</header>
      ${project.image ? picture(project.image, project.imageCaption, "case-hero") : `<div class="case-hero work-media work-media--${escape(project.visual)}">${processVisual(project)}</div>`}
      <div class="case-body">${section("Problem / 为什么做", project.problem)}${section("Context / 项目场景", project.context)}${section("My Role / 我的职责", project.myRole, true)}${section("Process / 如何拆解", project.process, true)}${section("Build / Approach", project.approach)}${section("AI Role / AI 的具体参与", project.aiRole)}${modelTable}${section("Outcome / 产出与边界", project.outcome)}${section("Reflection / 下一步", project.reflection)}</div>
      ${project.gallery.length ? `<div class="case-gallery">${project.gallery.map(item => picture(item.src, item.caption)).join("")}</div>` : ""}
      <p class="case-tools">Tech &amp; Tools · ${project.tools.map(escape).join(" / ")}</p><div class="case-bottom"><button class="text-link" type="button" data-close-case>${icon("arrow-left")} 返回作品集</button><a class="text-link" href="#case/${escape(next.id)}">下一个案例：${escape(next.title)} ${icon("arrow-up-right")}</a></div></div>`;
    renderIcons();
  }

  function syncLock() {
    document.body.classList.toggle("modal-open", [caseDialog, imageDialog, resumeDialog].some(dialog => dialog.open));
  }
  function show(dialog) {
    if (!dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    }
    syncLock();
  }
  function hide(dialog) {
    if (dialog.open) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    }
    syncLock();
  }
  function closeMenu() {
    navigation.classList.remove("is-open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "打开导航");
  }

  function route() {
    const hash = window.location.hash;
    const project = projects.find(item => hash === `#case/${item.id}`);
    hide(imageDialog);
    if (project) {
      hide(resumeDialog);
      if (caseId !== project.id) renderCase(project);
      caseId = project.id;
      show(caseDialog);
      caseDialog.scrollTop = 0;
      document.querySelector("#case-title").focus({ preventScroll: true });
      document.title = `${project.title} | 李小冉`;
    } else {
      hide(caseDialog);
      caseId = null;
      document.title = "李小冉 | AI Product & Agent Application";
      if (hash === "#resume" && !data.site.resume.url) show(resumeDialog);
      else hide(resumeDialog);
    }
  }

  // Hash routes keep case studies shareable on GitHub Pages, without server rewrites.
  function closeRoute() {
    hide(imageDialog);
    hide(caseDialog);
    hide(resumeDialog);
    if (routeOrigin !== null) {
      window.history.back();
      routeOrigin = null;
    } else {
      history.replaceState(null, "", `${location.pathname}${location.search}#projects`);
      route();
    }
    const target = returnFocus;
    requestAnimationFrame(() => { if (target?.isConnected) target.focus({ preventScroll: true }); });
  }

  grid.innerHTML = projects.filter(project => project.featured).map(renderCard).join("");
  if (data.site.resume.url) {
    document.querySelectorAll("[data-resume]").forEach(link => {
      link.href = data.site.resume.url;
      link.download = data.site.resume.filename;
      link.innerHTML = `Download Resume ${icon("download")}`;
    });
  }
  renderIcons();
  route();

  menu.addEventListener("click", () => {
    const open = !navigation.classList.contains("is-open");
    navigation.classList.toggle("is-open", open);
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "关闭导航" : "打开导航");
  });
  document.addEventListener("click", event => {
    const target = event.target.closest("a,button");
    if (!target) { if (!event.target.closest(".site-header")) closeMenu(); return; }
    if (target.matches("[data-close-case],[data-close-resume]")) { closeRoute(); return; }
    if (target.matches("[data-close-image]")) { hide(imageDialog); return; }
    if (target.dataset.image) {
      const image = document.querySelector("#expanded-image");
      image.src = target.dataset.image;
      image.alt = target.dataset.caption || "项目截图";
      document.querySelector("#image-caption").textContent = image.alt;
      show(imageDialog);
      return;
    }
    const href = target.getAttribute("href") || "";
    if (href.startsWith("#case/") || href === "#resume") {
      closeMenu();
      if (!caseDialog.open && !resumeDialog.open) {
        returnFocus = target;
        routeOrigin = location.hash;
      } else {
        event.preventDefault();
        history.replaceState(null, "", href);
        route();
      }
    } else if (href.startsWith("#")) closeMenu();
  });
  window.addEventListener("hashchange", route);
  [caseDialog, resumeDialog].forEach(dialog => {
    dialog.addEventListener("cancel", event => { event.preventDefault(); closeRoute(); });
    dialog.addEventListener("click", event => { if (event.target === dialog && (event.clientX < dialog.getBoundingClientRect().left || event.clientX > dialog.getBoundingClientRect().right || event.clientY < dialog.getBoundingClientRect().top || event.clientY > dialog.getBoundingClientRect().bottom)) closeRoute(); });
  });
  imageDialog.addEventListener("cancel", event => { event.preventDefault(); hide(imageDialog); });
  imageDialog.addEventListener("click", event => { if (event.target === imageDialog) hide(imageDialog); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
  window.matchMedia("(min-width: 761px)").addEventListener("change", closeMenu);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) document.querySelectorAll('.navigation a[href^="#"]').forEach(link => {
          const active = link.hash === `#${entry.target.id}`;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-15% 0px -65% 0px" });
    ["projects", "experience", "about"].forEach(id => navObserver.observe(document.getElementById(id)));
    if (!reducedMotion.matches) {
      const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); revealObserver.unobserve(entry.target); }
      }), { threshold: 0.04 });
      document.querySelectorAll(".experience-item,.capability,.education-summary,.research-feature").forEach(item => { item.classList.add("reveal"); revealObserver.observe(item); });
      document.documentElement.classList.add("motion-ready");
    }
  }
})();
