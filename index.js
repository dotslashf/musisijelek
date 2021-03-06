const { randomNumber } = require('./utils/randomizer');
const { isArtistExist } = require('./wrapper/firebase');
const { getArtist } = require('./wrapper/spotify');
const { downloadImage, joinImage, loadingBar } = require('./utils/helpers');
const { postTweet, uploadImageToTwitter } = require('./wrapper/twitter');

(async () => {
  while (true) {
    const nTimeWait = randomNumber(60, 120);

    await loadingBar(nTimeWait);

    const obj = await getArtist();
    const artistExist = await isArtistExist(obj.char, obj.name);
    if (artistExist) {
      try {
        await joinImage(obj.defaultImage, obj.imageUrl);
        const media = await uploadImageToTwitter();
        await postTweet(`${obj.name} jelek`, media);
        console.log('Tweeted', obj.name, 'jelek');
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('Duplicate Artist', obj.name);
    }
  }
})();
