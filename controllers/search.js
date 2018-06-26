const Model = require('../models/prototype');
const { ERR } = require('../services/types');

function search() {
    const models = {
        galaxy: new Model('galaxy'),
        comet: new Model('comet'),
        star: new Model('star'),
        planet: new Model('planet'),
        satellite: new Model('satellite')
    };
    const types = ['galaxy', 'comet', 'star', 'planet', 'satellite'];

    return async (ctx) => {
        let { query } = ctx;
        let { id } = ctx.state.user;
        const condition = `id = ${id} and name like '%${query.q}%'`;
        try {
            let list = [];
            if (query.type && Reflect.has(models, query.type)) {
                let { type } = query;
                list = await models[type].search(condition);
            } else {
                let res = await Promise.all(types.map(val => models[val].search(condition)));
                res.forEach((val, index) => {
                    val.map(one => one.category = types[index]);
                    list = [...list, ...val];
                });
            }
            ctx.body = { status: true, list };
        } catch (err) {
            ctx.body = { status: false, err: ERR.LIST_FAIL };
            throw err;
        }
    };
}

module.exports = search;