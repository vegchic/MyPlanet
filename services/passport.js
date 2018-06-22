const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const userModel = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    let user = await userModel.fetchOne({ id });
    done(null, user);
});

passport.use(new LocalStrategy(async (username, password, done) => {
    let user = await userModel.fetchOne({ username });
    if (!user) {
        return done('用户不存在', false);
    } else if (!await userModel.checkPassword(user.password, password)) {
        return done('密码错误', false);
    } else {
        return done(null, user);
    }
}));

module.exports = passport;
