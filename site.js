(() => {
  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const pages = {
    "index.html": "首页",
    "news.html": "新闻",
    "members.html": "成员",
    "project.html": "项目",
    "publications.html": "论著",
    "award.html": "奖励"
  };
  const current = pages[page] ? page : "index.html";
  const title = pages[current];
  document.body.classList.add(`page-${current.replace(".html", "")}`);

  const outerTable = document.querySelector('body > div[align="center"] > table');
  if (outerTable?.tBodies[0]) {
    const rows = [...outerTable.tBodies[0].rows];
    rows[0]?.classList.add("legacy-site-header");
    rows[1]?.classList.add("site-main-row");
    rows.at(-1)?.classList.add("legacy-site-footer");
    const content = rows[1]?.querySelector('td[colspan="3"]');
    content?.classList.add("legacy-content");
    content?.querySelector("#table1")?.classList.add("content-table");
  }

  const nav = Object.entries(pages).map(([href, label]) => {
    const active = href === current ? ' aria-current="page"' : "";
    return `<a href="./${href}"${active}>${label}</a>`;
  }).join("");

  document.body.insertAdjacentHTML("afterbegin", `
    <a class="skip-link" href="#main-content">跳至主要内容</a>
    <header class="site-header">
      <div class="site-header__inner">
        <a class="brand" href="./index.html" aria-label="时空数据智能实验室首页">
          <img src="./img/stdi_logo2.png" alt="" width="48" height="48">
          <span><span class="brand__name">时空数据智能实验室</span><span class="brand__en">Spatio-Temporal Data Intelligence</span></span>
        </a>
        <nav class="site-nav" id="site-nav" aria-label="主导航">${nav}</nav>
      </div>
    </header>
    <section class="page-banner" aria-labelledby="page-title">
      <h1 id="page-title">${title}</h1>
    </section>`);

  const main = document.querySelector('body > div[align="center"]');
  if (main) {
    main.id = "main-content";
    main.setAttribute("role", "main");
  }

})();
