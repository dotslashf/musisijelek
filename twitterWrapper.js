const Twitter = require('twitter-lite');
require('dotenv').config();

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET_KEY,
  access_token_key: process.env.TWITTER_API_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_API_ACCESS_TOKEN_SECRET,
});

const postTweet = async tweet => {
  await client.post('statuses/update', {
    status: tweet,
  });
};

module.exports = {
  postTweet,
};
