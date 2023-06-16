import TripsDAO from "../dao/tripsDAO.js"

import { generateTicketId } from "./helpers.js";

export default class TicketsController {
  static async apiPostTicket(req, res, next) {
    try {
      const { tripId, category, passengerName, idNumber, bookingId } = req.body;

      // Generate a random ticketId
      const ticketId = generateTicketId(4);

      // Create the ticket object
      const ticketData = {
        ticketId,
        category,
        passengerName,
        tripId: parseInt(tripId),
        bookingId,        
        idNumber
      };

      // Log the created ticket data
      console.log(ticketData);

      // Add the ticket to the database
      const ticket = await TripsDAO.addTicket(ticketData);

      res.status(201).json(ticket); // Return the created ticket object
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}