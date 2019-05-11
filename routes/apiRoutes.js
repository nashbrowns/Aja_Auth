var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.get("/api/data/:mac_address", function(req, res) {
    db.rpi
      .findOne({
        where: {
          // eslint-disable-next-line camelcase
          mac_address: req.params.mac_address
        }
      })
      .then(function(dbrpi) {
        res.json(dbrpi);
      });
  });

  app.put("/api/data/light/:mac_address/:light", function(req, res) {
    lightVal = req.params.light;

    if (lightVal === "0") {
      lightVal = 0;
    } else if (lightVal === "1") {
      lightVal = 1;
    } else {
      lightVal = 0;
    }

    db.rpi.update(
      {
        light: lightVal
      },
      {
        where: {
          mac_address: req.params.mac_address
        }
      }
    ).then(function() {
      //res.json(updatePi);
      res.send(200);
    });
  });

  app.put("/api/data/temp/:mac_address/:temp", function(req, res){
   
    tempVal = parseInt(req.params.temp);

    console.log(tempVal);

    db.rpi.update({
      temp: tempVal
    },{
      where: {
        mac_address: req.params.mac_address
      }
    }).then(function(){
      res.send(200);
    });
  });

};
