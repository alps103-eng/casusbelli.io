document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  if (!input) return;

  const norm = (s) =>
    (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const searchableLinks = Array.from(document.querySelectorAll("a.searchable"));
  const yearBlocks = Array.from(document.querySelectorAll(".archive-year"));

  function linkMatches(link, queryTokens) {
    const hay = norm((link.getAttribute("data-search") || "") + " " + link.textContent);
    return queryTokens.every(t => hay.includes(t));
  }

  function run() {
    const q = norm(input.value);
    const tokens = q ? q.split(" ") : [];

    // 1) Filter regular article previews (index page)
    const previews = document.querySelectorAll(".article-preview");
    previews.forEach(p => {
      if (!tokens.length) { p.style.display = ""; return; }
      const hay = norm(p.innerText);
      p.style.display = tokens.every(t => hay.includes(t)) ? "" : "none";
    });

    // 2) Filter archive page by year-block
    if (yearBlocks.length) {
      yearBlocks.forEach(block => {
        const links = Array.from(block.querySelectorAll("a.searchable"));

        if (!tokens.length) {
          block.style.display = "";
          links.forEach(a => (a.parentElement.style.display = ""));
          return;
        }

        let anyInBlock = false;

        links.forEach(a => {
          const ok = linkMatches(a, tokens);
          a.parentElement.style.display = ok ? "" : "none";
          if (ok) anyInBlock = true;
        });

        block.style.display = anyInBlock ? "" : "none";
      });
    }
  }

  input.addEventListener("input", run);
  run();
});
