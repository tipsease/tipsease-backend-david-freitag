const faker = require('faker');

const createFakePhotoUrl = () => ({
    photo_url: faker.image.avatar(),
});

exports.seed = async function(knex, Promise) {
    await knex('photourls').truncate();

    const fakePhotoUrls = [];
    const desiredFakePhotoUrls = 100;

    for (let i = 0; i < desiredFakePhotoUrls; i++) {
        fakePhotoUrls.push(createFakePhotoUrl());
    }

    await knex('photourls').insert(fakePhotoUrls);
};
