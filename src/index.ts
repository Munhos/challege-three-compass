import express from "express";
import dotenv from "dotenv";

dotenv.config();
const server = express();

server.listen(process.env.PORT || 3333, () => {
    console.log(`App rodando na porta ${process.env.PORT || 3333}`)
})