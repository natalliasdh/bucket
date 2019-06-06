module.exports = function(sequelize, DataTypes) {
  const BucketList = sequelize.define("BucketList", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {}
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {}
    },
    completion: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  BucketList.associate = function(models) {
    BucketList.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return BucketList;
};
