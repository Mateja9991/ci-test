
import mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import { User } from '../models'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'

async function loginUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { body: { email, password } } = req
        const user = await User.findByCredentials(email, password);
        if (!user) {
            throw new Error('Not authorized')
        }
        const token = await user.generateJwt()
        await user.save()
        res.send({ user, token })
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

async function addUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { query, body } = req
        const newUser = new User({
            ...body
        })
        await newUser.save()
        const token = await newUser.generateJwt()
        res.send({ user: newUser, token })
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
        const { query, body } = req
        const users = await User.find({ ...query })
        res.send(users)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

async function getUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { query, body, params: { id } } = req
        const user = await User.findById(id)
        res.send(user)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'age', 'email', 'password']
        if (!updates.every(update => allowedUpdates.includes(update)))
            throw new Error('Updating forbidden entry')
        const { query, body, params: { id } } = req
        const user = await User.findById(id)
        if (user) {
            Object.keys(body).forEach(key => {
                user[key] = body[key]
            })
            await user.save()
        }
        res.send(user)
    } catch (err) {
        console.log(err)
        res.status(400).send({ err: err })
    }
}
async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {

        const { query, body, params: { id } } = req
        const user = await User.findById(new mongoose.Types.ObjectId(id))
        if (user) {
            await user.delete()
        }
        res.send(user)
        console.log(err)
        res.status(400).send(err)
    }
}

export {
    addUser,
    loginUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}