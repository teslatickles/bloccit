"use strict";

module.exports = {


    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn("Posts", "userId");
    }
};