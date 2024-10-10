import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Obtener el directorio del archivo actual
const currentDir = dirname(__filename);

// Resuelve la ruta al directorio src
export const __dirname = resolve(currentDir, '..');

export const createHash = (pass) => bcrypt.hashSync(pass, bcrypt.genSaltSync(10));

export const isValidPassword = (user, pass) => {
    if (!user || !user.password) return false;
    return bcrypt.compareSync(pass, user.password);
};

export const getJWTCookie = (req) => {
    let token = null;
    if (req.signedCookies) {
        token = req.signedCookies['currentUser']
    }
    return token
};

export const generadorToken = (user) => {
    const token = jwt.sign(user, process.env.SECRET, { expiresIn: '24h' })
    return token
};