const express = require('express')
const fs = require('fs')
const port = 3001
let file = JSON.parse(fs.readFileSync('./data.JSON', 'utf-8'))

let checkSize = setInterval(
  () => {
    file = JSON.parse(fs.readFileSync('./data.JSON', 'utf-8'))
  }, 1000
)

const app = express()

app.get('/', (req, res) => {
  res.send(file)
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
