const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

let translator = new Translator();

suite('Unit Tests', () => {
  suite('americanToBritish', () => {  
    // #1
    test('translate Mangoes are my favorite fruit.', () => {
      let text = 'Mangoes are my favorite fruit.';
      let expected = 'Mangoes are my favourite fruit.';

      assert.equal(translator.americanToBritish(text)[0], expected);
    });

    // #2
    test('translate I ate yogurt for breakfast.', () => {
      let text = 'I ate yogurt for breakfast.';
      let expected = 'I ate yoghurt for breakfast.';

      assert.equal(translator.americanToBritish(text)[0], expected);
    });

    // #3
    test('translate We had a party at my friend\'s condo.', () => {
      let text = 'We had a party at my friend\'s condo.';
      let expected = 'We had a party at my friend\'s flat.';

      assert.equal(translator.americanToBritish(text)[0], expected);
    });

    // #4
    test('translate Can you toss this in the trashcan for me?', () => {
      let text = 'Can you toss this in the trashcan for me?';
      let expected = 'Can you toss this in the bin for me?';

      assert.equal(translator.americanToBritish(text)[0], expected);
    });

    // #5
    test('translate The parking lot was full.', () => {
      let text = 'The parking lot was full.';
      let expected = 'The car park was full.';

      assert.equal(translator.americanToBritish(text)[0], expected);
    });

    // #6
    test('translate Like a high tech Rube Goldberg machine.', () => {
      let text = 'Like a high tech Rube Goldberg machine.';
      let expected = 'Like a high tech Heath Robinson device.';

      assert.equal(translator.americanToBritish(text)[0], expected);
    });

    // #7
    test('translate To play hooky means to skip class or work.', () => {
      let text = 'To play hooky means to skip class or work.';
      let expected = 'To bunk off means to skip class or work.';

      assert.equal(translator.americanToBritish(text)[0], expected);
    });

    // #8
    test('translate No Mr. Bond, I expect you to die.', () => {
      let text = 'No Mr. Bond, I expect you to die.';
      let expected = 'No Mr Bond, I expect you to die.';

      assert.equal(translator.americanToBritish(text)[0], expected);
    });

    // #9
    test('translate Dr. Grosh will see you now.', () => {
      let text = 'Dr. Grosh will see you now.';
      let expected = 'Dr Grosh will see you now.';

      assert.equal(translator.americanToBritish(text)[0], expected);
    });

    // #10
    test('translate Lunch is at 12:15 today.', () => {
      let text = 'Lunch is at 12:15 today.';
      let expected = 'Lunch is at 12.15 today.';

      assert.equal(translator.americanToBritish(text)[0], expected);
    });
  });

  suite('britishToAmerican', () => {
    // #1
    test('translate We watched the footie match for a while.', () => {
      let text = 'We watched the footie match for a while.';
      let expected = 'We watched the soccer match for a while.';

      assert.equal(translator.britishToAmerican(text)[0], expected);
    });

    // #2
    test('translate Paracetamol takes up to an hour to work.', () => {
      let text = 'Paracetamol takes up to an hour to work.';
      let expected = 'Tylenol takes up to an hour to work.';

      assert.equal(translator.britishToAmerican(text)[0], expected);
    });

    // #3
    test('translate First, caramelise the onions.', () => {
      let text = 'First, caramelise the onions.';
      let expected = 'First, caramelize the onions.';

      assert.equal(translator.britishToAmerican(text)[0], expected);
    });

    // #4
    test('translate I spent the bank holiday at the funfair.', () => {
      let text = 'I spent the bank holiday at the funfair.';
      let expected = 'I spent the public holiday at the carnival.';

      assert.equal(translator.britishToAmerican(text)[0], expected);
    });

    // #5
    test('translate I had a bicky then went to the chippy.', () => {
      let text = 'I had a bicky then went to the chippy.';
      let expected = 'I had a cookie then went to the fish-and-chip shop.';

      assert.equal(translator.britishToAmerican(text)[0], expected);
    });

    // #6
    test('translate I\'ve just got bits and bobs in my bum bag.', () => {
      let text = 'I\'ve just got bits and bobs in my bum bag.';
      let expected = 'I\'ve just got odds and ends in my fanny pack.';

      assert.equal(translator.britishToAmerican(text)[0], expected);
    });

    // #7
    test('translate The car boot sale at Boxted Airfield was called off.', () => {
      let text = 'The car boot sale at Boxted Airfield was called off.';
      let expected = 'The swap meet at Boxted Airfield was called off.';

      assert.equal(translator.britishToAmerican(text)[0], expected);
    });

    // #8
    test('translate Have you met Mrs Kalyani?', () => {
      let text = 'Have you met Mrs Kalyani?';
      let expected = 'Have you met Mrs. Kalyani?';

      assert.equal(translator.britishToAmerican(text)[0], expected);
    });

    // #9
    test('translate Prof Joyner of King\'s College, London.', () => {
      let text = 'Prof Joyner of King\'s College, London.';
      let expected = 'Prof. Joyner of King\'s College, London.';

      assert.equal(translator.britishToAmerican(text)[0], expected);
    });

    // #10
    test('translate Tea time is usually around 4 or 4.30.', () => {
      let text = 'Tea time is usually around 4 or 4.30.';
      let expected = 'Tea time is usually around 4 or 4:30.';

      assert.equal(translator.britishToAmerican(text)[0], expected);
    });
  });

  suite('highlight translation', () => {
    let oSpan = '<span class="highlight">';
    let cSpan = '</span>';

    // #1
    test('highlight translation in Mangoes are my favorite fruit.', () => {
      let text = 'Mangoes are my favorite fruit.';
      let expected = oSpan + 'favourite' + cSpan;

      assert.include(translator.americanToBritish(text)[1], expected);
    });

    // #2
    test('translation in I ate yogurt for breakfast.', () => {
      let text = 'I ate yogurt for breakfast.';
      let expected = oSpan + 'yoghurt' + cSpan;

      assert.include(translator.americanToBritish(text)[1], expected);
    });

    // #3
    test('translation We watched the footie match for a while.', () => {
      let text = 'We watched the footie match for a while.';
      let expected = oSpan + 'soccer' + cSpan;

      assert.include(translator.britishToAmerican(text)[1], expected);
    });

    // #4
    test('Paracetamol takes up to an hour to work.', () => {
      let text = 'Paracetamol takes up to an hour to work.';
      let expected = oSpan + 'Tylenol' + cSpan;

      assert.include(translator.britishToAmerican(text)[1], expected);
    });
  });
});
