import express from "express";
import "dotenv/config";
import { conectionData } from "./database/mongo";
import {router} from "./routes";

const server = express();

void conectionData();

server.use(express.json());
server.use(router);

export { server };