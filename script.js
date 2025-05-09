document.addEventListener("DOMContentLoaded", function () {
  const brandButtons = document.querySelectorAll(".brand-btn");
  const mobiles = document.querySelectorAll(".mobile-card");
  const searchInput = document.getElementById("searchInput");

  brandButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      brandButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const brand = this.getAttribute("data-brand");

      mobiles.forEach((card) => {
        const matchesBrand = brand === "All" || card.dataset.brand === brand;
        card.style.display = matchesBrand ? "block" : "none";
      });
    });
  });

  window.handleSearch = function () {
    const input = searchInput.value.trim().toLowerCase();
    mobiles.forEach((card) => {
      const model = card.querySelector("h3").textContent.toLowerCase().replace(/\s+/g, '');
      const inputNormalized = input.replace(/\s+/g, '');

      if (inputNormalized === "") {
        card.style.display = "block"; // show all when empty
      } else {
        card.style.display = model.includes(inputNormalized) ? "block" : "none";
      }
    });

    // Deselect brand buttons if search is being used
    brandButtons.forEach((b) => b.classList.remove("active"));
  };

  // Optional: Live update when input cleared
  searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() === "") {
      mobiles.forEach((card) => (card.style.display = "block"));
    }
  });
});