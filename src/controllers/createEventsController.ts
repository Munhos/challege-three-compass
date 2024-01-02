/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Request, Response } from "express";
import { valueToken } from "./signInController";
import Event from "../server/database/schemas/Event";
import jwt from "jsonwebtoken";

export const createEventsController = async (req:Request, res:Response) => {
    const decodedToken = jwt.verify(valueToken, process.env.SECRET);

    try {
        const event = await Event.create(
            {
                "description":req.body.description,
                "dayOfWeek":req.body.dayOfWeek,
                "userId":decodedToken._id
            }
        );
        
        return res.status(200).send(
            event
        );
    } catch {
        return res.status(500).send({
            "statusCode": 500,
            "error": "Internal Server Error",
            "message": "Something went wrong"
        });
    }
};