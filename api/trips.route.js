import express from "express"
import TripsCtrl from "./trips.controller.js"
import BookingsCtrl from "./bookings.controller.js"
import TicketsCtrl from "./tickets.controller.js"
import BookingsController from "./bookings.controller.js"

const router = express.Router()

router.route("/trips/:from&:to&:date").get(TripsCtrl.apiGetTripsByLocationAndDate);

// NEW! Bulk actions - Get/Delete all trips
router.route("/trips/all")
      .get(TripsCtrl.apiGetAllTrips)
      .delete(TripsCtrl.apiDeleteAllTrips);

router.route("/trip/new").post(TripsCtrl.apiPostTrip);

router.route("/trip/:tripId")
      .get(TripsCtrl.apiGetTrip)
      .put(TripsCtrl.apiUpdateTrip)
      .delete(TripsCtrl.apiDeleteTrip);

router.route("/booking").post(BookingsCtrl.apiPostBooking);

router.route("/bookings/:bookid").get(BookingsCtrl.apiGetBooking);

router.route("/ticket").post(TicketsCtrl.apiPostTicket);

router.route("/tickets/:bookid").get(TicketsCtrl.apiGetTickets);

export default router