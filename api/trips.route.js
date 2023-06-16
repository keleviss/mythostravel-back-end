import express from "express"
import TripsCtrl from "./trips.controller.js"
import BookingsCtrlCtrl from "./bookings.controller.js"
import TicketsCtrl from "./tickets.controller.js"

const router = express.Router()

router.route("/trips/:from&:to&:date").get(TripsCtrl.apiGetTripsByLocationAndDate);
router.route("/trip/new").post(TripsCtrl.apiPostTrip)
router.route("/trip/:tripId")
      .get(TripsCtrl.apiGetTrip)
      .put(TripsCtrl.apiUpdateTrip)
      .delete(TripsCtrl.apiDeleteTrip)
router.route("/booking").post(BookingsCtrl.apiPostBooking);
router.route("/ticket").post(TicketCtrl.apiPostTicket);

export default router