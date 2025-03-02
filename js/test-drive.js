// Test Drive form handling
document.addEventListener("DOMContentLoaded", () => {
  const testDriveForm = document.getElementById("testDriveForm");
  const successMessage = document.getElementById("successMessage");
  const carModelSelect = document.getElementById("carModel");
  const preferredDateInput = document.getElementById("preferredDate");

  // Load car options
  if (carModelSelect) {
    carModelSelect.innerHTML = `
            <option value="">Choose a car</option>
            ${cars
              .map(
                (car) => `
                <option value="${car.id}">${car.year} ${car.brand} ${car.model}</option>
            `
              )
              .join("")}
        `;
  }

  // Set minimum date to tomorrow
  if (preferredDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    preferredDateInput.min = tomorrow.toISOString().split("T")[0];
  }

  if (testDriveForm) {
    testDriveForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!validateForm(testDriveForm)) {
        return;
      }

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        carId: document.getElementById("carModel").value,
        preferredDate: document.getElementById("preferredDate").value,
        preferredTime: document.getElementById("preferredTime").value,
        notes: document.getElementById("notes").value,
      };

      // Store in localStorage
      const testDrives = JSON.parse(localStorage.getItem("testDrives") || "[]");
      testDrives.push({
        ...formData,
        timestamp: new Date().toISOString(),
        status: "pending",
      });
      localStorage.setItem("testDrives", JSON.stringify(testDrives));

      // Show success message
      successMessage.style.display = "block";
      testDriveForm.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 5000);
    });
  }
});
