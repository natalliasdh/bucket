var path = require("path");
module.exports = function (app) {
    app.get("/", function (req, res) {

        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    app.get("/index2", function (req, res) {

        res.sendFile(path.join(__dirname, "../public/index2.html"));
    });
    app.get("/profile", function (req, res) {

        res.sendFile(path.join(__dirname, "../public/profile.html"));
    });
}