// SUgZZmrFmH5RLcf8
// mystylinlife223
const express= require('express')
const cors= require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app=express();
const port= process.env.PORT || 5000  
require('dotenv').config()

app.use(cors())
// const corsConfig = {
//   origin: '',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE']
// }
// app.use(cors(corsConfig))
// app.options("", cors(corsConfig))
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0xqymst.mongodb.net/?retryWrites=true&w=majority`;
// const uri = "mongodb+srv://mystylinlife223:<password>@cluster0.0xqymst.mongodb.net/?retryWrites=true&w=majority";

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
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const db=client.db("toyCollection");
    const toyCollections=db.collection("allToys")

    app.post("/postToy",async(req,res)=>{
        const body=req.body
        const result=await toyCollections.insertOne(body)
        res.send(result)

        
        console.log(body)
    })

    app.get('/allToys',async(req,res)=>{
        const result= await toyCollections.find({}).sort({price:1}).toArray()
        res.send(result)
    })
  //   app.get('/allToysforHome',async(req,res)=>{
  //     const query={}
  //     const cursor=toyCollections.find(query).sort({price:-1})
  //     const result= await cursor.toArray()
  //     res.send(result)
  // })

    app.delete('/delete/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await toyCollections.deleteOne(query);
      res.send(result);
  })
// police data 
  app.get('/policetoy',async(req,res)=>{
    const query={category : 'police'}
    const cursor=toyCollections.find(query)
    const result=await cursor.toArray()
    res.send(result)
  })

  // sports data
  app.get('/sportstoy',async(req,res)=>{
    const query={category : 'sports'}
    const cursor=toyCollections.find(query)
    const result=await cursor.toArray()
    res.send(result)
  })

// fire data
  app.get('/fire',async(req,res)=>{
    const query={category : 'fire'}
    const cursor=toyCollections.find(query)
    const result=await cursor.toArray()
    res.send(result)
  })

  app.get('/ambulance',async(req,res)=>{
    const query={category : 'ambulance'}
    const cursor=toyCollections.find(query)
    const result=await cursor.toArray()
    res.send(result)
  })






    app.put("/updateToys/:id", async (req, res) => {
      const id = req.params.id;
      const body = req.body;
      console.log(body);
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          price: body.price,
          quantity: body.quantity,
          description: body.description,
        },
      };
      const result = await toyCollections.updateOne(filter, updateDoc);
      res.send(result);
    });


    app.get('/private', async (req, res) => {
      console.log(req.query.email);
      let query = {};
      if (req.query?.email) {
          query = { email: req.query.email }
      }
      const result = await toyCollections.find(query).toArray();
      res.send(result);
  })

  // app.get("/myJobs/:email", async (req, res) => {
  //   console.log(req.params.id);
  //   const jobs = await jobsCollection
  //     .find({
  //       postedBy: req.params.email,
  //     })
  //     .toArray();
  //   res.send(jobs);
  // });






    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('coffe makign')
})

app.listen(port,()=>{
    console.log(`coffee server is running on port ${port}`)
})