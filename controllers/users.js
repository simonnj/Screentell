const { db, admin } = require('../util/admin');

const firebaseConfig = require('../util/firebaseConfig');

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const { validateSignUp, validateLogin } = require('../util/helpers');

exports.signUp = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        nickName: req.body.nickName,
    };
    // validating data
    const { valid, errors } = validateSignUp(newUser);

    if (!valid) {
        return res.status(400).json(errors);
    }    

    const defaultImage = 'no-img.png';
    
    let token;
    let userId;
    db.doc(`/users/${newUser.nickName}`).get.then((doc) => {
        if (doc.exists) {
            return res.status(400).json({ nickName: 'nickName unavailable' })
        } else {
            return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
    }).then(data => {
        userId = data.user.uid;
        return data.user.getIdToken();
    }).then(tokenId => {
        token = tokenId;
        const userinformation = {
            nickName: newUser.nickName,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            imageURL: `https://firebasestorage.googleapis.com/v0/b${firebaseConfig.storageBucket}/o/${defaultImage}?alt=media`,
            userId
        };
        db.doc(`/users/${newUser.nickName}`).set(userinformation);

    }).then(() => {
        return res.status(201).json({ token });
    }).catch(err => {
        console.log(err);
        if (err.code === 'auth/email-already-in-user') {
            return res.status(400).json({ email: 'email already registed' });
        } else {
            return res.status(500).json({ general: 'something went wrong' });
        }
    })

    // db.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).then((data) => {
    //     return res.status(201).json({ message: `user ${data.user.uid} signup success` }); // 201 = resource created
    // }).catch((err) => {
    //     console.error(err);
    //     return res.status(500).json({ error: err.code });
    // })
}

exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const { valid, errors } = validateLogin(user);

    if (!valid) {
        return res.status(400).json(errors);
    }   
    
    
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(data => {
        return data.user.getIdToken();
    }).then(token => {
        return res.json({ token });
    }).catch(err => {
        console.log(err);
        if (err.code === 'auth/wrong-password') {
            return res.status(403).json({ general: 'wrong password' });
        } else {
            return res.status(500).json({ error: err.code });
        }

    })
}
// using resources from https://github.com/mscdex/busboy
exports.uploadImage = (req, res) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs'); // filesystem

    const busboy = new BusBoy({ headers: req.headers });

    let imageFileName;
    let imageBeingUploaded = {};
    busboy.on('file', (fieldname, file, filename, encoding, mimeType) => {
        // only allow certian media files to upload
        if (memetype !== 'image/jpeg' || mimeType !== 'image/png') {
            return res.status(400).json({ error: 'only valid media is jpeg and png' });
        }

        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        imageFileName = `${Math.round(Math.random() * 100000)}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageBeingUploaded = { filepath, mimeType };
        file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on('finish', () => {
        admin.storage().bucket().upload(imageBeingUploaded.filepath, {
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageBeingUploaded.mimeType
                }
            }
        }).then(() => {
            const imageURL = `https://firebasestorage.googleapis.com/v0/b${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`
            return db.doc(`/users/${req.user.handle}`).update({ imageURL });
        }).then(() => {
            return res.json({ message: 'Image uploaded succes' });
        }).catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
    });
    busboy.end(req.rawBody);
};