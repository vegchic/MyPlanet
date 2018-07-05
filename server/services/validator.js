const reg = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    username: /^[a-zA-Z]\w{5,17}/,
    password: /^(\w){6,20}$/,
    nickname: /.{1,17}/,
    image: /^image\/.*$/,
};

export function match(val, opt) {
    return Reflect.has(reg, opt) && reg[opt].test(val) && !/\s/.test(val);
}

export function genValidator(needed, optional) {
    return function validator(data) {
        let res = {};
        Object.keys(data).forEach(prop => {
            if (needed.includes(prop) && data[prop]) {
                res[prop] = data[prop];
            }
        });
        if (Object.keys(res).length !== needed.length) {
            return false;
        }
        optional.forEach(prop => {
            if (!data[prop] && data[prop] !== 0) {
                Reflect.deleteProperty(data, prop);
            } else {
                res[prop] = data[prop];
            }
        });
        return res;
    };
}
