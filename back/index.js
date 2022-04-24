const express = require('express')
const fs = require('fs')
const cors = require('cors')
const port = 3001
let file
try {
  file = JSON.parse(fs.readFileSync('./data.JSON', 'utf-8'))
} catch (e) {
  file = []
  fs.writeFileSync('./data.JSON', JSON.stringify(file))
}


let checkSize = setInterval(
  () => {
    file = JSON.parse(fs.readFileSync('./data.JSON', 'utf-8'))
  }, 1000
)

const app = express()

const options = {
  origin: [
    'http://localhost:3001',
    'http://localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options.origin));

app.get('/', (req, res) => {
  res.send(file)
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
