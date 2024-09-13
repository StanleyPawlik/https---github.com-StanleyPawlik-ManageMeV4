import express from "express";

import tasks from "./task.route";

const router = express.Router();

export default (): express.Router => {
    tasks(router)

    return router;
};