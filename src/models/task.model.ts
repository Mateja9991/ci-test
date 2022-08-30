
import { model, Schema } from "mongoose";
import { User } from "./user.model";

type TaskProps = {
    description: string;
    completed: boolean;
    ownerId: Schema.Types.ObjectId
}

type TaskType = TaskProps & Document

const taskSchema = new Schema<TaskType>({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: User
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

export const Task = model<TaskType>('Task', taskSchema)

