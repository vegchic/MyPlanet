import knex from './connection';
import { FATHER } from '../services/types';

export default class Model {
    constructor(table) {
        this.table = table;
        this.father = FATHER[this.table];
        this.relation = `${this.table}_belong`;
    }

    async fetch(query, select = '*') {
        return knex(this.table).where(query).select(select);
    }

    async search(uid, like) {
        const condition = `uid = ${uid} and name like '%${like}%'`;
        return knex(this.table).whereRaw(condition);
    }

    async addOne(data) {
       return knex(this.table).insert(data);
    }

    async update(id, data) {
        return knex(this.table).where(id).update(data);
    }

    async deleteOne(id) {
        return knex(this.table).where(id).del();
    }

    async getWithRelation(id, table, select = '*') {
        return knex(this.relation).where(id).
                    innerJoin(table, `${this.relation}.${table}`, '=', `${table}.id`).select(select);
    } 

    async addRelation(data) {
        return knex(this.relation).insert(data);
    }

    async updateRelation(id, data) {
        return knex(this.relation).where(id).update(data);
    }

    async deleteRelation(id) {
        return knex(this.relation).where(id).del();
    }
}