const reg = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    username: /^[a-zA-Z]\w{5,17}/,
    password: /^(\w){6,20}$/,
    nickname: /.{1,17}/,
    image: /^image\/.*$/,
};

function match(val, opt) {
    return Reflect.has(reg, opt) && reg[opt].test(val);
}

function genValidator(needed, optional) {
    return function validator(data) {
        let res = {};
        for (const prop of needed) {
            if (!data[prop])
                return false;
            else
                res[prop] = data[prop];
        }
        for (const prop of optional) {
            if (data[prop]) {
                res[prop] = data[prop];
            }
        }
        return res;
    }
}

module.exports = { match, genValidator };