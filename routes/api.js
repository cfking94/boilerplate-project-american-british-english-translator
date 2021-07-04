'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let {text, locale} = req.body;
      let result = text;

      if (text == '') {
        return res.json({error: 'No text to translate'});
      }

      if (text == undefined || locale == undefined) {
        return res.json({error: 'Required field(s) missing'});
      }

      if (locale == 'american-to-british') {
        result = translator.americanToBritish(text)[1];
      } else if (locale == 'british-to-american') {
        result = translator.britishToAmerican(text)[1];
      } else {
        return res.json({error: 'Invalid value for locale field'});
      }

      if (result == text) {
        result = 'Everything looks good to me!';
      }

      return res.json({
        text: text,
        translation: result
      });
    });
};
