// Inventory page functionality
let currentView = 'grid';
let filteredCars = [...cars];

// Function to create car card for grid view
function createGridCard(car) {
    return `
        <div class="col-md-4">
            <div class="card car-card h-100">
                <img src="${car.images[0]}" class="card-img-top" alt="${car.brand} ${car.model}">
                <div class="card-body">
                    <h5 class="card-title">${car.brand} ${car.model}</h5>
                    <p class="card-text">
                        <strong>Year:</strong> ${car.year}<br>
                        <strong>Price:</strong> ${formatPrice(car.price)}<br>
                        <strong>Fuel Type:</strong> ${car.fuelType}
                    </p>
                    <div class="d-flex justify-content-between align-items-center">
                        <a href="car-details.html?id=${car.id}" class="btn btn-primary">View Details</a>
                        <button onclick="toggleWishlist(${car.id})" class="btn btn-outline-danger">
                            <i class="bi bi-heart${isInWishlist(car.id) ? '-fill' : ''}"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to create car card for list view
function createListCard(car) {
    return `
        <div class="col-12">
            <div class="card car-card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${car.images[0]}" class="img-fluid rounded-start h-100 object-fit-cover" alt="${car.brand} ${car.model}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <h5 class="card-title">${car.brand} ${car.model}</h5>
                                <h5 class="text-primary">${formatPrice(car.price)}</h5>
                            </div>
                            <p class="card-text">
                                <strong>Year:</strong> ${car.year}<br>
                                <strong>Fuel Type:</strong> ${car.fuelType}<br>
                                <strong>Engine:</strong> ${car.specifications.engine}<br>
                                <strong>Transmission:</strong> ${car.specifications.transmission}
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                                <a href="car-details.html?id=${car.id}" class="btn btn-primary">View Details</a>
                                <button onclick="toggleWishlist(${car.id})" class="btn btn-outline-danger">
                                    <i class="bi bi-heart${isInWishlist(car.id) ? '-fill' : ''}"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to display cars based on current view and filters
function displayCars() {
    const inventoryGrid = document.getElementById('inventoryGrid');
    const createCard = currentView === 'grid' ? createGridCard : createListCard;
    inventoryGrid.innerHTML = filteredCars.map(car => createCard(car)).join('');
}

// Function to apply filters
function applyFilters() {
    const priceRange = document.getElementById('priceRange').value;
    const brand = document.getElementById('brand').value;
    const year = document.getElementById('year').value;
    const fuelType = document.getElementById('fuelType').value;

    filteredCars = cars.filter(car => {
        let matches = true;

        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            if (max) {
                matches = matches && car.price >= min && car.price <= max;
            } else {
                matches = matches && car.price >= min;
            }
        }

        if (brand) matches = matches && car.brand === brand;
        if (year) matches = matches && car.year === parseInt(year);
        if (fuelType) matches = matches && car.fuelType === fuelType;

        return matches;
    });

    displayCars();
}

// Function to sort cars
function sortCars(sortBy) {
    switch (sortBy) {
        case 'price-asc':
            filteredCars.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredCars.sort((a, b) => b.price - a.price);
            break;
        case 'year-desc':
            filteredCars.sort((a, b) => b.year - a.year);
            break;
        case 'year-asc':
            filteredCars.sort((a, b) => a.year - b.year);
            break;
    }
    displayCars();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // View toggle buttons
    const viewButtons = document.querySelectorAll('[data-view]');
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentView = button.dataset.view;
            displayCars();
        });
    });

    // Filter form
    const filterForm = document.getElementById('filterForm');
    filterForm.addEventListener('change', applyFilters);
    filterForm.addEventListener('reset', () => {
        setTimeout(() => {
            filteredCars = [...cars];
            displayCars();
        }, 0);
    });

    // Sort dropdown
    document.getElementById('sortBy').addEventListener('change', (e) => {
        sortCars(e.target.value);
    });

    // Initial display
    displayCars();
});