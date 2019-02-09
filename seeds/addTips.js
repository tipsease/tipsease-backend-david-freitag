const faker = require('faker');
const { random } = require('../helpers/random');

const createFakeTip = () => ({
    tippee_id: random(0, 100),
    tipper_id: random(0, 100),
    amount: faker.commerce.price(),
    date: faker.date.past(),
});

exports.seed = async function(knex, Promise) {
    await knex('tips').truncate();

    let fakeTips = [];
    const desiredFakeTips = 500;

    for (let i = 0; i < desiredFakeTips / 100; i++) {
        fakeTips = [];
        for (let j = 0; j < 100; j++) {
            fakeTips.push(createFakeTip());
        }
        await knex('tips').insert(fakeTips);
    }
};
