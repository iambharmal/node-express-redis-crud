const express = require('express')
const bodyParser = require('body-parser')
const userRoute = require('./routes/users')
const redis = require('redis')
require('dotenv').config()

const app = express()

const client = redis.createClient();

(async () => {
  await client.connect();
})();

client.on('connect', function() {
  console.log('Connected to Redis...')
})
.on('error', function(err) {
  console.log(err)
})

app.use(bodyParser.json())

app.use('/api', userRoute)

module.exports = app