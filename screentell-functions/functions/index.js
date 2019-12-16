const functions = require('firebase-functions');

const app = require('express')();

const { getTells, postATell } = require('./controllers/tells');
const { signUp, login, uploadImage } = require('./controllers/users');


// new version with express to get 
app.get('/tells', getTells);

// first version of quering table in the database

// exports.getTells = functions.https.onRequest((req, res) => {
//     admin.firestore().collection('tells').get().then(data => {
//         let tells = [];
//         data.forEach(doc => {
//             tells.push(doc.data());
//         });
//         return res.json(tells);
//     })
//         .catch(err => console.error(err));
// })

app.post('/tell', postATell);
// helper method to chekc if a string is empty

// user signup
app.post('/signup', signUp)
// user login
app.post('/login', login);
// image upload
app.post('./user/image', uploadImage);

// opening multiple routes for different queries
exports.api = functions.region('europe-west1').https.onRequest(app);