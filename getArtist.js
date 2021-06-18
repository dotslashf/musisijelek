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

const isCharEqualFirstArtistChar = (char, artists) => {
  let artistIndex = [Math.floor(Math.random() * artists.length)];
  let name = artists[artistIndex];

  if (char === name.charAt(0).toUpperCase()) {
    console.log('Selected:', name, char, artistIndex);
    return name;
  }

  console.log('Rerun:', name, char, artistIndex);
  return isCharEqualFirstArtistChar(char, artists);
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
    limit: 50,
  };
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?${qs.stringify(body)}`,
      { headers }
    );
    const artists = response.data.artists.items.map(artist => artist.name);
    const artist = isCharEqualFirstArtistChar(char, artists);

    return {
      artist,
      char,
    };
  } catch (e) {
    console.log(e);
  }
};

(async () => {
  const { artist } = await getArtist();
  console.log(artist, 'bangsat');
})();
