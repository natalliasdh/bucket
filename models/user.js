module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false 
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
        User.hasMany(models.bucketList, {
            onDelete: "cascade"
        });
    };
    return User;
};