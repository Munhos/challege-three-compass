/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const checkToken = (req:Request, res:Response, next) => {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];


    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
    
};