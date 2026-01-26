import gtts from 'gtts';

const text = 'こんにちは';
const filepath = './public/hello.mp3';

const speech = new gtts(text, 'ja');
speech.save(filepath, (err, result) => {
  if (err) {
    throw new Error(err);
  }
  console.log(`Audio file saved to ${filepath}`);
});
