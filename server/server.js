require('dotenv').config()
const { json } = require('express')
const express = require('express')
const app = express()
const mongoose = require('mongoose')


mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Database connected"))

app.use(express.json())

const subscriberRoute = require('./routes/subscriber')

app.use('/subscriber', subscriberRoute)

app.listen(3000, () => {console.log("Connected")})