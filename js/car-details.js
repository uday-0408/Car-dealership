// Get car ID from URL
const urlParams = new URLSearchParams(window.location.search);
const carId = parseInt(urlParams.get("id"));

// Function to load car details
function loadCarDetails() {
  const car = cars.find((c) => c.id === carId);
  if (!car) {
    window.location.href = "inventory.html";
    return;
  }

  // Update page title
  document.title = `${car.brand} ${car.model} - LuxuryCars`;

  // Load car images into carousel
  const carouselInner = document.querySelector(".carousel-inner");
  carouselInner.innerHTML = car.images
    .map(
      (image, index) => `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
            <img src="${image}" class="d-block w-100" alt="${car.brand} ${
        car.model
      }">
        </div>
    `
    )
    .join("");

  // Update car details
  document.getElementById(
    "carTitle"
  ).textContent = `${car.brand} ${car.model} ${car.year}`;
  document.getElementById("carPrice").textContent = formatPrice(car.price);

  // Update specifications table
  const specificationsTable = document.getElementById("specificationsTable");
  specificationsTable.innerHTML = `
        <tr>
            <th>Brand</th>
            <td>${car.brand}</td>
        </tr>
        <tr>
            <th>Model</th>
            <td>${car.model}</td>
        </tr>
        <tr>
            <th>Year</th>
            <td>${car.year}</td>
        </tr>
        <tr>
            <th>Fuel Type</th>
            <td>${car.fuelType}</td>
        </tr>
        <tr>
            <th>Engine</th>
            <td>${car.specifications.engine}</td>
        </tr>
        <tr>
            <th>Transmission</th>
            <td>${car.specifications.transmission}</td>
        </tr>
        <tr>
            <th>Mileage</th>
            <td>${car.specifications.mileage}</td>
        </tr>
        <tr>
            <th>Color</th>
            <td>${car.specifications.color}</td>
        </tr>
        <tr>
            <th>Condition</th>
            <td>${car.condition}</td>
        </tr>
    `;

  // Update wishlist button
  const wishlistButton = document.getElementById("addToWishlist");
  updateWishlistButton();

  wishlistButton.addEventListener("click", () => {
    toggleWishlist(car.id);
    updateWishlistButton();
  });
}

// Function to update wishlist button state
function updateWishlistButton() {
  const wishlistButton = document.getElementById("addToWishlist");
  const isInWishlistAlready = isInWishlist(carId);

  wishlistButton.innerHTML = `
        <i class="bi bi-heart${isInWishlistAlready ? "-fill" : ""} me-2"></i>
        ${isInWishlistAlready ? "Remove from Wishlist" : "Add to Wishlist"}
    `;
}

// Financing calculator
function calculateMonthlyPayment() {
  const car = cars.find((c) => c.id === carId);
  if (!car) return;

  const price = car.price;
  const downPayment =
    parseFloat(document.getElementById("downPayment").value) || 0;
  const loanTerm = parseInt(document.getElementById("loanTerm").value);
  const interestRate =
    parseFloat(document.getElementById("interestRate").value) / 100 / 12;

  const loanAmount = price - downPayment;
  const monthlyPayment =
    (loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm)) /
    (Math.pow(1 + interestRate, loanTerm) - 1);

  document.getElementById("monthlyPayment").textContent =
    formatPrice(monthlyPayment);
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadCarDetails();

  // Set up financing calculator
  const financingForm = document.getElementById("financingForm");
  const financingInputs = financingForm.querySelectorAll("input, select");
  financingInputs.forEach((input) => {
    input.addEventListener("change", calculateMonthlyPayment);
    input.addEventListener("input", calculateMonthlyPayment);
  });

  calculateMonthlyPayment();
});
