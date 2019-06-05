var db = require("../models");
const jwt = require("jsonwebtoken");

module.exports = function(app) {
  app.post("/api/login", function(req, res) {
    db.User.findOne({
      where: {
        name: req.body.name
      }
    })
      .then(function(dbUser) {
        if (!dbUser || !dbUser.validatePw(req.body.password)) {
          return res.status(401).end("Unauthorized");
        }
        // gen JWT
        jwt.sign(
          { dbUser },
          process.env.MY_SECRET,
          { expiresIn: "24h" },
          function(err, token) {
            res.json({
              name: dbUser.name,
              id: dbUser.id,
              token
            });
          }
        );
      })
      .catch(function(err) {
        res.status(401).end();
      });
  });

  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.BucketList]
    }).then(function(result) {
      res.json(result);
    });
  });
  app.get("/api/users/", function(req, res) {
    db.User.findAll({
      include: [db.BucketList]
    }).then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/names/:name", function(req, res) {
    db.User.findOne({
      where: {
        name: req.params.name
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  // suggestions API
  app.get("/api/suggest/", function(req, res) {
    db.Suggest.findAll({}).then(function(result) {
      res.json(result);
    });
  });

  app.post("/api/users", function(req, res) {
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      location: req.body.location
    })
      .then(function(dbUser) {
        // gen JWT
        jwt.sign(
          { dbUser },
          process.env.MY_SECRET,
          { expiresIn: "24h" },
          function(err, token) {
            res.json({
              name: dbUser.name,
              id: dbUser.id,
              token
            });
          }
        );
      })
      .catch(function(err) {
        res.status(401).end();
      });
  });

  app.post("/api/buckets", verifyToken, function(req, res) {
    console.log("req.body", req.body);
    jwt.verify(req.token, process.env.MY_SECRET, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        db.BucketList.create({
          title: req.body.title,
          category: req.body.category,
          image: req.body.image,
          UserId: req.body.UserId
        })
          .then(function(result) {
            res.json(result);
          })
          .catch(function(err) {
            res.json({ error: err });
          });
      }
    });
  });

  app.put("/api/buckets/:id", function(req, res) {
    let upComplete = {
      completion: req.body.completion
    };

    console.log("upcomplete: ", upComplete);

    db.BucketList.update(upComplete, {
      where: { id: req.params.id }
    })
      .then(function() {
        res.json({ sucess: true });
      })
      .catch(function(err) {
        res.json({ error: err });
      });
  });

  app.delete("/api/deleted/:id", function(req, res) {
    db.BucketList.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });
};

// Verify Token
function verifyToken(req, res, next) {
  console.log("inside verify token", req.headers);
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  console.log(bearerHeader);
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}
