import { Document, model, Schema } from "mongoose";
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

type UserProps = {
    name: string;
    email: string;
    password: string;
    age: number;
    token: string;
}

type UserType = UserProps & Document;

const forbiddenPasswords = ['password', 'sifra']

const userSchema = new Schema<UserType>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value: string) {
            if (forbiddenPasswords.some(pass => value.toLowerCase().includes(pass))) {
                throw new Error('Forbidden password.')
            }
        },
        // select: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value: string) {
            if (!validator.isEmail(value)) {
                throw new Error('Incorrect email format.')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value: number) {
            if (value < 0) {
                throw new Error('Age must be positive.')
            }
        }
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
}
)

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'ownerId',
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

userSchema.methods.generateJwt = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET || 'nbtn')
    return token
}

userSchema.statics.findByCredentials = async function (email: string, password: string) {

    const user = await User.findOne({ email })
    if (!user)
        throw new Error('User with that email doesent exist.')
    if (!await bcrypt.compare(password, user.password))
        throw new Error('Incorrect Password.')
    return user
}

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.__v;

    return userObject;
};



export const User = model<UserType>('User', userSchema)

