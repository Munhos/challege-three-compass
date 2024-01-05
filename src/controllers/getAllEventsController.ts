import { type Request, type Response } from "express";
import Event from "../server/database/schemas/Event";
import { valueToken } from "./signInController";
import jwt from "jsonwebtoken";

export const getAllEventsController = async (req:Request, res:Response) => {
    try {
        const decodedToken = jwt.verify(valueToken, process.env.SECRET);
        res.status(200).send(await Event.find({userId : decodedToken._id}));
    } catch {
        return res.status(500).send({
            "statusCode": 500,
            "error": "Internal Server Error",
            "message": "Something went wrong"
        });
    }
};