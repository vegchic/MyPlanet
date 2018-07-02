import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { fetchOne, checkPassword } from '../models/user';

passport.serializeUser((user, done) => {
    done(null, user.uid);
});

passport.deserializeUser(async (uid, done) => {
    let user = await fetchOne({ uid });
    done(null, user);
});

passport.use(new LocalStrategy(async (username, password, done) => {
    let user = await fetchOne({ username });
    if (!user) {
        return done('用户不存在', false);
    } else if (!await checkPassword(user.password, password)) {
        return done('密码错误', false);
    } else {
        return done(null, user);
    }
}));

export default passport;
