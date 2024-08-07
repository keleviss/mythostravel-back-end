import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let trips
let bookings
let tickets

export default class TripsDAO {
  static async injectDB(conn) {
    if (trips) {
      return
    }
    try {
      trips = await conn.db("trips").collection("trips")
      bookings = await conn.db("trips").collection("bookings")
      tickets = await conn.db("trips").collection("tickets")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addTrip(tripId, tripfrom, tripto, date, time, seats) {
    try {
      const tripDoc = {
        tripId: tripId,
        tripfrom: tripfrom,
        tripto: tripto,
        date: date,
        time: time,
        seats: seats
      }

      return await trips.insertOne(tripDoc)
    } catch (e) {
      console.error(`Unable to post Trip: ${e}`)
      return { error: e }
    }
  }

  static async getTrip(id) {
    try {
      const trip = await trips.findOne({ tripId: id })
      return trip
    } catch (e) {
      console.error(`Unable to get trip: ${e}`)
      return { error: e }
    }
  }

  static async updateTrip(tripId, tripfrom, tripto, date, time, seats) {
    try {
      const objId = new mongodb.ObjectId(tripId)
      const updateResponse = await trips.updateOne(
        { _id: objId },
        {
          $set: {
            tripId: tripId,
            tripfrom: tripfrom,
            tripto: tripto,
            date: date,
            time: time,
            seats: seats
          }
        }
      )

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update trip: ${e}`)
      return { error: e }
    }
  }

  static async deleteTrip(tripId) {
    try {
      const deleteResponse = await trips.deleteOne({ tripId: tripId })
      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete trip: ${e}`)
      return { error: e }
    }
  }

  static async getTripsByLocationAndDate(from, to, date) {
    try {
      const cursor = await trips.find({ tripfrom: from, tripto: to, date: date })
      return cursor.toArray()
    } catch (e) {
      console.error(`Unable to get trips: ${e}`)
      return { error: e }
    }
  }

  // NEW! Get all Trips
  static async getAllTrips() {
    try {

      const documents = await trips.find({}).toArray();
      return documents;

    } catch (e) {
      console.error(`Unable to get all trips: ${e}`)
      return { error: e }
    }
  }

  // NEW! Delete all trips
  static async deleteAllTrips() {
    try {
      const deleteResponse = await trips.deleteMany({})
      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete all trips: ${e}`)
      return { error: e }
    }
  }

  static async addBooking(bookingData) {
    try {
      return await bookings.insertOne(bookingData);
    } catch (e) {
      console.error(`Unable to post Booking: ${e}`);
      return { error: e };
    }
  }

  static async addTicket(ticketData) {
    try {
      return await tickets.insertOne(ticketData);
    } catch (e) {
      console.error(`Unable to post Booking: ${e}`);
      return { error: e };
    }
  }

  static async updateAvailableSeats(tripId, availableSeats) {
    try {
      const filter = { tripId: tripId };
      const update = { $set: { seats: availableSeats } };

      const result = await trips.updateOne(filter, update);

      if (result.modifiedCount === 0) {
        throw new Error(`Failed to update available seats for trip with ID ${tripId}.`);
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getBooking(bookId) {
    try {
      const booking = await bookings.findOne({ bookingId: bookId })
      return booking
    } catch (e) {
      console.error(`Unable to get booking: ${e}`)
      return { error: e }
    }
  }

  static async getTickets(bookId) {
    try {
      const ticks = await tickets.find({ bookingId: bookId }).toArray()
      return ticks
    } catch (e) {
      console.error(`Unable to get tickets: ${e}`)
      return { error: e }
    }
  }

}