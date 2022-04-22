const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const translateOLD = require('@vitalets/google-translate-api');
let apiNames = 'https://api.randomdatatools.ru/'
let apiText = 'https://geek-jokes.sameerkumar.website/api?format=json'
const { translate } = require('free-translate');

let text

getPerson()
getText()
//getTranslate()

function getPerson() {
  request(apiNames, function(err, resp, html) {
    if (!err){
      console.log(JSON.parse(html).FirstName)
      console.log(JSON.parse(html).FatherName)
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
  /*
  (async () => {
    const translatedText = await translate(text, { from: 'en', to: 'ru' });

    console.log(' - - - -> ')
    console.log(translatedText); // こんにちは世界
  })();
  */
  translateOLD(text, {to: 'ru'})
    .then( res => {
      console.log(' -_-_-_-> ')
      console.log(res.text)
    })
    .catch(
      (err) => {
        console.log(
          " Error in perevodchik  "+err,
        )
      }
    )
}
