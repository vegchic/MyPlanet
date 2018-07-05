export const ERR = {
    NOT_EXIST: '目标天体不存在',
    PARAM_LACK: '缺少参数',
    LIST_FAIL: '获取列表失败',
    ONE_FAIL: '获取信息失败',
    FATHER_NOT_EXIST: '所属天体不存在',
    DELETE_FAIL: '删除失败',
    ADD_FAIL: '添加失败',
    UPDATE_FAIL: '更新失败',
    DUPLI: '名字重复',
};

const GALAXY = 'galaxy';
const STAR = 'star';
const COMET = 'comet';
const PLANET = 'planet';
const SATELLITE = 'satellite';

export const TYPE = {
    GALAXY,
    STAR,
    COMET,
    PLANET,
    SATELLITE,
};

export const FATHER = {
    galaxy: GALAXY,
    comet: GALAXY,
    star: GALAXY,
    planet: STAR,
    satellite: PLANET,
};
