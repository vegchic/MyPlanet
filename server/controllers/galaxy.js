import Controller from './prototype';
import { ERR, TYPE } from '../services/types';
import { genValidator } from '../services/validator';

class Galaxy extends Controller {
    constructor(validate) {
        super(TYPE.GALAXY, validate);
    }

    async getOne(ctx) {
        let { id } = ctx.params;
        let { uid } = ctx.state.user;
        let list;
        try {
            list = await this.model.fetch({ uid, id });
            if (list.length) {
                list[0].category = this.type;
                ctx.body = { status: true, data: list[0] };
            } else {
                ctx.body = { status: false, err: ERR.NOT_EXIST };
            }
        } catch (err) {
            ctx.body = { status: false, err:  ERR.ONE_FAIL };
            throw err;
        }
    }
    
    async getAll(ctx) {
        let { uid } = ctx.state.user;
        let list;
        try {
            list = await this.model.fetch({ uid });
            list.forEach(val => {
                val.category = this.type;
            });
            ctx.body = { status: true, list };     
        } catch (err) {
            ctx.body = { status: false, err: ERR.LIST_FAIL };
            throw err;
        }
    }
    
    async addOne(ctx) {
        let { uid } = ctx.state.user;
        let data = ctx.request.body;
        data = this.validate(data);
        if (data) {
            try {
                let exist = await this.model.fetch({ uid, name: data.name });
                if (exist.length) {
                    ctx.body = { status: false, err: ERR.DUPLI };
                } else {
                    let id = (await this.model.addOne({ uid, ...data }))[0];
                    ctx.body = { status: true, data: { id, ...data } };
                }
            } catch (err) {
                ctx.body = { status: false, err: ERR.ADD_FAIL };
                throw err;
            }
        } else {
            ctx.body = { status: false, err: ERR.PARAM_LACK };
        }
    }
    
    async update(ctx) {
        let { uid } = ctx.state.user;
        let data = ctx.request.body;
        let { id } = ctx.params;
        data = this.validate(data);
        if (data) {
            let [ exist, dupli ] = await Promise.all([ this.model.fetch({ uid, id }, 'name'),
                                                        this.model.fetch({ name: data.name }, 'id') ]);
            if (!exist.length) {
                ctx.body = { status: false, err: ERR.NOT_EXIST };
            } else if (dupli.length && dupli[0].id != id) {
                ctx.body = { status: false, err: ERR.DUPLI };
            } else {
                try {
                    await this.model.update({ id }, data);
                } catch (err) {
                    ctx.body = { status: false, err: ERR.UPDATE_FAIL};
                    throw err;
                }
                ctx.body = { status: true };
            }
        } else {
            ctx.body = { status: false, err: ERR.PARAM_LACK };
        }
    }
}

export default () => new Galaxy(genValidator(['name', 'type', 'diameter'], ['image', 'feature']));
