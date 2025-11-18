document.addEventListener("DOMContentLoaded", async () => {
  async function fetchData() {
    const res = await fetch("/posts/index.json");
    if (!res.ok) {
      console.error("Failed to fetch posts/index.json:", res.status);
      return [];
    }
    return await res.json();
  }

  function search(data, term) {
    const fuse = new Fuse(data, {
      keys: ["title", "content"],
      threshold: 0.3,
      ignoreLocation: true,
      includeScore: true,
    });
    return fuse.search(term);
  }

  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");
  const data = await fetchData();

  if (!data.length) {
    results.innerHTML = "<p>No data found to search.</p>";
    return;
  }

  input.addEventListener("input", () => {
    const value = input.value.trim();
    results.innerHTML = "";

    if (!value) return;

    const matches = search(data, value);

    if (!matches.length) {
      results.innerHTML = '<p id="no-result">No results found.</p>';
      return;
    }

    matches.forEach(({ item }) => {
      const card = document.createElement("div");
      card.className = "card";
      card.onclick = () => { window.location.href = item.permalink; };

      const title = document.createElement("a");
      title.className = "card-title";
      title.href = item.permalink;
      title.textContent = item.title;

      const date = document.createElement("div");
      date.className = "card-date";
      const d = new Date(item.date);
      date.textContent = d.toLocaleDateString(undefined, {
        day: "numeric", month: "long", year: "numeric"
      });

      card.appendChild(title);
      card.appendChild(date);
      results.appendChild(card);
    });
  });
});
