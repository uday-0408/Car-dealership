// Wishlist page functionality
document.addEventListener("DOMContentLoaded", () => {
  const wishlistContent = document.getElementById("wishlistContent");
  const emptyWishlist = document.getElementById("emptyWishlist");

  function loadWishlist() {
    const wishlist = getWishlist();
    const wishlistCars = cars.filter((car) => wishlist.includes(car.id));

    if (wishlistCars.length === 0) {
      wishlistContent.style.display = "none";
      emptyWishlist.style.display = "block";
      return;
    }

    wishlistContent.style.display = "flex";
    emptyWishlist.style.display = "none";

    wishlistContent.innerHTML = wishlistCars
      .map(
        (car) => `
            <div class="col-md-4">
                <div class="card car-card h-100">
                    <img src="${car.images[0]}" class="card-img-top" alt="${
          car.brand
        } ${car.model}">
                    <div class="card-body">
                        <h5 class="card-title">${car.brand} ${car.model}</h5>
                        <p class="card-text">
                            <strong>Year:</strong> ${car.year}<br>
                            <strong>Price:</strong> ${formatPrice(
                              car.price
                            )}<br>
                            <strong>Fuel Type:</strong> ${car.fuelType}
                        </p>
                        <div class="d-flex justify-content-between align-items-center">
                            <a href="car-details.html?id=${
                              car.id
                            }" class="btn btn-primary">View Details</a>
                            <button onclick="toggleWishlist(${
                              car.id
                            })" class="btn btn-danger">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  }

  // Override toggleWishlist to reload the page content
  const originalToggleWishlist = window.toggleWishlist;
  window.toggleWishlist = function (carId) {
    originalToggleWishlist(carId);
    loadWishlist();
  };

  // Initial load
  loadWishlist();
});
