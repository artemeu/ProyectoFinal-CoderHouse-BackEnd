import CustomRouter from "./customRouter.js";
import { currentUser, deleteUser, getUserById, getUsers, login, logoutUser, register, updatePassword, updateUser } from "../controllers/user.controller.js";
import { invokePassport, userPassport } from "../middlewares/authJWT.js";


class UserRouter extends CustomRouter {
    init() {
        this.get('/users', getUsers);
        this.get('/users/:id', getUserById);
        this.get('/current', invokePassport('current'), currentUser);
        this.post('/register', register);
        this.post('/login', login);
        this.post('/logout', logoutUser);
        this.post('/forgotpass', updatePassword);
        this.put('/users/:id', userPassport('current'), updateUser);
        this.delete('/users/:id', userPassport('current'), deleteUser);
    }
}

export default new UserRouter().getRouter();