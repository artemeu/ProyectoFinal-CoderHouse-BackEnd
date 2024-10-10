import CustomRouter from "./customRouter.js";
import * as UserController from "../controllers/user.controller.js";



class UserRouter extends CustomRouter {
    init() {
        this.get('/users', [], UserController.getUsers);
        this.get('/users/:id', [], UserController.getUserById);
        this.get('/current', ['authenticated', 'admin', 'user'], UserController.currentUser);
        this.post('/register', [], UserController.register);
        this.post('/login', [], UserController.login);
        this.post('/logout', [], UserController.logoutUser);
        this.put('/forgotpass', ['authenticated', 'admin', 'user'], UserController.updatePassword);
        this.put('/users/:id', ['authenticated', 'admin', 'user'], UserController.updateUser);
        this.delete('/users/:id', ['authenticated', 'admin'], UserController.deleteUser);
    }
}

export default new UserRouter().getRouter();