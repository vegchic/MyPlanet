import { join } from 'path';
import { createReadStream } from 'fs';
import { checkPassword, updateUser } from '../models/user';
import { match } from '../services/validator';
import upload from '../services/upload';

export async function getDetail(ctx) {
    let { username, email, nickname } = ctx.state.user;
    ctx.body = { status: true, data: { username, email, nickname }};
}

export async function update(ctx) {
    let detail = ctx.request.body;
    let { email, nickname } = detail;
    detail = { email, nickname };
    let err = validateUser(detail);
    if (err) {
        ctx.body = { status: false, err };
    } else {
        let { username } = ctx.state.user;
        let data = { username, ...detail };
        updateUser(data);
        ctx.body = { status: true, data };
    }
}

export async function changePwd(ctx) {
    let { username, password } = ctx.state.user;
    let { newpassword, oldpassword } = ctx.request.body;
    if (!await checkPassword(password, oldpassword)) {
        ctx.body = { status: false, err: "旧密码错误" };
    } else {
        ctx.body = { status: true };
        await updateUser({ username, password: newpassword });
    }
}

function validateUser(user) {
    let { nickname, email } = user;
    if (nickname && !match(nickname, 'nickname')) {
        return '昵称不合法';
    } else if (email && !match(email, 'email')) {
        return '邮箱不合法';
    }
    return null;
}

const avatarPath = join(__dirname, '../public/images/avatars');

export async function uploadAvatar(ctx, next) {
    let user = ctx.state.user;
    let flag = false;
    if (user.avatar === 'default.jpg') {
        user.avatar = `${Date.now()}`;
        flag = true;
    }
    await upload(avatarPath, user.avatar)(ctx, next);
    if (flag) {
        await updateUser({ avatar: user.avatar, username: user.username });
    }
    ctx.status = 200;
}

export async function getAvatar(ctx) {
    let { avatar } = ctx.state.user;
    let stream = createReadStream(join(avatarPath, avatar));
    ctx.set('Content-type', 'image/*');
    ctx.body = stream;
}