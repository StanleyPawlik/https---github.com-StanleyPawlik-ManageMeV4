import mongoose from "mongoose";

    const taskSchema = new mongoose.Schema({
        name:{
            type: String,
            required: true
        },
        description:{
            type: String,
        },
        date:{
            type: Date,
            default: Date.now
        }
    },
    {       
        timestamps: true
    }
)

export const TaskModel = mongoose.model("Task", taskSchema);

export const getTasks = () => TaskModel.find({});

export const getTaskById = (id: string) => TaskModel.findById(id);

export const createTask = (values: Record<string, any>) => new TaskModel(values).save().then ((task) => task.toObject());

export const updateTask = (id: string, values: Record<string, any>) => TaskModel.findByIdAndUpdate(id, values);

export const deleteTask = (id: string) => TaskModel.findOneAndDelete({ _id: id });
