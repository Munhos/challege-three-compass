/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Request, Response } from "express";
import { valueToken } from "./signInController";
import Event from "../server/database/schemas/Event";
import jwt from "jsonwebtoken";
import { createEventsValidator } from "./validator/createEventsValidator";

export const createEventsController = async (req:Request, res:Response) => {
    const decodedToken = jwt.verify(valueToken, process.env.SECRET);

    try {

        const {description, dayOfWeek} = req.body;

        const { error } = createEventsValidator.validate(
            {
                description,
                dayOfWeek
            }
        );

        if(error != null){
            return res.send(
                {
                    "type": "Validation Error",
                    "errors": [
                      {
                        "resource": "input",
                        "message": "invalid input"
                      }
                    ]
                  }
            );
        }

        const event = await Event.create(
            {
                "description":req.body.description,
                "dayOfWeek":req.body.dayOfWeek,
                "userId":decodedToken._id
            }
        );
        
        return res.status(200).send(
            {
                "_id": event._id,
                "description": event.description,
                "dayOfWeek": event.dayOfWeek,
                "userId": event.userId
            }
        );
    } catch {
        return res.status(500).send({
            "statusCode": 500,
            "error": "Internal Server Error",
            "message": "Something went wrong"
        });
    }
};