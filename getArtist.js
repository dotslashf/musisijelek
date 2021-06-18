const axios = require('axios').default;
const qs = require('querystring');
require('dotenv').config();

const randomAlphabet = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const char = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  return char;
};

const getSpotifyToken = async () => {
  const clientId = process.env.SPOTIFY_CLIENT_KEY;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const headers = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: clientId,
      password: clientSecret,
    },
  };
  const data = {
    grant_type: 'client_credentials',
  };

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify(data),
      headers
    );
    return response.data.access_token;
  } catch (error) {
    console.log(error);
  }
};

const getArtist = async () => {
  const char = randomAlphabet().toUpperCase();
  accessToken = await getSpotifyToken();
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
  const body = {
    q: char,
    type: 'artist',
    market: 'ID',
    limit: 20,
  };
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?${qs.stringify(body)}`,
      { headers }
    );
    const artists = response.data.artists.items;
    const { name } = artists[Math.floor(Math.random() * artists.length)];
    console.log(name, 'bangsat');
    return name;
  } catch (e) {
    console.log(e);
  }
};

getArtist();
