const { updateUser, checkPassword, fetchOne } = require('../models/user');
const match = require('../services/validator');

async function getProfile(ctx) {
    let user = await fetchOne(ctx.state.user);
}

async function update(ctx) {
    let user = ctx.request.body;
    let err = validateUser(user);
    if (err) {

    } else {
        updateUser(user);
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

module.exports = {
    getProfile,
    update,
    changePwd,
}