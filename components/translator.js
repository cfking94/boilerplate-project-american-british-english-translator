const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

class Translator {
  americanToBritish(text) {
    let oSpan = '<span class="highlight">';
    let cSpan = '</span>';
    let translation = text;
    let result = text; 

    // -------------------- Check dictionary --------------------
    for (let key in americanOnly) {
      let regex = new RegExp('(?<=\\s)' + key + '(?=\\s|\\.$|$)|^' + key + '(?=\\s|\\.$|$)', 'gi');

      translation = translation.replace(regex, americanOnly[key]);

      result = result.replace(regex, oSpan + americanOnly[key] + cSpan);
    }

    for (let key in americanToBritishSpelling) {
      let regex = new RegExp('(?<=\\s)' + key + '(?=\\s|\\.$|$)|^' + key + '(?=\\s|\\.$|$)', 'gi');

      translation = translation.replace(regex, americanToBritishSpelling[key]);

      result = result.replace(regex, oSpan + americanToBritishSpelling[key] + cSpan);
    }

    for (let key in americanToBritishTitles) {
      let x = key.replace('.', '');
      let regex = new RegExp('(?<=\\s)' + x + '\\.(?=\\s|$)|^' + x + '\\.(?=\\s|$)', 'gi');

      translation = translation.replace(regex, americanToBritishTitles[key].charAt(0).toUpperCase() + americanToBritishTitles[key].slice(1));

      result = result.replace(regex, oSpan + americanToBritishTitles[key].charAt(0).toUpperCase() + americanToBritishTitles[key].slice(1) + cSpan);
    }

    // Time format
    let regex = /([0-1]?[0-9]|2[0-3]):[0-5][0-9]/g;
    let time = result.match(regex);

    if (time) {
      for (let i = 0; i < time.length; i++) {
        translation = translation.replace(time[i], time[i].replace(':', '.'));

        result = result.replace(time[i], oSpan + time[i].replace(':', '.') + cSpan);
      }
    }
    
    // -------------------- Return result --------------------
    translation = translation.charAt(0).toUpperCase() + translation.slice(1);

    result = result.charAt(0).toUpperCase() + result.slice(1);

    return [translation, result];
  }

  britishToAmerican(text) {
    let oSpan = '<span class="highlight">';
    let cSpan = '</span>';
    let translation = text;
    let result = text;

    // -------------------- Check dictionary --------------------
    for (let key in britishOnly) {
      let regex = new RegExp('(?<=\\s)' + key + '(?=\\s|\\.$|$)|^' + key + '(?=\\s|\\.$|$)?', 'gi');

      translation = translation.replace(regex, britishOnly[key]);

      result = result.replace(regex, oSpan + britishOnly[key] + cSpan);
    }

    for (let key in americanToBritishSpelling) {
      let regex = new RegExp('(?<=\\s)' + americanToBritishSpelling[key] + '(?=\\s|\\.$|$)|^' + americanToBritishSpelling[key] + '(?=\\s|\\.$|$)', 'gi');

      translation = translation.replace(regex, key);

      result = result.replace(regex, oSpan + key + cSpan);
    }

    for (let key in americanToBritishTitles) {
      let regex = new RegExp('(?<=\\s)' + americanToBritishTitles[key] + '(?=\\s|$)|^' + americanToBritishTitles[key] + '(?=\\s|$)', 'gi');

      translation = translation.replace(regex, key.charAt(0).toUpperCase() + key.slice(1))

      result = result.replace(regex, oSpan + key.charAt(0).toUpperCase() + key.slice(1) + cSpan);
    }

    // Time format
    let regex = /([0-1]?[0-9]|2[0-3])\.[0-5][0-9]/g;
    let time = result.match(regex);

    if (time) {
      for (let i = 0; i < time.length; i++) {
        translation = translation.replace(time[i], time[i].replace('.', ':')); 

        result = result.replace(time[i], oSpan + time[i].replace('.', ':') + cSpan);
      }
    }

    // -------------------- Return result --------------------
    translation = translation.charAt(0).toUpperCase() + translation.slice(1);

    result = result.charAt(0).toUpperCase() + result.slice(1);

    return [translation, result];
  }
}

module.exports = Translator;