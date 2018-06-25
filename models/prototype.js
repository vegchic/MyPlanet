const knex = require('./connection');
const { ID, Father } = require('../services/types');

module.exports = class Model {
    constructor(table) {
        this.table = table;
        this.father = Father[this.table];
        this.id = ID[this.table];
        this.relation = `${this.table}_belong`;
    }

    /**
     * 根据query查询
     * 
     * @param {Object} query where的条件
     * @returns {Array} 
     */
    async fetch(query) {
        return knex(this.table).where(query).select();
    }

    async search(condition) {
        return knex(this.table).whereRaw(condition);
    }

    /**
     * 向表中插入数据
     *
     * @param {Object} data 需要插入的数据
     * @returns {Array}
     */
    async addOne(data) {
       return knex(this.table).insert(data);
    }

    /**
     * 更新数据
     *
     * @param {Object} id 目标的id
     * @param {Object} data 更新的数据
     * @returns {Array}
     */
    async update(id, data) {
        return knex(this.table).where(id).update(data);
    }

    /**
     * 删除某个
     *
     * @param {Object} id 目标的id
     * @returns
     */
    async deleteOne(id) {
        return knex(this.table).where(id).del();
    }

    /**
     * 根据父元素得到子元素列表
     *
     * @param {Object} query 父元素的id
     * @returns {Array}
     */
    async getWithFather(query) {
        return knex(this.relation).where(query).select().
                    innerJoin(this.table, `${this.relation}.${this.id}`, '=', `${this.table}.${this.id}`);
    }

    /**
     * 得到子元素的父亲
     *
     * @param {Object} query 子元素 id
     * @returns {Array} 
     */
    async getFather(query) {
        let prop = ID[this.father];
        return knex(this.relation).where(query).select().
                    innerJoin(this.father, `${this.relation}.${prop}`, '=', `${this.father}.${prop}`);
    }

    /**
     * 添加关系
     *
     * @param {Object} data 关系
     * @returns
     */
    async addRelation(data) {
        return knex(this.relation).insert(data);
    }

    /**
     * 更新关系
     *
     * @param {Object} query
     * @param {Object} data
     * @returns
     */
    async updateRelation(query, data) {
        return knex(this.relation).where(query).update(data);
    }
}