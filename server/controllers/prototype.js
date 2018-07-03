import Model from '../models/prototype';
import { ERR, FATHER, TYPE } from '../services/types';

export default class Controller {
    constructor(type, validate) {
        this.type = type;
        this.validate = validate;
        this.father = FATHER[this.type];
        this.model = new Model(this.type);
        this.fatherModel = new Model(this.father);
    }

    async getOne(ctx) {
        let { id } = ctx.params;
        let { uid } = ctx.state.user;
        try {
            let [list, father] =
                await Promise.all([ this.model.fetch({ uid, id }),
                                    this.model.getWithRelation({ [this.type]: id }, this.father) ]);
            if (list.length) {
                if (father.length) {
                    list[0].fname = father[0].name;
                    if (this.type === TYPE.PLANET || this.type === TYPE.SATELLITE) {
                        list[0].distance = father[0].distance;
                    }
                }
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
        try {
            let list = [];
            if (Reflect.has(ctx.query, this.father)) {
                list = await this.model.getWithRelation({ [this.father]: ctx.query[this.father] }, this.type);
            } else {
                list = await this.model.fetch({ uid });
            }
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
                let { fname, distance } = ctx.request.body;
                let [ exist, father ] = await Promise.all([ this.model.fetch({ uid, name: data.name }, 'name'),
                                                            this.fatherModel.fetch({ name: fname }, 'id') ]);
                if (exist.length) {
                    ctx.body = { status: false, err: ERR.DUPLI };
                } else if (fname && !father.length) {
                    ctx.body = { status: false, err: ERR.FATHER_NOT_EXIST };
                } else {
                    let id = (await this.model.addOne({ uid, ...data }))[0];
                    if (fname) {
                        let fid = father[0].id;
                        let addRela = { [this.type]: id, [this.father]: fid };
                        if (this.type === TYPE.PLANET || this.type === TYPE.SATELLITE) {
                            addRela.distance = distance;
                        }
                        await this.model.addRelation(addRela);
                    }
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
            let { fname, distance } = ctx.request.body;
            let [ exist, dupli, father, rela ] =
                await Promise.all([ this.model.fetch({uid, id}, 'id'),
                                    this.model.fetch({ name: data.name }, 'id'),
                                    this.fatherModel.fetch({ name: fname }, 'id'),
                                    this.model.getWithRelation({ [this.type]: id }, this.father, this.type) ]);
            if (!exist.length) {
                ctx.body = { status: false, err: ERR.NOT_EXIST };
            } else if (dupli.length && dupli[0].id != id) {
                ctx.body = { status: false, err: ERR.DUPLI };
            } else if (fname && !father.length) {
                ctx.body = { status: false, err: ERR.FATHER_NOT_EXIST };
            } else {
                try {
                    if (!fname) {
                        await Promise.all([ this.model.update({ id }, data), 
                                            this.model.deleteRelation({ [this.type]: id })]); 
                    } else {
                        let fid = father[0].id;
                        let updateData = { [this.father]: fid, [this.type]: id };
                        if (this.type === TYPE.PLANET || this.type === TYPE.SATELLITE) {
                            updateData.distance = distance;
                        }
                        if (rela.length) {
                            await Promise.all([ this.model.update({ id }, data),
                                                this.model.updateRelation({ [this.type]: id }, updateData)]) ;
                        } else {
                            await Promise.all([ this.model.update({ id }, data),
                                                this.model.addRelation(updateData)]) ;
                        }
                    }
                    ctx.body = { status: true, data: ctx.request.body };
                } catch (err) {
                    ctx.body = { status: false, err: ERR.UPDATE_FAIL };
                    throw err;
                }
            }
        } else {
            ctx.body = { status: false, err: ERR.PARAM_LACK };
        }
    }

    async deleteOne(ctx) {
        let { uid } = ctx.state.user;
        let { id } = ctx.params;
        try {
            let target = await this.model.fetch({ uid, id }, 'id');
            if (!target.length) {
                ctx.body = { status: false, err: ERR.NOT_EXIST };
            } else {
                await this.model.deleteOne({ id });
                ctx.body = { status: true };
            }
        } catch (err) {
            ctx.body = { status: false, err: ERR.DELETE_FAIL };
            throw err;
        }
    }

};
