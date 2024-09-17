import UserManager from "../dao/mongoDB/userManager.js";
import CartManager from "../dao/mongoDB/cartManager.js";
import { createHash, generadorToken, isValidPassword } from "../utils/utils.js";

const userManager = new UserManager();
const cartManager = new CartManager();

export const getUsers = async (req, res) => {
    try {
        const usersFound = await userManager.getAllUsers();
        if (usersFound.length === 0) {
            return res.notFound('No hay usuarios');
        }
        return res.success({ usersFound });
    } catch (e) {
        return res.errorServer({ message: e.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userManager.getUserById(id);
        if (user.error) {
            return res.notFound(user.error);
        }
        return res.success({ user });
    } catch (e) {
        return res.errorServer({ message: e.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedUser = await userManager.updateUser(id, updateData);
        if (updatedUser.error) {
            return res.notFound(updatedUser.error);
        }
        return res.success({ message: 'Usuario actualizado', user: updatedUser });
    } catch (e) {
        return res.errorServer({ message: e.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await userManager.deleteUser(id);
        if (deletedUser.error) {
            return res.notFound(deletedUser.error);
        }
        return res.success({ message: 'Usuario eliminado', user: deletedUser });
    } catch (e) {
        return res.errorServer({ message: e.message });
    }
};

export const login = async (req, res) => {
    try {
        const { password, email } = req.body;
        // Verifica si el usuario existe
        const userFound = await userManager.getUserByEmail(email);
        if (!userFound) {
            return res.unauthorized('Usuario no encontrado');
        }
        // Verifica si la contraseña es válida
        const validPassword = isValidPassword(userFound, password);
        if (!validPassword) {
            return res.unauthorized('Credenciales incorrectas');
        }
        // Verificar si el usuario tiene carrito, si no, crea uno
        if (!userFound.cart) {
            const newCart = await cartManager.createCart();
            await userManager.updateUser(userFound._id, { cart: newCart._id });
            userFound.cart = newCart._id;
        }
        // Genera el token JWT con los datos del usuario
        const token = generadorToken({
            _id: userFound._id,
            email: userFound.email,
            first_name: userFound.first_name,
            last_name: userFound.last_name,
            rol: userFound.rol,
            cart: userFound.cart
        });
        return res
            .cookie('currentUser', token, {
                maxAge: 24 * 60 * 60 * 1000,
                signed: true,
                httpOnly: true
            })
            .success({ message: 'Login exitoso', token });
    } catch (e) {
        return res.errorServer({ message: e.message });
    }
};

export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, age, rol, password } = req.body;
        const userFound = await userManager.getUserByEmail(email);
        if (userFound && !userFound.error) {
            return res.conflict('Ya existe el usuario');
        }
        const newUser = {
            first_name,
            last_name,
            age,
            email,
            rol,
            password: createHash(password)
        };
        const user = await userManager.createUser(newUser);
        return res.success({ message: 'Usuario creado', user });
    } catch (e) {
        return res.errorServer({ message: `Error al registrar el usuario: ${e.message}` });
    }
};

export const updatePassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userManager.getUserByEmail(email);
        if (!user) {
            return res.notFound('Usuario no encontrado');
        }
        const hashedPassword = createHash(password);
        await userManager.updateUser(user._id, { password: hashedPassword });
        return res.success({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
        return res.errorServer({ message: error.message });
    }
};

export const currentUser = (req, res) => {
    try {
        if (!req.user) {
            return res.unauthorized('No autenticado');
        }
        return res.success({ user: req.user });
    } catch (e) {
        return res.errorServer({ message: e.message });
    }
};

export const logoutUser = (req, res) => {
    try {
        res.clearCookie('currentUser');
        return res.success({ message: 'Logout exitoso' });
    } catch (e) {
        return res.errorServer({ message: e.message });
    }
};
