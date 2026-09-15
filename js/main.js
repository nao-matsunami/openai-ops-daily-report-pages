const buttons = document.querySelectorAll(".tag-filter");
const cards = document.querySelectorAll(".report-card");
const list = document.querySelector(".report-list");
const empty = document.createElement("p");

empty.className = "empty-state";
empty.hidden = true;
empty.textContent = "該当するレポートはありません。";
if (list) {
  list.after(empty);
}

const matches = (card, filter) => {
  if (filter === "all") return true;
  const tags = (card.dataset.tags || "").split(/\s+/).filter(Boolean);
  return tags.includes(filter);
};

const updateCounts = (activeFilter = "all") => {
  buttons.forEach((button) => {
    if (!button.dataset.label) {
      button.dataset.label = button.textContent.trim();
    }
    const filter = button.dataset.filter;
    const count = Array.from(cards).filter((card) => matches(card, filter)).length;
    button.textContent = `${button.dataset.label} ${count}件`;
  });

  let visible = 0;
  cards.forEach((card) => {
    const show = matches(card, activeFilter);
    card.hidden = !show;
    if (show) visible += 1;
  });
  if (empty) {
    empty.hidden = visible !== 0;
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    buttons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    updateCounts(filter);
  });
});

updateCounts();
