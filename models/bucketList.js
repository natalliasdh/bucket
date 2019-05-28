module.exports = function(sequelize, DataTypes) {
    const bucketList = sequelize.define("Bucketlist", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true
            }
        },
        category: {
            type: DataTypes.String,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        completion: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    bucketList.associate = function(models) {
        bucketList.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    return bucketList;
};