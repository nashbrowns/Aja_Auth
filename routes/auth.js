var authController = require('../controllers/authcontroller.js');
var db = require("../models");

module.exports = function (app, passport) {

    app.post('/signup', passport.authenticate('local-signup', {

        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }));

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
    }));

    app.post('/api/data/addPi', function(req, res){
        console.log(req.user.id);
        
        db.rpi.create({
            light: false,
            temp: 0,
            mac_address: req.body.mac_address,
            userId: req.user.id
        });
        res.redirect('/dashboard');
    });

}