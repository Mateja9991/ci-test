import { Request, Response, NextFunction } from "express";


function validateUpdateFields(allowedUpdateFields: string[]) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const updateFields = Object.keys(req.body)
            if (!updateFields.every(field => allowedUpdateFields.includes(field)))
                throw new Error('Forbidden update field.')
        } catch (err) {
            res.status(400).send(err)
        }
    }
}

export {
    validateUpdateFields
}