export function generateTicketId() {
    const numbers = "0123456789";
    let ticketId = "tick";
  
    // Generate 4 random numbers
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      ticketId += numbers.charAt(randomIndex);
    }
  
    return ticketId;
}

export function generateBookingId() {
    const numbers = "0123456789";
    let bookingId = "book";
  
    // Generate 4 random numbers
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      bookingId += numbers.charAt(randomIndex);
    }
  
    return bookingId;
}
   