const express = require('express')
const app = express()
const port = process.env.PORT || 3000
var cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');

app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ujemn7v.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const database = client.db('sundarcruiseDB')
    const cruisesCollection = database.collection('cruises')
    const spotsCollection = database.collection('spots')
    const bookingsCollection = database.collection('bookings')


    app.get('/spots', async(req,res)=>{
        const cursor = spotsCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })

    app.get('/spots/:id', async(req,res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        console.log('i need data for id :', id);
        const product =  await spotsCollection.findOne( query );
        res.send(product);
    })

    app.get('/cruises', async(req,res)=>{
        const cursor = cruisesCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })

    app.get('/cruises/:id', async(req,res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        console.log('i need data for id :', id);
        const product =  await cruisesCollection.findOne( query );
        res.send(product);
    })

    app.get('/bookings', async(req,res)=>{
        const cursor = bookingsCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })

    app.get('/bookings/:id', async(req,res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        console.log('i need data for id :', id);
        const product =  await bookingsCollection.findOne( query );
        res.send(product);
    })

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
