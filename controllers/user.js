const path = require('path');
const fs = require('fs');

const { updateUser, checkPassword } = require('../models/user');
const { match } = require('../services/validator');
const upload = require('../services/upload');

async function getDetail(ctx) {
    let { username, email, nickname } = ctx.state.user;
    ctx.body = { username, email, nickname };
}

async function update(ctx) {
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

async function changePwd(ctx) {
    let { username, password } = ctx.state.user;
    let { newpassword, oldpassword } = ctx.request.body;
    if (!await checkPassword(password, oldpassword)) {
        ctx.body = { status: false, err: "旧密码错误" };
    } else {
        ctx.body = { state: true };
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

const avatarPath = path.join(__dirname, '../public/images/avatars');

async function uploadAvatar(ctx, next) {
    let { avatar } = ctx.state.user;
    if (avatar === 'default.jpg') {
        avatar = `${Date.now()}`;
    } else {
        avatar = avatar.split('.')[0];
    }
    await upload(avatarPath, avatar)(ctx, next);
}

async function saveName(ctx) {
    if (!ctx.req.file) {
        ctx.body = { status: false, err: '上传失败' };
    } else {
        ctx.body = { status: true };
    }

    let { username, avatar } = ctx.state.user;
    let { filename } = ctx.req.file;
    if (avatar !== filename) {
        if (avatar.split('.')[1] !== filename.split('.')[1]) {
            await Promise.all([fs.promises.unlink(path.join(avatarPath, avatar)), 
                            updateUser({username, avatar: filename})]);
        } else {
            await updateUser({ username, avatar: filename });
        }
    }
}

async function getAvatar(ctx) {
    let { avatar } = ctx.state.user;
    let stream = fs.createReadStream(path.join(avatarPath, avatar));
    ctx.set('Content-type', 'image/*');
    ctx.body = stream;
}

module.exports = {
    update,
    changePwd,
    uploadAvatar,
    saveName,
    getDetail,
    getAvatar,
}