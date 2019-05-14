var db = require("../models");

module.exports = function(app, passport) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("signup");
  });
  
  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/signup", function(req, res) {
    res.render('signup');
  });

  app.get("/signin", function(req, res) {
    res.render('signin');
  });

  app.get('/dashboard', isLoggedIn, function(req, res){

    let user_data = req;

    db.rpi
      .findAll({
        where: {
          UserId: req.user.id
        }
      }).then(function(dbrpi) {

        if(dbrpi[0] === undefined){
          res.render('dashboard', {username: user_data.user.email});
        }
        else{
        console.log(dbrpi[0].temp);
         let lightData = dbrpi[0].light;
         let tempData = dbrpi[0].temp;
         let macData = dbrpi[0].mac_address;
        res.render('dashboard', {username: user_data.user.email, light: lightData, temp:tempData, mac:macData });
        }
      });

  });

  app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
      res.redirect('/signup');
    })
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
    return next();   
    }
    res.redirect('/signin');
}
};
