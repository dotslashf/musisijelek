const express = require('express');
const session = require('express-session');
const spotify = require('spotify-web-api-node');
require('dotenv').config();

const PORT = process.env.PORT;
const spotifyApi = new spotify({
  clientId: process.env.SPOTIFY_CLIENT_KEY,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.CALLBACK_SPOTIFY_URL,
});

const app = express();
app.use(
  session({
    secret: 'sessionSecret',
    name: 'sid',
    resave: true,
    saveUninitialized: true,
  })
);

app.get('/loginSpotify', async (_, res) => {
  const scopes = ['user-read-private'];
  const url = spotifyApi.createAuthorizeURL(scopes);
  res.redirect(url);
});

app.get('/callbackSpotify', async (req, res) => {
  const { code } = req.query;
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;
    spotifyApi.setAccessToken = access_token;
    spotifyApi.setRefreshToken = refresh_token;

    req.session.spotifyAccount = { access_token, refresh_token };
    console.log(data.body);

    res.status(200).send({
      msg: 'Login success',
      access_token,
      refresh_token,
    });
  } catch (e) {
    console.log(e);
  }
});

app.get('/checkAcc', (req, res) => {
  res.status(200).send({
    msg: {
      access_token: req.session.spotifyAccount['access_token'],
      refresh_token: req.session.spotifyAccount['refresh_token'],
    },
  });
});

app.get('/getArtist', async (req, res) => {
  const { alphabet } = req.query;
  spotifyApi
    .search(alphabet, ['artist'])
    .then(data => {
      console.log(data);
    })
    .catch(e => console.log(e));
  // console.log(listArtist);
  try {
    res.status(200).send({
      msg: {
        alphabet,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

app.get('/sessions/callback', (req, res) => {
  try {
    res.status(200).send({
      msg: 'A',
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT || 4040, async () => {
  console.log(`Server is running on ${PORT} 🚀`);
});
