import app from "./server.js"
import mongodb from "mongodb"
import TripsDAO from "./dao/tripsDAO.js"

const MongoClient = mongodb.MongoClient

const uri = `mongodb+srv://viss:fiskel99@cluster8658.bsbuiyp.mongodb.net/?retryWrites=true&w=majority`

const port = 3000

MongoClient.connect(
  uri,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true
  })
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