const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8001
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
