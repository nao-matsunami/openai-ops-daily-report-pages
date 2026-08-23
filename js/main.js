const buttons = document.querySelectorAll(".tag-filter");
const cards = document.querySelectorAll(".report-card");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    buttons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    cards.forEach((card) => {
      const tags = card.dataset.tags || "";
      card.hidden = filter !== "all" && !tags.includes(filter);
    });
  });
});
