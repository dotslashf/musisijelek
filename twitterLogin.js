const Twitter = require('twitter-lite');
const dotenv = require('dotenv');

dotenv.config();

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET_KEY,
});

// client
//   .getRequestToken(process.env.TWITTER_CALLBACK_URL)
//   .then(res =>
//     console.log({
//       reqTkn: res.oauth_token,
//       reqTknSecret: res.oauth_token_secret,
//     })
//   )
//   .catch(console.error);

const oauthVerifier = 'w3UH7wCfYxwteFkKDsipeL7vGw35aTHC';
const oauthToken = '8STYQQAAAAABDXA4AAABetv4I1A';

client
  .getAccessToken({
    oauth_verifier: oauthVerifier,
    oauth_token: oauthToken,
  })
  .then(res =>
    console.log({
      accTkn: res.oauth_token,
      accTknSecret: res.oauth_token_secret,
      userId: res.user_id,
      screenName: res.screen_name,
    })
  )
  .catch(console.error);
