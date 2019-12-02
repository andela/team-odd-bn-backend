'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('userProfile', [{
            userId: 2,
            gender: null,
            birthDate: null,
            address: null,
            imageURL:null,
            department: null,
            managerId: 5,
            bio: null,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('userProfile', null, {});
    }
};

