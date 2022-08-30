import mongoose from "mongoose";
import { dbUrl } from '../constants'

mongoose.connect(dbUrl).then(res => {
    console.log('Connected to db.')
}).catch(err => {
    console.log(err)
})

