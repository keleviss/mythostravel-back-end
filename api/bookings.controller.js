import TripsDAO from "../dao/tripsDAO.js";
import { generateBookingId } from "./helpers.js";

export default class BookingsController {
    static async apiPostBooking(req, res, next) {
      try {
        const { tripId, email, name, phone, passengers } = req.body;

        // Generate a random bookingId
        const bookingId = generateBookingId(4);
  
        // Create the booking object
        const bookingData = {
          bookingId,
          email,
          name,
          phone,
          tripId: parseInt(tripId), // Parse tripId as an integer
          passengers: parseInt(passengers), // Parse passengers as an integer
        };

        // Log the created booking data
        console.log(bookingData);

        // Add the booking to the database
        const booking = await TripsDAO.addBooking(bookingData);

        res.status(201).json(bookingData); // Return the created booking object
      } catch (e) {
        res.status(500).json({ error: e.message });
      }
    }
  }
  
