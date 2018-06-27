import { compare, hash } from 'bcrypt';
import knex from './connection';

const SaltRounds = 10;

export async function checkPassword(expected, actual) {
    return await compare(actual, expected);
}

export async function fetchOne(query) {
    let usr = await knex('user').select().where(query);
    return usr[0];
}

export async function addUser(user) {
    let { password } = user;
    user.password = await hash(password, SaltRounds);
    await knex('user').insert(user);
}

export async function updateUser(user) {
    if (Reflect.has(user, 'password')) {
        user.password = await hash(user.password, SaltRounds);
    }
    await knex('user').update(user).where('username', user.username);
}
