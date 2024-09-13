import {Request, Response} from "express";

import { getTasks, getTaskById, createTask, updateTask, deleteTask } from "../models/task.model";

export const getAllTasks = async(req: Request, res: Response) => {
    try {
        const tasks = await getTasks();
        return res.status(200).json(tasks);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export const getOneTask = async(req: Request, res: Response) => {
    try {
        const task = await getTaskById(req.params.id);
        return res.status(200).json(task);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export const createOneTask = async(req: Request, res: Response) => {
    try {
        const task = await createTask(req.body);
        return res.status(200).json(task);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export const updateOneTask = async(req: Request, res: Response) => {
    try {
        const task = await updateTask(req.params.id, req.body);
        return res.status(200).json(task);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export const deleteOneTask = async(req: Request, res: Response) => {
    try {
        const task = await deleteTask(req.params.id);
        return res.status(200).json(task);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}