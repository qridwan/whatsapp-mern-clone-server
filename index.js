const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb')
const app = express()
require("dotenv").config();
app.use(express.json())
app.use(cors())

app.get('/', (req, res) =>{
    res.send("Server is Ready")
})

const uri = `mongodb+srv://ImRidwan:this.main@cluster0.q83cw.mongodb.net/whatsapp-clone?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect((err) => {
    const textCollection = client
    .db(`whatsapp-clone`)
    .collection(`messages`);

    //getting all text messages
    app.get('/allMessage', (req, res) => {
        textCollection.find({})
        .toArray((err, messages) => {
          res.send(messages)
        })
    })

    //sending new text to db
    app.post('/sendMessage', (req, res) => {
      const newMessage = req.body;
      console.log("🚀 ~ file: index.js ~ line 35 ~ app.post ~ newMessage", newMessage)
      textCollection.insertOne(newMessage)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
      .catch (err => {
        console.log(err.message)
      })
    })



console.log("Connection ready")
  })

  const port = process.env.PORT || 4000;
   app.listen (port)