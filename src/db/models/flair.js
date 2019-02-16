'use strict';
module.exports = (sequelize, DataTypes) => {
    var Flair = sequelize.define('Flair', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        topicId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {});
    Flair.associate = function (models) {
        // associations can be defined here
        Flair.belongsTo(models.Topic, {
            foeignKey: "topicId",
            onDelete: "CASCADE"
        });
    };
    return Flair;
};