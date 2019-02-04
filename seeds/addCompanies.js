const faker = require('faker');

const createFakeCompany = i => ({
    name: faker.company.companyName(),
});

exports.seed = async function(knex, Promise) {
    await knex('companies').truncate();

    const fakeCompanies = [];
    const desiredFakeCompanies = 100;

    for (let i = 0; i < desiredFakeCompanies; i++) {
        fakeCompanies.push(createFakeCompany(i));
    }

    await knex('companies').insert(fakeCompanies);
};
