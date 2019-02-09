const createFakeEntry = i => ({
    company_id: i,
    tippee_id: i,
});

exports.seed = async function(knex, Promise) {
    await knex('companiestippees').truncate();

    const desiredFakeEntries = 100;
    const fakeEntries = [];

    for (let i = 0; i < desiredFakeEntries; i++) {
        fakeEntries.push(createFakeEntry(i));
    }
};
