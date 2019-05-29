module.exports = function(sequelize, DataTypes) {
    const Suggest = sequelize.define("Suggest", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        }
      
    });
   
    return Suggest;
};