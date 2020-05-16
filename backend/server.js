const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bycrypt = require('bcryptjs')
const User = require('./models/user')
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

const uri = `mongodb+srv://mostafafarag:361987@cluster0-ea4jj.gcp.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection
connection.once('open', () => {
  console.log('4a8aaal')
})

app.get('/', (req,res) => 
{
  console.log('server 4a8aal')
  res.json('server 4a8aal')
})

app.get('/users', (req, res) => {
  User.find()
  .then(users => {
    res.json(users)
  })
  .catch(err => res.status(400).json(`error ${err}`))
})

app.post('/register', (req, res) => {

const {name , email} = req.body
const password = bycrypt.hashSync(req.body.password, 8)

const newUser = new User({name, password, email})

newUser.save()
.then( () => res.json('User registered !'))
.catch( err => res.status(400).json('Errpr' + err))
})

app.listen(port, () => {
  console.log(`server is running on port : ${port}`)
})