import passport from "passport";

export const invokePassport = (strategy) => {
    return (req, res, next) => {
        try {
            passport.authenticate(strategy, { session: false }, (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.unauthorized('Credenciales incorrectas');
                }
                req.user = user;
                next();
            })(req, res, next);
        } catch (error) {
            return next(error);
        }
    };
};

export const userPassport = (strategy) => {
    return (req, res, next) => {
        passport.authenticate(strategy, { session: false }, (err, user, info) => {
            if (err) return next(err);
            if (user) req.user = user;
            next();
        })(req, res, next);
    };
};
