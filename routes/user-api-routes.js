var db = require("../models");

module.exports = function (app) {
  app.get("/api/users/:id", function (req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.BucketList]
    }).then(function (result) {
      res.json(result);
    });
  });
  app.get("/api/users/", function (req, res) {
    db.User.findAll({
      include: [db.BucketList]
    }).then(function (result) {
      res.json(result);
    });
  });

  app.get("/api/names/:name", function (req, res) {
    db.User.findOne({
      where: {
        name: req.params.name
      }
    }).then(function (result) {
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

  app.post("/api/buckets", function (req, res) {
    console.log(req.body);
    db.BucketList.create({
      title: req.body.title,
      category: req.body.category,
      image: req.body.image,
      UserId: req.body.UserId
    }).then(function (result) {
      res.json(result);
    }).catch(function (err) {
      res.json({ error: err })
    });
  });


  app.put("/api/buckets/:id", function (req, res) {

    let upComplete = {
      completion: req.body.completion
    };

    console.log("upcomplete: ", upComplete)

    db.BucketList.update(upComplete, {
      where: { id: req.params.id }
    }).then(function () {
      res.json({ sucess: true });
    }).catch(function (err) {
      res.json({ error: err });
    });

  });



};
