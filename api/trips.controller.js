import TripsDAO from "../dao/tripsDAO.js"

export default class TripsController {
  
    static async apiPostTrip(req, res, next) {
      try {
        const tripId = parseInt(req.body.tripId)
        const tripfrom = req.body.tripfrom
        const tripto = req.body.tripto
        const date = req.body.date
        const time = req.body.time
        const seats = parseInt(req.body.seats);
        
        const tripResponse = await TripsDAO.addTrip(
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
  
    static async apiGetTrip(req, res, next) {
      try {
        let id = parseInt(req.params.tripId) || {}
        let trip = await TripsDAO.getTrip(id)
        if (!trip) {
          res.status(404).json({error: "Not found"})
          return
        }
        res.json(trip)
      } catch (e) {
        console.log(`api, ${e}`)
        res.status(500).json({error: e})
      }
    }
  
    static async apiUpdateTrip(req, res, next) {
      try {
        const tripId = parseInt(req.body.tripId)
        const tripfrom = req.body.tripfrom
        const tripto = req.body.tripto
        const date = req.body.date
        const time = req.body.time
        const seats = parseInt(req.body.seats);
  
        const tripResponse = await TripsDAO.updateTrip(
            tripId,
            tripfrom,
            tripto,
            date,
            time,
            seats
        )
  
        var { error } = tripResponse
        if (error) {
          res.status(400).json({error})
        }
  
        if (tripResponse.modifiedCount === 0) {
          throw new Error(
            "unable to update trip"
          )
        }
  
        res.json({status: "success"})
      } catch (e) {
        res.status(500).json({error: e.message})
      }
    }
  
    static async apiDeleteTrip(req, res, next) {
      try {
        const tripId = parseInt(req.params.tripId)
        const tripResponse = await TripsDAO.deleteTrip(tripId)
        res.json({status: "success"})
      } catch (e) {
        res.status(500).json({error: e.message})
      }
    }
  
    static async apiGetTripsByLocationAndDate(req, res, next) {
      try {
        const { from, to, date } = req.params;
        let trips = await TripsDAO.getTripsByLocationAndDate(from, to, date)

        if (!trips) {
          res.status(404).json({error: "Not found"})
          return
        }
        res.json(trips)
      } catch (e) {
        console.log(`api, ${e}`)
        res.status(500).json({error: e.message})
      }
    }

    static async decrementAvailableSeats(tripId, passengers) {
      try {
        const trip = await TripsDAO.getTrip(tripId);

        if (!trip) {
          throw new Error(`Trip with ID ${tripId} not found.`);
        }

        const seats = trip.seats - passengers;
        if (seats < 0) {
          throw new Error("Insufficient available seats for the trip.");
        }
  
        await TripsDAO.updateAvailableSeats(tripId, seats);
  
        return seats;
      } catch (error) {
        throw error;
      }
    }
  
  }