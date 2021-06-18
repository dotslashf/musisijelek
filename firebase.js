const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();

const saveArtist = (name) => {
  const doc = db.collection('listAlphabet')
}

const docRef = db.collection('listAlphabet').doc('a');

(async () => {
  await docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815,
  });
})();
