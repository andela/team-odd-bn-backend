'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('userProfile', [{
            userId: 2,
            gender: 'male',
            birthDate: '2000-10-10',
            address: 'kigali',
            imageURL:'nop.jpg',
            department: 'IT',
            managerId: 5,
            bio: 'hooooo',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
                userId: 1,
                gender: 'male',
                birthDate: '2000-10-10',
                address: 'kigali',
                imageURL:'nop.jpg',
                department: 'IT',
                managerId: 5,
                bio: 'hooooo',
                createdAt: new Date(),
                updatedAt: new Date()
        }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('userProfile', null, {});
    }
};

