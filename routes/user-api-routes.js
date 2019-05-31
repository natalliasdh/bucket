var db = require("../models");

module.exports = function (app) {
    app.get("/api/users/:id", function (req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            }//,
            //include: [db.Bucketlist]
        }).then(function (result) {
            res.json(result);
        });
    });
    app.get("/api/users/", function (req, res) {
        db.User.findAll({

        }).then(function (result) {
            res.json(result);
        });
    });

    app.get("/api/names/:name", function(req, res){
            db.User.findOne({
              where: {
                  name: req.params.name
              }

          }).then(function(result){
              res.json(result);
          });
     });

    app.post("/api/users", function (req, res) {
        db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            location: req.body.location
        }).then(function (result) {
            res.json(result);
        });
    });
};

