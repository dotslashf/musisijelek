const admin = require('firebase-admin');
// const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});
const db = admin.firestore();

const isArtistExist = async (char, artist) => {
  const alphabetRef = db.collection('listAlphabet').doc(char);
  const doc = await alphabetRef.get();

  if (doc.exists) {
    const charRef = db.collection('listAlphabet').doc(char);
    const doc = await charRef.get();
    const { name } = doc.data();
    if (name.includes(artist)) {
      console.log('Udah ada');
      return false;
    } else {
      await charRef.update({
        name: admin.firestore.FieldValue.arrayUnion(artist),
      });
      console.log('Saved:', artist);
      return true;
    }
  } else {
    const charRef = db.collection('listAlphabet').doc(char);
    await charRef.set({
      name: [artist],
    });
    return true;
  }
};

module.exports = {
  isArtistExist,
};
