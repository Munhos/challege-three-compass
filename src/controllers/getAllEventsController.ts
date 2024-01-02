import { type Request, type Response } from "express";
import Event from "../server/database/schemas/Event";

export const getAllEventsController = async (req:Request, res:Response) => {
    try {
        res.status(200).send(await Event.find({}));
    } catch {
        return res.status(500).send({
            "statusCode": 500,
            "error": "Internal Server Error",
            "message": "Something went wrong"
        });
    }
};