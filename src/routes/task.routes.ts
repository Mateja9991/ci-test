
import { Router } from "express";
import {
    addTask,
    getAllTasks,
    getMyTasks,
    getTask,
    updateTask,
    deleteTask
} from "../services/task.services";

import { jwtAuth, validateUpdateFields } from "../middleware";

export const taskRouter = Router()

taskRouter.post('/', jwtAuth, addTask)
taskRouter.get('/', jwtAuth, getAllTasks)
taskRouter.get('/me', jwtAuth, getMyTasks)
taskRouter.get('/:id', jwtAuth, getTask)
taskRouter.patch('/:id', jwtAuth, validateUpdateFields(['completed', 'description']), updateTask)
taskRouter.delete('/:id', jwtAuth, deleteTask)
