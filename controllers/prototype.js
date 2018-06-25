const Model = require('../models/prototype');
const { ERR, Father, ID } = require('../services/types');

module.exports = class Controller {
    constructor(type, validate) {
        this.type = type;
        this.validate = validate;
        this.idName = ID[this.type];
        this.father = Father[this.type];
        this.model = new Model(this.type);
        this.fatherModel = new Model(this.father);
    }
    
    async getOne(ctx) {
        let one = ctx.params[this.idName];
        let { id } = ctx.state.user;
        let list, father;
        try {
            [list, father] = 
                await Promise.all([ this.model.fetch({ id, [this.idName]: one }), 
                                    this.model.getFather({ [this.idName]: one })]);
            list[0].father = father[0] ? father[0].name : '';
        } catch (err) {
            ctx.body = { status: false, err:  ERR.ONE_FAIL };
            throw err;
        }
        ctx.body = { status: true, data: list[0] }; 
    }

    async getAll(ctx) {
        let { id } = ctx.state.user;
        try {
            let list = [];
            if (Reflect.has(ctx.query, this.father)) {
                list = await this.model.getWithFather({ [ID[this.father]]: ctx.query[this.father] });
            } else {
                list = await this.model.fetch({ id });
            }
            ctx.body = { status: true, list };
        } catch (err) {
            ctx.body = { status: false, err: ERR.LIST_FAIL };
            throw err;
        }
    }

    async addOne(ctx) {
        let { id } = ctx.state.user;
        let data = ctx.request.body;
        data = this.validate(data);
        if (data) {
            let { fname, distance } = ctx.request.body;
            let [ exist, father ] = await Promise.all([this.model.fetch({ id, name: data.name }), 
                                                    this.fatherModel.fetch({ name: fname })]);
            if (exist.length) {
                ctx.body = { status: false, err: ERR.DUPLI };
            } else if (fname && !father.length) {
                ctx.body = { status: false, err: ERR.FATHER_NOT_EXIST };
            } else {
                try {
                    let nid = (await this.model.addOne({id, ...data}))[0];
                    if (fname) {
                        let fid = father[0][ID[this.father]];
                        let addRela = { [this.idName]: nid, [ID[this.father]]: fid };
                        if (this.type === 'planet' || this.type === 'satellite') {
                            addRela.distance = distance;
                        }
                        await this.model.addRelation(addRela);
                    }
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
        let data = ctx.request.body;
        let one = ctx.params[this.idName];
        data = this.validate(data);
        if (data) {
            let { fname, distance } = ctx.request.body;
            let [ exist, dupli, father, rela ] = 
                await Promise.all([this.model.fetch({id, [this.idName]: one}), 
                                    this.model.fetch({ name: data.name }),
                                    this.fatherModel.fetch({ name: fname }),
                                    this.model.getFather({ [this.idName]: one })]);
            if (!exist.length) {
                ctx.body = { status: false, err: ERR.NOT_EXIST };
            } else if (dupli.length && dupli[0][this.idName] != one) {
                ctx.body = { status: false, err: ERR.DUPLI };
            } else if (fname && !father.length) {
                ctx.body = { status: false, err: ERR.FATHER_NOT_EXIST };
            } else {
                try {
                    if (!fname) {
                        await this.model.update({ [this.idName]: one }, data);
                    } else {                        
                        let fid = father[0][ID[this.father]];
                        let updateData = { [ID[this.father]]: fid, [this.idName]: one };
                        if (this.type === 'planet' || this.type === 'satellite') {
                            updateData.distance = distance;
                        }
                        if (rela.length) {
                            await Promise.all([ this.model.update({ [this.idName]: one }, data),
                                                this.model.updateRelation({ [this.idName]: one }, updateData)]) ;
                        } else {
                            await Promise.all([ this.model.update({ [this.idName]: one }, data),
                                                this.model.addRelation(updateData)]) ;
                        }
                    }
                } catch (err) {
                    ctx.body = { status: false, err: ERR.UPDATE_FAIL };
                    throw err;
                }
                ctx.body = { status: true, data: ctx.request.body };
            }
        } else {
            ctx.body = { status: false, err: ERR.PARAM_LACK };
        }
    }

    async deleteOne(ctx) {
        let { id } = ctx.state.user;
        let one = ctx.params[this.idName];
        let target = await this.model.fetch({ id, [this.idName]: one });
        if (!target.length) {
            ctx.body = { status: false, err: ERR.NOT_EXIST };
        }
        try {
            await this.model.deleteOne({ [this.idName]: one });
        } catch (err) {
            ctx.body = { status: false, err: ERR.DELETE_FAIL };
            throw err;
        }
        ctx.body = { status: true };
    }

};    
