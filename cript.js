document.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('date').min = today;
  document.getElementById('office-date').min = today;

  const serviceButtons = document.querySelectorAll('.service-btn');
  const bookingForm = document.getElementById('booking-form');
  const selectedServiceText = document.getElementById('selected-service');
  const confirmation = document.getElementById('confirmation');
  const officeForm = document.getElementById('office-booking-form');
  const officeConfirmation = document.getElementById('office-confirmation');

  let selectedService = null;

  // Click a service to select it
  serviceButtons.forEach(button => {
    button.addEventListener('click', () => {
      selectedService = button.dataset.service;
      selectedServiceText.textContent = `Service: ${selectedService}`;
      confirmation.textContent = ''; // clear old messages
    });
  });

  // Validate email format
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Main booking form submit
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const country = document.getElementById('country').value.trim();
    const date = document.getElementById('date').value;

    if (!selectedService) {
      confirmation.style.color = 'red';
      confirmation.textContent = 'Please select a service first.';
      return;
    }
    if (!name || !email || !phone || !country || !date) {
      confirmation.style.color = 'red';
      confirmation.textContent = 'Please fill out all required fields.';
      return;
    }
    if (!isValidEmail(email)) {
      confirmation.style.color = 'red';
      confirmation.textContent = 'Please enter a valid email address.';
      return;
    }

    // Show thank you message under form
    confirmation.style.color = 'green';
    confirmation.innerHTML = `✅ Thank you <strong>${name}</strong>! 
      Your booking for <strong>${selectedService}</strong> on <strong>${date}</strong> has been received. 
      We’ll contact you soon.`;

    // Optional: log booking data
    console.log({
      service: selectedService, name, email, phone, country, date
    });

    bookingForm.reset();
    selectedServiceText.textContent = 'Service: None Selected';
    selectedService = null;
  });

  // Office booking form submit
  officeForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('office-fullname').value.trim();
    const email = document.getElementById('office-email').value.trim();
    const phone = document.getElementById('office-phone').value.trim();
    const date = document.getElementById('office-date').value;
    const hours = document.getElementById('office-hours').value;

    if (!name || !email || !phone || !date || !hours) {
      officeConfirmation.style.color = 'red';
      officeConfirmation.textContent = 'Please fill out all required fields.';
      return;
    }
    if (!isValidEmail(email)) {
      officeConfirmation.style.color = 'red';
      officeConfirmation.textContent = 'Please enter a valid email address.';
      return;
    }

    officeConfirmation.style.color = 'green';
    officeConfirmation.innerHTML = `🏢 Thank you <strong>${name}</strong>! 
      Your office visit on <strong>${date}</strong> for <strong>${hours} hour(s)</strong> has been confirmed.`;

    officeForm.reset();
  });
});
