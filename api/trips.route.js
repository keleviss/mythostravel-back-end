import express from "express"
import TripsCtrl from "./trips.controller.js"

const router = express.Router()

router.route("/trips/:from/:to/:date").get(TripsCtrl.apiGetTripsByLocationAndDate);
router.route("/trip/new").post(TripsCtrl.apiPostTrip)
router.route("/trip/:tripId")
      .get(TripsCtrl.apiGetTrip)
      .put(TripsCtrl.apiUpdateTrip)
      .delete(TripsCtrl.apiDeleteTrip)

export default router