const bcrypt = require("bcrypt");
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 8
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    progress: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  User.associate = function(models) {
    User.hasMany(models.BucketList, {
      onDelete: "cascade"
    });
  };

  User.beforeCreate(function(user, options) {
    return bcrypt.hash(user.password, 10).then(function(hash) {
      user.password = hash;
    });
  });

  User.prototype.validatePw = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
