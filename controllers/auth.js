const passport = require('../services/passport');
const { fetchOne, addUser } = require('../models/user');
const match = require('../services/validator');

async function login(ctx) {
    if (ctx.isAuthenticated()) {
        ctx.body = { status: false, err: "已经登录" };
    }
    return passport.authenticate('local', (err, user) => {
        if (err) {
            ctx.body = { status: false, err };
        } else {
            ctx.login(user);
            ctx.redirect('/home');
        }
    })(ctx);
}

async function logout(ctx) {
    if (ctx.isAuthenticated()) {
        ctx.logout();
        ctx.redirect('/login');
    } else {
        ctx.status(401);
    }
}

async function register(ctx) {
    let param = ctx.request.body;
    let err = await validateUser(param);
    if (!err) {
        addUser(param);
        ctx.redirect('/login');
    } else {
        ctx.body = {status: false, err};
    }
}

async function validateUser(param) {
    let { username, password } = param;
    if (!match(username, 'username')) {
        return '用户名不合法';
    } else if (!match(password, 'password')) {
        return '密码不合法';
    } else if (await fetchOne({ username })) {
        return '用户已存在';
    }
    return null;
}

module.exports = {
    login,
    logout,
    register,
};
