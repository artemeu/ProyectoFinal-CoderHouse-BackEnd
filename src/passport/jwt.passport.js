import passport from 'passport';
import jwt, { ExtractJwt } from 'passport-jwt';
import { getJWTCookie } from '../utils/utils.js';

const JWTStrategy = jwt.Strategy

const initializePassport = () => {
    passport.use('current', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([getJWTCookie]),
        secretOrKey: process.env.SECRET
    }, (payload, done) => {
        try {
            return done(null, payload)
        } catch (e) {
            return done(e)
        }
    }))
}

export default initializePassport;
