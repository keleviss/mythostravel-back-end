// helpers.js

// Function to generate a sequential booking ID
let bookingIdCounter = 0;
export function generateBookingId() {
  bookingIdCounter++;
  if (bookingIdCounter > 9999) {
    bookingIdCounter = 1; // Reset to 0001 when it exceeds 9999
  }
  return `book${bookingIdCounter.toString().padStart(4, '0')}`;
}

// Function to generate a sequential ticket ID
let ticketIdCounter = 0;
export function generateTicketId() {
  ticketIdCounter++;
  if (ticketIdCounter > 9999) {
    ticketIdCounter = 1; // Reset to 0001 when it exceeds 9999
  }
  return `tick${ticketIdCounter.toString().padStart(4, '0')}`;
}
