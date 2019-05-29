const db = require("../../models");
const bucket = require("./bucket.json");

db.sequelize.sync({ force: true }).then(function () {
    return db.Suggest.bulkCreate(bucket);
}).then(function () {
    db.sequelize.close();
});