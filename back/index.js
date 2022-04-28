const express = require('express')
const fs = require('fs')
const cors = require('cors')
const request = require('request')
const cheerio = require('cheerio')
const translateOLD = require('@vitalets/google-translate-api')
const port = 3001
let apiNames = 'https://api.randomdatatools.ru/'
let apiText = 'https://geek-jokes.sameerkumar.website/api?format=json'
let dataBefore
let fName
let sName
let text
let time
let translateText
let file
try {
  file = JSON.parse(fs.readFileSync('./data.JSON', 'utf-8'))
} catch (e) {
  file = []
  fs.writeFileSync('./data.JSON', JSON.stringify(file))
}

function getPerson() {
  request(apiNames, function(err, resp, html) {
    if (!err){
      console.log(JSON.parse(html).FirstName)
      console.log(JSON.parse(html).FatherName)
      fName = JSON.parse(html).FirstName
      sName = JSON.parse(html).FatherName
    } else {
      console.log("Error");
    }
  });
}

function getText() {
  request(apiText, function(err, resp, html) {
    if (!err){
      text = JSON.parse(html).joke
      console.log('message: ', text)
      getTranslate()
    } else {
      console.log("Error");
    }
  });
}

function getTranslate() {
  translateOLD(text, {to: 'ru'})
    .then( res => {
      translateText = res.text
      console.log(translateText)
      try {
        dataBefore = JSON.parse(fs.readFileSync('./data.JSON', 'utf-8'))
      } catch (e) {
        dataBefore = []
        console.log(' скорее всего, это первое получение сообщения. ', e)
      }
      const now = new Date()
      function rewriteTime(num) {
        if (num<10) {
          return '0'+num
        } else {
          return num
        }
      }
      time = rewriteTime(now.getHours())+':'+rewriteTime(now.getMinutes())
      let obj = {
        fName,
        sName,
        text,
        translateText,
        now,
        time
      }
      dataBefore.push(obj)
      fs.writeFileSync('./data.JSON' , JSON.stringify(dataBefore.slice(-100)))
    })
    .catch(
      (err) => {
        console.log(
          " Error in perevodchik  "+err,
        )
      }
    )
}

let generatorMessage = setInterval(
  () => {
    getPerson()
    getText()
  }, 4000
)

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
