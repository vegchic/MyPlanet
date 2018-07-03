import Model from '../models/prototype';
import { ERR, TYPE } from '../services/types';

export default function search() {
    const models = Object.assign(...Object.entries(TYPE).map(([k, v]) => ({[v]: new Model(v)})));
    const types = Object.values(TYPE);

    return async (ctx) => {
        let { query } = ctx;
        let { uid } = ctx.state.user;
        try {
            let list = [];
            if (query.type && Reflect.has(models, query.type)) {
                let { type } = query;
                list = await models[type].search(uid, query.q);
                list.forEach(val => {
                    val.category = type;
                });
            } else {
                let res = await Promise.all(types.map(val => models[val].search(uid, query.q)));
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
