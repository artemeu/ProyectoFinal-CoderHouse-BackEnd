import { Router } from "express";
import passport from "passport";
import { currentUser, deleteUser, getUserById, getUsers, login, register, updateUser } from "../controllers/user.controller.js";

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/register', register);
router.post('/login', login);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/current', passport.authenticate('current', { session: false }), currentUser);

export default router;