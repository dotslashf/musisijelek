const { randomNumber } = require('./utils/randomizer');
const { isArtistExist } = require('./wrapper/firebase');
const { getArtist } = require('./wrapper/spotify');
const { loadingBar } = require('./utils/helpers');
const { postTweet } = require('./wrapper/twitter');

(async () => {
  while (true) {
    const nTimeWait = randomNumber(15, 30);

    await loadingBar(nTimeWait);

    const obj = await getArtist();
    const artistExist = await isArtistExist(obj.char, obj.artist);
    if (artistExist) {
      await postTweet(`${obj.artist} bangsat`);
      console.log('Tweeted', obj.artist, 'bangsat');
    } else {
      console.log('Duplicate Artist', obj.artist);
    }
  }
})();
