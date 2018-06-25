const Controller = require('./prototype');
const { ERR } = require('../services/types');
const { genValidator } = require('../services/validator');

class Galaxy extends Controller {
    constructor(validate) {
        super('galaxy', validate);
    }

    async getOne(ctx) {
        let { gid } = ctx.params;
        let { id } = ctx.state.user;
        let list;
        try {
            list = await this.model.fetch({ id, gid });
        } catch (err) {
            ctx.body = { status: false, err:  ERR.ONE_FAIL };
            throw err;
        }
        ctx.body = { status: true, data: list[0] }; 
    }
    
    async getAll(ctx) {
        let { id } = ctx.state.user;
        let list;
        try {
            list = await this.model.fetch({ id });
        } catch (err) {
            ctx.body = { status: false, err: ERR.LIST_FAIL };
            throw err;
        }
        ctx.body = { status: true, list };        
    }
    
    async addOne(ctx) {
        let { id } = ctx.state.user;
        let gal = ctx.request.body;
        gal = this.validate(gal);
        if (gal) {
            let exist = await this.model.fetch({ id, name: gal.name });
            if (exist.length) {
                ctx.body = { status: false, err: ERR.DUPLI };
            } else {
                try {
                    await this.model.addOne({id, ...gal});
                } catch (err) {
                    ctx.body = { status: false, err: ERR.ADD_FAIL };
                    throw err;
                }
                ctx.body = { status: true };
            }
        } else {
            ctx.body = { status: false, err: ERR.PARAM_LACK };
        }
    }
    
    async update(ctx) {
        let { id } = ctx.state.user;
        let gal = ctx.request.body;
        let { gid } = ctx.params;
        gal = this.validate(gal);
        if (gal) {
            let [ exist, dupli ] = 
                await Promise.all([this.model.fetch({id, gid}), this.model.fetch({ name: gal.name })]);
            if (!exist.length) {
                ctx.body = { status: false, err: ERR.NOT_EXIST };
            } else if (dupli.length && dupli[0].gid != gid) {
                ctx.body = { status: false, err: ERR.DUPLI };
            } else {
                try {
                    await this.model.update({ gid }, gal);
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

module.exports = new Galaxy(genValidator(['name', 'type', 'diameter'], ['image']));
