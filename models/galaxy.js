const knex = require('./connection')('galaxy');

async function fectchOne(query) {
    let list = await knex.select().where(query);
    return list[0];
}

async function addOne(gal) {
    await knex.insert(gal);
}

async function update(gal) {
    await knex.update(gal).where("name", gal.name);
}

module.exports = {
    fectchOne,
    addOne,
    update,
};