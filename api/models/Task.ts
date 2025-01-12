import mongoose, {Model} from "mongoose";
import {Task} from "../types";

type TaskModel = Model<Task>;
const Schema = mongoose.Schema;

const TaskSchema = new Schema<Task, TaskModel>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required!'],
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['new', 'in progress', 'complete'],
        default: 'new',
    },

});

const Task = mongoose.model<Task>("Task", TaskSchema);
export default Task;