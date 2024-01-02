// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Request, type Response } from "express";
import Event from "../server/database/schemas/Event";

export const getEspecificEventController = async (req:Request, res:Response) => {
    const id = req.params.id;
    try {
        const info = await Event.findById(id);
        if(info == null){
            return res.status(404).send( 
                {
                    "statusCode": 404,
                    "error": "Not Found",
                    "message": "Not found"
                }
            );
            
        }

        return res.status(200).send(info);
        
    } catch {
        return res.status(500).send({
            "statusCode": 500,
            "error": "Internal Server Error",
            "message": "Something went wrong"
        });
    }
};