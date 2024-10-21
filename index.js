import app from "./server.js"
import mongodb from "mongodb"
import TripsDAO from "./dao/tripsDAO.js"
import dotenv from 'dotenv';
dotenv.config();

const MongoClient = mongodb.MongoClient

const uri = process.env.MONGODB_URI;
const options = { maxPoolSize: 50, wtimeoutMS: 2500, useNewUrlParser: true };
const port = process.env.PORT || 3000;

MongoClient.connect(uri, options)
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await TripsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })