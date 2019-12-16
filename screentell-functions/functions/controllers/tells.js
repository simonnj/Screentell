const { db } = require('../util/admin');

exports.getTells = (req, res) => {
    db.firestore().collection('tells').orderBy('createdAt', 'desc').get().then(data => {
        let tells = [];
        data.forEach(doc => {
            tells.push({
                tellsId: doc.id,
                body: doc.data().body,
                userName: doc.data().userName,
                createdAt: doc.data().createdAt
                
            });
        });
        return res.json(tells);
    })
        .catch(err => console.error(err));
}
exports.postATell = (req, res) => {
    if (body.lenght > 255) {
        throw alert('Body of tells can only be up to 250 characters');
    }
    const newTell = {
        body: req.body.body,
        userName: req.body.userName,
        createdAt: new Date().toISOString() // converts date into a string 
    };
    db.firestore().collection('tells').add(newTell).then(doc => {
        res.json({ message: `document ${doc.id} tell created` });
    }).catch(err => {
        res.status(500).json({ error: 'server error creating tell' });
        console.error(err);
    });
}
