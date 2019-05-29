module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
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
  return User;
};
