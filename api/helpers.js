// helpers.js

// Function to generate a sequential booking ID
export function generateBookingId() {
  const randomDigits = Math.floor(Math.random() * 9999) + 1;
  return `book${randomDigits.toString().padStart(4, '0')}`;
}

// Function to generate a sequential ticket ID
export function generateTicketId() {
  const randomDigits = Math.floor(Math.random() * 9999) + 1;
  return `tick${randomDigits.toString().padStart(4, '0')}`;
}
