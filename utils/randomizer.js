const randomAlphabet = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
};

const randomNumber = (x, y) => {
  const min = Math.min(x, y);
  const max = Math.max(x, y);

  const listNumber = Array.from(Array(max - min), (_, i) => i + min)
    .slice(1)
    .filter(v => v % 2 == x < y);

  return listNumber[Math.floor(Math.random() * listNumber.length)];
};

module.exports = {
  randomAlphabet,
  randomNumber,
};
