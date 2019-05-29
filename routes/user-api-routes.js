var db = require("../models");

module.exports = function(app){
    app.get("/api/users/:id", function(req, res){
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Bucketlist]
        }).then(function(result){
            res.json(result);
        });
    });
}