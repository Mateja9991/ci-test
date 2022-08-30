import { Router } from "express";
const router = Router()
import { taskRouter } from "./task.routes";
import { userRouter } from "./user.routes";

router.use('/tasks', taskRouter)
router.use('/users', userRouter)

export default router