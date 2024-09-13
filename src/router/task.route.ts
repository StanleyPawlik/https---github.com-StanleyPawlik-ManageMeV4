import express from "express";
import { getAllTasks, getOneTask, createOneTask, updateOneTask, deleteOneTask } from "../controllers/task.controller";

export default (router: express.Router) => {
    router.get('/tasks', getAllTasks);
    router.get('/tasks/:id', getOneTask);
    router.post('/tasks', createOneTask);
    router.put('/tasks/:id', updateOneTask);
    router.delete('/tasks/:id', deleteOneTask);
};