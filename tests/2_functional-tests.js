const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

let translator = new Translator();

suite('Functional Tests', () => {
  suite('Routing Test', () => {
    let oSpan = '<span class="highlight">';
    let cSpan = '</span>'; 

    // #1
    test('translation with text and locale fields', (done) => {
      chai
        .request(server)
        .post('/api/translate')
        .send({
          text: 'Mangoes are my favorite fruit.',
          locale: 'american-to-british'
        })
        .end(function(error, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.text, 'Mangoes are my favorite fruit.');
          assert.equal(res.body.translation, 'Mangoes are my ' + oSpan + 'favourite' + cSpan + ' fruit.');
          done();
        });
    });

    // #2
    test('translation with text and invalid locale field', (done) => {
      chai
        .request(server)
        .post('/api/translate')
        .send({
          text: 'Mangoes are my favorite fruit.',
          locale: 'american-to-french'
        })
        .end(function(error, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.error, 'Invalid value for locale field');
          done(); 
        });
    });

    // #3
    test('translation with missing text field', (done) => {
      chai
        .request(server)
        .post('/api/translate')
        .send({
          text: undefined,
          locale: 'american-to-british'
        })
        .end(function(error, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.error, 'Required field(s) missing');
          done(); 
        });
    });

    // #4
    test('translation with missing locale field', (done) => {
      chai
        .request(server)
        .post('/api/translate')
        .send({
          text: 'Mangoes are my favorite fruit.',
          locale: undefined
        })
        .end(function(error, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.error, 'Required field(s) missing');
          done(); 
        });
    });

    // #5
    test('translation with empty text', (done) => {
      chai
        .request(server)
        .post('/api/translate')
        .send({
          text: '',
          locale: 'american-to-british'
        })
        .end(function(error, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.error, 'No text to translate');
          done(); 
        });
    });

    // #6
    test('translation with text that needs no translation', (done) => {
      chai
        .request(server)
        .post('/api/translate')
        .send({
          text: 'Hello world',
          locale: 'american-to-british'
        })
        .end(function(error, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.text, 'Hello world');
          assert.equal(res.body.translation, 'Everything looks good to me!');
          done(); 
        });
    });
  });
});
