const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const { getArtist } = require('./spotifyWrapper');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const saveArtist = async (char, name) => {
  const doc = db.collection('listAlphabet').doc(char);
  await doc.set({
    name: admin.firestore.FieldValue.arrayUnion(name),
  });
};

const checkArtist = async (char, artist) => {
  const alphabetRef = db.collection('listAlphabet').doc(char);
  const doc = await alphabetRef.get();
  const { name } = doc.data();
  if (!name.includes(char)) {
    await saveArtist(char, artist);
  } else {

  }
};

(async () => {
  const obj = await getArtist();
  // console.log(obj);
  // await checkArtist(obj.char, obj.artist);
})();
