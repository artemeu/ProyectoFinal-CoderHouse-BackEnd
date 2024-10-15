import UserRepository from "../repositories/userRepository.js";
import CartRepository from "../repositories/cartRepository.js";
import { createHash, generadorToken, isValidPassword } from "../utils/utils.js";

const userRepository = new UserRepository();
const cartRepository = new CartRepository();

// Obtener usuarios
export const getUsers = async (req, res) => {
    try {
        const usersFound = await userRepository.getAll();
        if (usersFound.length === 0) {
            return res.notFound('No hay usuarios');
        }
        return res.success({ usersFound });
    } catch (e) {
        return res.errorServer({ message: e.message });
    }
}

// Obtener usuario por id
export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userRepository.getById(userId);
        if (user.error) {
            return res.notFound(user.error);
        }
        return res.success({ user });
    } catch (e) {
        return res.errorServer({ message: e.message });
    }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;
        const updatedUser = await userRepository.update(userId, updateData);
        if (updatedUser.error) {
            return res.notFound(updatedUser.error);
        }
        return res.success({ message: 'Usuario actualizado', user: updatedUser });
    } catch (e) {
        return res.errorServer({ message: e.message });
    }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        // Obtener el usuario para acceder a su carrito
        const user = await userRepository.getById(userId);
        if (!user) {
            return res.notFound('Usuario no encontrado');
        }
        // Si el usuario tiene un carrito, verificar si existe antes de eliminarlo
        if (user.cart) {
            const cart = await cartRepository.getById(user.cart);
            if (cart) {
                const cartDeleted = await cartRepository.delete(user.cart);
                if (!cartDeleted) {
                    return res.errorServer('Error al eliminar el carrito del usuario');
                }
            }
        }
        // Eliminar el usuario
        const deletedUser = await userRepository.deleteUser(userId);
        return res.success({ message: 'Usuario eliminado', user: deletedUser });
    } catch (e) {
        return res.errorServer({ message: e.message });
    }
};


// Logear usuario con el email y contraseña
export const login = async (req, res) => {
    try {
        const { password, email } = req.body;
        const userFound = await userRepository.getUserByEmail(email);
        if (!userFound) {
            return res.unauthorized('Usuario no encontrado');
        }
        const validPassword = isValidPassword(userFound, password);
        if (!validPassword) {
            return res.unauthorized('Credenciales incorrectas');
        }
        // Verificar si el usuario tiene un carrito válido
        let userCart = userFound.cart && await cartRepository.getById(userFound.cart);
        // Si no tiene carrito o el carrito no existe, crear uno nuevo
        if (!userCart) {
            userCart = await cartRepository.create();
            await userRepository.update(userFound.id, { cart: userCart.id });
        }
        const updatedUser = await userRepository.getById(userFound.id);
        // Genera el token JWT con los datos del usuario
        const token = generadorToken({
            id: updatedUser.id,
            email: updatedUser.email,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            rol: updatedUser.rol,
            cart: userCart.id
        });
        return res
            .cookie('currentUser', token, {
                maxAge: 24 * 60 * 60 * 1000, // 24 horas
                signed: true,
                httpOnly: true
            })
            .success({ message: 'Login exitoso', token });
    } catch (e) {
        return res.errorServer(e.message);
    }
};

// Registrar usuario
export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, age, rol, password } = req.body;
        const userFound = await userRepository.getUserByEmail(email);
        if (userFound) {
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
        const user = await userRepository.createUser(newUser);
        return res.success({ message: 'Usuario creado', user });
    } catch (e) {
        return res.errorServer({ message: `Error al registrar el usuario: ${e.message}` });
    }
};

// Actualizar contraseña del usuario
export const updatePassword = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userRepository.getUserByEmail(email);
        if (!user) return res.notFound('Usuario no encontrado');
        const hashedPassword = createHash(password);
        const updatedUser = await userRepository.update(user.id, { password: hashedPassword });
        if (!updatedUser) return res.errorServer('Error al actualizar la contraseña');
        return res.success({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
        return res.errorServer({ message: error.message });
    }
};

//Verificar usuario logeado
export const currentUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.unauthorized('Usuario no autenticado. Inicie sesión nuevamente.');
        }
        const userDTO = await userRepository.getCurrentUserById(req.user.id);
        return res.success({ user: userDTO });
    } catch (e) {
        return res.errorServer({ message: e.message });
    }
};

//Deslogear ususario
export const logoutUser = (req, res) => {
    try {
        res.clearCookie('currentUser');
        return res.success({ message: 'Logout exitoso' });
    } catch (e) {
        return res.errorServer({ message: e.message });
    }
};
