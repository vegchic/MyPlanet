const ERR = {
    NOT_EXIST: '目标天体不存在',
    PARAM_LACK: '缺少参数',
    LIST_FAIL: '获取列表失败',
    ONE_FAIL: '获取信息失败',
    FATHER_NOT_EXIST: '所属天体',
    DELETE_FAIL: '删除失败',
    ADD_FAIL: '添加失败',
    UPDATE_FAIL: '更新失败',
    DUPLI: '名字重复',
};

const Father = {
    galaxy: 'galaxy',
    comet: 'galaxy',
    star: 'galaxy',
    planet: 'star',
    satellite: 'planet'
};

const ID = {
    galaxy: 'gid',
    comet: 'cid',
    star: 'sid',
    planet: 'pid',
    satellite: 'sid',
}

module.exports = { ERR, Father, ID };