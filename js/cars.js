// Car data
const cars = [
  {
    id: 1,
    brand: "Tesla",
    model: "Model S",
    year: 2024,
    price: 89990,
    fuelType: "Electric",
    images: ["../asset/tesla-s-1.png", "../asset/tesla-s-2.webp"],
    specifications: {
      engine: "Dual Motor",
      transmission: "Automatic",
      mileage: "396 miles range",
      color: "Pearl White",
    },
    condition: "New",
  },
  {
    id: 2,
    brand: "BMW",
    model: "M4",
    year: 2024,
    price: 74900,
    fuelType: "Petrol",
    images: ["../asset/m4-1.png", "../asset/m4-2.jpeg"],
    specifications: {
      engine: "3.0L Twin-Turbo",
      transmission: "8-speed Auto",
      mileage: "22 mpg",
      color: "Alpine White",
    },
    condition: "New",
  },
  {
    id: 3,
    brand: "Mercedes",
    model: "C-Class",
    year: 2023,
    price: 55900,
    fuelType: "Petrol",
    images: ["../asset/c-class-1.png", "../asset/c-class-2.avif"],
    specifications: {
      engine: "2.0L Turbo",
      transmission: "9-speed Automatic",
      mileage: "25 mpg",
      color: "Obsidian Black",
    },
    condition: "New",
  },
  {
    id: 4,
    brand: "Audi",
    model: "RS5",
    year: 2024,
    price: 79900,
    fuelType: "Petrol",
    images: ["../asset/rs-1.avif", "../asset/rs-2.png"],
    specifications: {
      engine: "2.9L Twin-Turbo V6",
      transmission: "8-speed Automatic",
      mileage: "21 mpg",
      color: "Nardo Gray",
    },
    condition: "New",
  },
  {
    id: 5,
    brand: "Ford",
    model: "Mustang GT",
    year: 2023,
    price: 56995,
    fuelType: "Petrol",
    images: ["../asset/gt-1.webp", "../asset/gt-2.webp"],
    specifications: {
      engine: "5.0L V8",
      transmission: "6-speed Manual",
      mileage: "15 mpg",
      color: "Race Red",
    },
    condition: "New",
  },
  {
    id: 6,
    brand: "Porsche",
    model: "911 Carrera",
    year: 2024,
    price: 106100,
    fuelType: "Petrol",
    images: ["../asset/porsche-1.png", "../asset/porsche-2.webp"],
    specifications: {
      engine: "3.0L Twin-Turbo Flat-6",
      transmission: "8-speed PDK",
      mileage: "20 mpg",
      color: "Carrara White Metallic",
    },
    condition: "New",
  },
  {
    id: 7,
    brand: "Jeep",
    model: "Wrangler",
    year: 2023,
    price: 35000,
    fuelType: "Petrol",
    images: ["../asset/jeep-wrangler-1.png", "../asset/jeep-wrangler-2.png"],
    specifications: {
      engine: "3.6L V6",
      transmission: "6-speed Manual",
      mileage: "17 mpg",
      color: "Bright White",
    },
    condition: "New",
  },
  {
    id: 8,
    brand: "Toyota",
    model: "Camry Hybrid",
    year: 2022,
    price: 25000,
    fuelType: "Hybrid",
    images: ["../asset/toyota-camry-1.png", "../asset/toyota-camry-2.png"],
    specifications: {
      engine: "2.5L 4-Cylinder Hybrid",
      transmission: "CVT",
      mileage: "52 mpg",
      color: "Silver",
    },
    condition: "New",
  },
  {
    id: 9,
    brand: "Chevrolet",
    model: "Silverado",
    year: 2023,
    price: 45000,
    fuelType: "Diesel",
    images: [
      "../asset/chevrolet-silverado-1.png",
      "../asset/chevrolet-silverado-2.webp",
    ],
    specifications: {
      engine: "5.3L V8",
      transmission: "10-speed Automatic",
      mileage: "18 mpg",
      color: "Black",
    },
    condition: "New",
  },
  {
    id: 10,
    brand: "BMW",
    model: "X5 Hybrid",
    year: 2024,
    price: 60000,
    fuelType: "Hybrid",
    images: ["../asset/bmw-x5-1.png", "../asset/bmw-x5-2.webp"],
    specifications: {
      engine: "3.0L Turbo Hybrid",
      transmission: "8-speed Automatic",
      mileage: "25 mpg",
      color: "Glacier Silver",
    },
    condition: "New",
  },
  {
    id: 11,
    brand: "Mazda",
    model: "MX-5 Miata",
    year: 2023,
    price: 32000,
    fuelType: "Petrol",
    images: ["../asset/mazda-mx5-1.png", "../asset/mazda-mx5-2.jpg"],
    specifications: {
      engine: "2.0L 4-Cylinder",
      transmission: "6-speed Manual",
      mileage: "26 mpg",
      color: "Soul Red Crystal",
    },
    condition: "New",
  },
];

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function createCarCard(car) {
  return `
        <div class="col-md-4 mb-4">
            <div class="card car-card h-100">
                <img src="${car.images[0]}" class="card-img-top" alt="${
    car.brand
  } ${car.model}">
                <div class="card-body">
                    <h5 class="card-title">${car.brand} ${car.model}</h5>
                    <p class="card-text">
                        <strong>Year:</strong> ${car.year}<br>
                        <strong>Price:</strong> ${formatPrice(car.price)}<br>
                        <strong>Fuel Type:</strong> ${car.fuelType}
                    </p>
                    <div class="d-flex justify-content-between align-items-center">
                        <a href="car-details.html?id=${
                          car.id
                        }" class="btn btn-primary">View Details</a>
                        <button onclick="toggleWishlist(${
                          car.id
                        })" class="btn btn-outline-danger">
                            <i class="bi bi-heart${
                              isInWishlist(car.id) ? "-fill" : ""
                            }"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadFeaturedCars() {
  const featuredCarsElement = document.getElementById("featuredCars");
  if (featuredCarsElement) {
    const featuredCars = cars.slice(0, 3);
    featuredCarsElement.innerHTML = featuredCars
      .map((car) => createCarCard(car))
      .join("");
  }
}

function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist") || "[]");
}

function isInWishlist(carId) {
  return getWishlist().includes(carId);
}

function toggleWishlist(carId) {
  const wishlist = getWishlist();
  const index = wishlist.indexOf(carId);

  if (index === -1) {
    wishlist.push(carId);
  } else {
    wishlist.splice(index, 1);
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateWishlistCount();
  loadFeaturedCars(); // Reload cards to update heart icons
}

function updateWishlistCount() {
  const wishlistCount = document.getElementById("wishlist-count");
  if (wishlistCount) {
    wishlistCount.textContent = getWishlist().length;
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadFeaturedCars();
  updateWishlistCount();
});
