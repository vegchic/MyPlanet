import passport from '../services/passport';
import { fetchOne, addUser } from '../models/user';
import { match } from '../services/validator';

export async function login(ctx) {
    if (ctx.isAuthenticated()) {
        ctx.body = { status: false, err: "已经登录" };
        return;
    }
    return passport.authenticate('local', (err, user) => {
        if (err) {
            ctx.body = { status: false, err };
        } else {
            ctx.login(user);
            ctx.body = { status: true };
        }
    })(ctx);
}

export async function logout(ctx) {
    if (ctx.isAuthenticated()) {
        ctx.logout();
        ctx.body = { status: true };
    } else {
        ctx.status(401);
    }
}

export async function register(ctx) {
    let param = ctx.request.body;
    let err = await validateUser(param);
    if (!err) {
        addUser(param);
        ctx.body = { status: true, err };
    } else {
        ctx.body = { status: false, err };
    }
}

export async function validateUser(param) {
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

export async function isAuth(ctx) {
    ctx.body = { status: ctx.isAuthenticated() };
}