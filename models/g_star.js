const knex = require('./connection')('g_star');

async function addStar(g_p) {
    await knex.insert(g_p);
}

async function fetchOne(query) {
    let list = await knex.select().where(query);
    return list[0];
}

async function update(query, g_p) {
    await knex.update(g_p).where(query);
}

module.exports = { addStar, fetchOne, update };