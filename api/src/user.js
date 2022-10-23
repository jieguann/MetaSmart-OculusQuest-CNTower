
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({});
UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', UserSchema);
module.exports.User = User;


const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({username: username});
        await user.setPassword(password);
        await user.save();
        res.send('success');
    } catch (e) {
        res.status(500).send(e.message);
    }
}

router.post('/register', register );

router.route('/login')
    .post(passport.authenticate('local'),(req, res) => res.send('login success') )
    .get((req, res) => res.status(401).send('please login'))

router.get('/logout', (req, res) => {
    req.logout(
        (err)=> {
            if (err){ return next(err);}
        }
    );
    res.send('success');
})

module.exports.Routes = router;


