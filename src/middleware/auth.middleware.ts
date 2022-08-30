import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models'

interface AuthorizedRequest extends Request {
    user: string // or any other type
}

async function jwtAuth(req: Request, res: Response, next: NextFunction) {
    try {

        const token = (req.header('Authorization') || '').replace('Bearer ', '')
        console.log(token)
        const { _id } = jwt.verify(token, process.env.JWT_SECRET || 'nbtn')
        const user = await User.findById(_id, null, { populate: ['tasks'] })
        if (!user) {
            throw new Error('User not found(jwt')
        }
        req.user = user
        next()
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

export {
    jwtAuth,

}