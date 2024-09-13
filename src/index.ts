import express from "express";
import http from 'http';
import { TaskModel } from "models/task.model";
import mongoose from "mongoose";
import router from "./router/index";
import cors from 'cors';


const app = express();

const port = 3000
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

server.listen(port, () => {
    console.log('conected to MongoDB')
    console.log(`Example app listening on port ${port}`)
  })

  const MONGO_URL = 'mongodb+srv://admindb:admindb123@backenddb.mcew7.mongodb.net/'

  mongoose.Promise = Promise;
  mongoose.connect(MONGO_URL);
  mongoose.connection.on('err', (err: Error) => console.log(err))

  app.use('/', router());