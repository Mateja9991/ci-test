
import { Router } from "express";
import {
    addUser,
    loginUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
} from "../services/user.services";

import { validateUpdateFields, jwtAuth } from "../middleware";

export const userRouter = Router()

userRouter.post('/', addUser)
userRouter.post('/login', loginUser)
userRouter.get('/', jwtAuth, getAllUsers)
userRouter.get('/:id', jwtAuth, getUser)
userRouter.patch('/:id', jwtAuth, validateUpdateFields(['name', 'email', 'password', 'age']), updateUser)
userRouter.delete('/:id', jwtAuth, deleteUser)
