import { Request, Response, NextFunction } from 'express'
import { Task, User } from '../models'
import mongoose, { Document } from 'mongoose'


async function addTask(req: Request, res: Response, next: NextFunction) {
    try {
        const { query, body } = req
        const newTask = new Task({
            ...body,
            ownerId: req.user._id
        })
        await newTask.save()
        res.send(newTask)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

async function getAllTasks(req: Request, res: Response, next: NextFunction) {
    try {
        const { query, body } = req
        const tasks = await Task.find({ ...query })
        res.send(tasks)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
        // setImmediate
    }
}

async function getMyTasks(req: Request & { user: User }, res: Response, next: NextFunction) {
    try {
        const { query, body, user } = req
        await user.populate('tasks')
        res.send(user.tasks)
        // res.send(tasks)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

async function getTask(req: Request, res: Response, next: NextFunction) {
    try {
        const { query, body, params: { id } } = req
        const task = await Task.findById(id)
        res.send(task)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

async function updateTask(req: Request, res: Response, next: NextFunction) {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['completed', 'description']
        if (!updates.every(update => allowedUpdates.includes(update)))
            throw new Error('Updating forbidden entry')
        const { query, body, params: { id } } = req
        const task = await Task.findById(new mongoose.Types.ObjectId(id))
        if (task)
            updates.forEach(key => {
                task[key] = body[key]
            })
        res.send(task)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}
async function deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {

        const { query, body, params: { id } } = req
        const task = await Task.findById(new mongoose.Types.ObjectId(id))
        if (task)
            task.delete()
        res.send(task)
        console.log(err)
        res.status(400).send(err)
    }
}

export {
    addTask,
    getMyTasks,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask
}