const faker = require('faker');
const { getQuote } = require('inspirational-quotes');

const createFakeTippee = i => ({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    start_date: faker.date.past(),
    email: faker.internet.email(),
    tagline: getQuote().text,
    qr_url: 'random url',
    password: 'Some random hash',
    qr_id: 'randomstuff',
});

exports.seed = async function(knex, Promise) {
    await knex('tippees').truncate();

    const fakeTippees = [];
    const desiredFakeTippees = 100;

    for (let i = 0; i < desiredFakeTippees; i++) {
        fakeTippees.push(createFakeTippee(i));
    }

    // fakeTippees.push({
    //     first_name: 'Testy',
    //     last_name: 'McTesterson',
    //     start_date: faker.date.past(),
    //     email: 'testy@test.com',
    //     tagline: getQuote().text,
    //     qr_url: 'random url',
    //     passwd: '',
    // });

    await knex('tippees').insert(fakeTippees);
};
