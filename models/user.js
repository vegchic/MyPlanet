const bcrypt = require('bcrypt');
const knex = require('./connection')('user');

const SaltRounds = 10;

async function checkPassword(expected, actual) {
    return await bcrypt.compare(actual, expected);
}

async function fetchOne(query) {
    let usr = await knex.select().where(query);
    return usr[0];
}

async function addUser(user) {
    let { password } = user;
    user.password = await bcrypt.hash(password, SaltRounds);
    await knex.insert(user);
}

async function updateUser(user) {
    if (Reflect.has(user, 'password')) {
        user.password = await bcrypt.hash(user.password, SaltRounds);
    }
    await knex.update(user).where('username', user.username);
}

module.exports = {
    fetchOne,
    addUser,
    checkPassword,
    updateUser,
};
