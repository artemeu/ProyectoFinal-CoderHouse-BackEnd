import UserManager from "../dao/mongoDB/userManager.js";
import { createHash, generadorToken, isValidPassword } from "../utils/utils.js";

const userManager = new UserManager();

export const getUsers = async (req, res) => {
    try {
        const usersFound = await userManager.getAllUsers();
        if (usersFound.length === 0) {
            return res.status(404).json({ message: 'No hay usuarios' });
        }
        return res.status(200).json({ usersFound });
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userManager.getUserById(id);
        if (user.error) {
            return res.status(404).json({ message: user.error });
        }
        return res.status(200).json({ user });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedUser = await userManager.updateUser(id, updateData);
        if (updatedUser.error) {
            return res.status(404).json({ message: updatedUser.error });
        }
        return res.status(200).json({ message: 'Usuario actualizado', user: updatedUser });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await userManager.deleteUser(id);
        if (deletedUser.error) {
            return res.status(404).json({ message: deletedUser.error });
        }
        return res.status(200).json({ message: 'Usuario eliminado', user: deletedUser });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

export const login = async (req, res) => {
    try {
        const { password, email } = req.body;
        const userFound = await userManager.getUserByEmail(email);
        if (isValidPassword(userFound, password)) {
            const token = generadorToken({
                email: userFound.email,
                first_name: userFound.first_name,
                last_name: userFound.last_name,
                rol: userFound.rol
            })
            return res.status(200).cookie('currentUser', token, {
                maxAge: 60000,
                signed: true,
                httpOnly: true
            }).json({ message: 'login OK', token })
        }
        return res.status(401).json({ message: 'Error en las credenciales' })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
};

export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, age, rol, password } = req.body;
        const userFound = await userManager.getUserByEmail(email);
        if (userFound && !userFound.error) {
            return res.status(400).json({ message: 'Ya existe el usuario' });
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
        return res.status(201).json({ message: 'Usuario creado', user });
    } catch (e) {
        console.error("Error en el registro:", e);
        return res.status(500).json({ message: `Error al registrar el usuario: ${e.message}` });
    }
};

export const currentUser = (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'No autenticado' });
        }
        return res.status(200).json({ user: req.user });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};