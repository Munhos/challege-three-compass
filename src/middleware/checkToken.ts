import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";

export const checkToken = (req:Request, res:Response, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    try {
        if(token == null){
            return res.status(401).send(
                {
                    "statusCode": 401,
                    "error": "Unauthorized",
                    "message": "Not Authenticated"
                }
        );
        }
        
        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        next();
    } catch {
        return res.status(500).send(
            {
                "statusCode": 500,
                "error": "Internal Server Error",
                "message": "Something went wrong"
            }
        );
    }
};

