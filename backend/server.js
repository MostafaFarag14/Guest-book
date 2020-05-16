const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('./models/user')
const message = require('./models/message')
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
const password = bcrypt.hashSync(req.body.password, 8)
const newUser = new User({name, password, email})

newUser.save()
.then( user => res.json(user))
.catch( err => res.status(400).json('email already exists'))
})

app.post('/login', (req, res)=> {
    const {email, password} = req.body
    let passIsValid = false
    User.findOne({email: email})
    .then(user => {
      if (user) {
        passIsValid = bcrypt.compareSync(password, user.password)
          if (passIsValid) {
            res.json(user)
          }
          else {
            res.status('400').json('wrong pass')
          }
        }
        else {
          res.status('400').json('wrong user')
        }
      })
      .catch(err => {
        res.status('400').json('wrong credentials')
      })
})

app.post('/message', (req, res) => {
  const {content, email} = req.body
  let newMessage
  let owner
  let userMessages 

  User.findOne({email: email})
  .then( user => {
    owner = user.id
    userMessages = user.messages
    newMessage = new message({content, owner})
    newMessage.save()
    .then( message => {
      userMessages.push(message.id) 
    })
    .then( () => {
      user.update({messages: userMessages})
      .then(() => res.json('user updated'))
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))

})

app.listen(port, () => {
  console.log(`server is running on port : ${port}`)
})