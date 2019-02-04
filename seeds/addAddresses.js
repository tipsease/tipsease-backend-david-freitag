const faker = require('faker')
const random = require('../helpers/random')

const createFakeAddress = i => ({
    street_address: faker.address.streetAddress(),
    zip_code: faker.address.zipCode(),
    country: faker.address.country(),
    building_number: 
})