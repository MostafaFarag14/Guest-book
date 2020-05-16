const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const User = require('./models/user')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json)

const uri = `mongodb+srv://mostafafarag:361987@cluster0-h0r7q.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection
connection.once('open', () => {
  console.log('4a8aaal')
})
app.listen(port, () => {
  console.log(`server is running on port : ${port}`)
})