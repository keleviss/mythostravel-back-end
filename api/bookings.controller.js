import TripsDAO from "../dao/tripsDAO.js"

export default class BookingsController {

    static async apiPostBooking(req, res, next) {
        try {
          const tripId = parseInt(req.body.tripId)
          const tripfrom = req.body.tripfrom
          const tripto = req.body.tripto
          const date = req.body.date
          const time = req.body.time
          const seats = req.body.seats
          
          const tripResponse = await TripsDAO.addBooking(
              tripId,
              tripfrom,
              tripto,
              date,
              time,
              seats
          )
          res.json({status: "success"})
        } catch (e) {
          res.status(500).json({error: e.message})
        }
    }

}