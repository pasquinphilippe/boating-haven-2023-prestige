document.addEventListener('DOMContentLoaded', function () {

function updateCountdown() {
    const now = new Date();
    const estOffset = now.getTimezoneOffset() === 300 ? -4 : -5;
    const targetHour = 16; // 4 PM EST
  
    let currentTimeEST = new Date(now.getTime() + estOffset * 3600 * 1000);
    let countdownDate = new Date(
      currentTimeEST.getFullYear(),
      currentTimeEST.getMonth(),
      currentTimeEST.getDate(),
      targetHour,
      0,
      0
    );
  
    if (currentTimeEST.getHours() >= targetHour) {
      countdownDate.setDate(countdownDate.getDate() + 1); // Set countdown for the next day
    }
  
    let diff = countdownDate - now;
    if (diff < 0) {
      diff += 24 * 60 * 60 * 1000; // Adjust for next day if past 4 PM EST
    }
  
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
    let countdownString = `${hours}h ${minutes}m ${seconds}s`;
    
    // Update all countdown elements
    document.querySelectorAll('.countdownJS').forEach(function(element) {
      element.textContent = countdownString;
    });
    
    // Update the day class based on the current time
    const dayText = currentTimeEST.getHours() >= targetHour ? 'tomorrow' : 'today';
    document.querySelectorAll('.day').forEach(function(element) {
      element.textContent = dayText;
    });
  }
  
  // Set up the countdown to update every second
  const intervalId = setInterval(updateCountdown, 1000);
  // Helper function to add business days to a date
  function addBusinessDays(date, daysToAdd) {
    let daysAdded = 0;
    while (daysAdded < daysToAdd) {
      date.setDate(date.getDate() + 1); // Move to the next day
      // Check if the new date is a business day
      if (date.getDay() !== 0 && date.getDay() !== 6) { // Sunday is 0, Saturday is 6
        daysAdded++;
      }
    }
    return date;
  }

  // Calculate the guaranteed delivery range
  function calculateGuaranteedDelivery() {
    const minBusinessDays = 2; // Minimum business shipping days
    const maxBusinessDays = 7; // Maximum business shipping days
    
    const today = new Date();
    const minDeliveryDate = addBusinessDays(new Date(today), minBusinessDays);
    const maxDeliveryDate = addBusinessDays(new Date(today), maxBusinessDays);
    
    // Format the dates
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const minDateFormatted = minDeliveryDate.toLocaleDateString('en-US', options);
    const maxDateFormatted = maxDeliveryDate.toLocaleDateString('en-US', options);
    
    // Update the delivery range on the page
    const maxDate = document.querySelector('.max-date');
    if (maxDate) {
      maxDate.textContent = `${maxDateFormatted}`;
    }
    const deliveryRangeElement = document.querySelector('.delivery-range');
    if (deliveryRangeElement) {
      deliveryRangeElement.textContent = `${minDateFormatted} - ${maxDateFormatted}`;
    }
  }
  
  // Call the calculateGuaranteedDelivery function to set the initial delivery range
  calculateGuaranteedDelivery();
});