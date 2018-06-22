const path = require('path');
const fs = require('fs');

const { updateUser, checkPassword, fetchOne } = require('../models/user');
const match = require('../services/validator');
const upload = require('../services/upload');

async function getProfile(ctx) {
    let user = await fetchOne(ctx.state.user);
}

async function update(ctx) {
    let detail = ctx.request.body;
    let { email, nickname } = detail;
    detail = { email, nickname };
    let err = validateUser(detail);
    if (err) {

    } else {
        let { username } = ctx.state.user;
        updateUser({ username, ...detail });
    }
}

async function changePwd(ctx) {
    let { username, password } = ctx.state.user;
    let { newpassword, oldpassword } = ctx.request.body;
    if (!await checkPassword(password, oldpassword)) {

    } else {
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
    if (avatar == 'default.jpg') {
        avatar = `${Date.now()}`;
    } else {
        avatar = avatar.split('.')[0];
    }
    await upload(avatarPath, avatar)(ctx, next);
}

async function saveName(ctx, next) {
    if (!ctx.req.file) {
        return ;
    } else {

    }

    let { username, avatar } = ctx.state.user;
    let { filename } = ctx.req.file;
    if (avatar != filename) {
        if (avatar.split('.')[1] != filename.split('.')[1]) {
            await Promise.all([fs.promises.unlink(path.join(avatarPath, avatar)), 
                            updateUser({username, avatar: filename})]);
        } else {
            await updateUser({ username, avatar: filename });
        }
    }
}

module.exports = {
    getProfile,
    update,
    changePwd,
    uploadAvatar,
    saveName,
}