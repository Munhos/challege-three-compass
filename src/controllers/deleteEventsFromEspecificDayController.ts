import { type Request, type Response } from "express";
import Event from "../server/database/schemas/Event";
import { valueToken } from "./signInController";
import jwt from "jsonwebtoken";

export const deleteEventsFromEspecificDayController = async (req:Request, res:Response) => {
    const { dayOfWeek } = req.body;
    const decodedToken = jwt.verify(valueToken, process.env.SECRET);
    try {
        const dataDeleted = await Event.find({dayOfWeek, userId:decodedToken._id});
        void await Event.deleteMany({dayOfWeek, userId:decodedToken._id});
        return res.send(dataDeleted);
    } catch {
        return res.status(500).send({
            "statusCode": 500,
            "error": "Internal Server Error",
            "message": "Something went wrong"
        });
    }
};