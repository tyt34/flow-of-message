const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const translateOLD = require('@vitalets/google-translate-api');
let apiNames = 'https://api.randomdatatools.ru/'
let apiText = 'https://geek-jokes.sameerkumar.website/api?format=json'
const { translate } = require('free-translate');
let dataBefore
let fName
let sName
let text
let translateText

getPerson()
getText()

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
        dataBefore = JSON.parse(fs.readFileSync('../back/data.JSON', 'utf-8'))
      } catch (e) {
        dataBefore = []
        console.log(' скорее всего, это первое получение сообщения. ', e)
      }
      let obj = {
        fName,
        sName,
        text,
        translateText
      }
      dataBefore.push(obj)
      fs.writeFileSync('../back/data.JSON' , JSON.stringify(dataBefore))
    })
    .catch(
      (err) => {
        console.log(
          " Error in perevodchik  "+err,
        )
      }
    )
}
