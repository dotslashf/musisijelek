const Twitter = require('twit');
const fs = require('fs').promises;
require('dotenv').config();

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET_KEY,
  access_token: process.env.TWITTER_API_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET,
});

const postTweet = async (tweet, media) => {
  try {
    await client.post('statuses/update', {
      status: tweet,
      media_ids: [media.media_id_string],
    });
  } catch (error) {
    console.log(`Error tweeting ${tweet}`);
  }
};

const uploadImageToTwitter = async () => {
  const image = await fs.readFile('./media/final.png', { encoding: 'base64' });

  const upload = () => {
    return new Promise(resolve => {
      client.post(
        'media/upload',
        {
          media_data: image,
        },
        (err, data, _) => {
          if (!err) {
            resolve(data);
          } else {
            console.log(err);
          }
        }
      );
    });
  };

  const data = await upload();
  return data;
};

module.exports = {
  postTweet,
  uploadImageToTwitter,
};
