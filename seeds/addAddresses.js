const faker = require('faker');
const { reallyRandom } = require('../helpers/random');

const createFakeAddress = i => ({
    address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()}, ${faker.address.zipCode()}, ${faker.address.country()}, ${reallyRandom()}`,
});

exports.seed = async function(knex, Promise) {
    await knex('addresses').truncate();

    const fakeAddresses = [];
    const desiredFakeAddresses = 100;

    for (let i = 0; i < desiredFakeAddresses; i++) {
        fakeAddresses.push(createFakeAddress());
    }

    await knex('addresses').insert(fakeAddresses);
};
