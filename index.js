const { randomNumber } = require('./utils/randomizer');
const { isArtistExist } = require('./wrapper/firebase');
const { getArtist } = require('./wrapper/spotify');
const { loadingBar } = require('./utils/helpers');
const { postTweet } = require('./wrapper/twitter');

(async () => {
  while (true) {
    const nTimeWait = randomNumber(60, 120);

    await loadingBar(nTimeWait);

    const obj = await getArtist();
    const artistExist = await isArtistExist(obj.char, obj.name);
    if (artistExist) {
      await downloadImage(obj.imageUrl);
      await joinImage(obj.defaultImage);
      const media = await uploadImageToTwitter();
      await postTweet(`${obj.name} jelek`, media);
      console.log('Tweeted', obj.artist, 'jelek');
    } else {
      console.log('Duplicate Artist', obj.artist);
    }
  }
})();
