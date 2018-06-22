const reg = {
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    username: /^[a-zA-Z]\w{5,17}/,
    password: /^(\w){6,20}$/,
    nickname: /.{1,17}/,
};

function match(val, opt) {
    return Reflect.has(reg, opt) && reg[opt].test(val);
}


module.exports = match;