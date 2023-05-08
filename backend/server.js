const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connect = require('./database/connect')
const todoRouter = require('./routes/todo')
require('dotenv').config()

const PORT = process.env.PORT || 8001
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// conection to MongoDB
connect()

app.use('/', todoRouter)

app.get('/', (req, res) => {
   res.json({
      message: 'Welcome back to your favourite backend framework',
   })
})

app.listen(PORT, () => {
   console.log(`Server started on port ${PORT}`)
})
