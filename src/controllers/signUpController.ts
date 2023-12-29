import { Request, Response } from "express";
import bcrypt from 'bcrypt';


import UserSignUp from "../server/database/schemas/UserSignUp";

export const signUpController = async (req:Request, res:Response) => {
    try{
        const {firstName, lastName, birthDate, city, coutry, email, password, confirmPassword} = req.body;

        if(!email){
            res.status(400).send({
                "type": "Validation Error",
                "errors": [
                    {
                    "resource": "email",
                    "message": "Requires email imput"
                    }
                ]
            })
        }
        if(await UserSignUp.findOne({email: req.body.email})){
            res.status(400).send({
                "type": "Validation Error",
                "errors": [
                    {
                    "resource": "email",
                    "message": "E-mail already registered"
                    }
                ]
            })
        }
        if(password !== confirmPassword){
            res.status(400).send({
                "type": "Validation Error",
                "errors": [
                    {
                    "resource": "email",
                    "message": "Different passwords"
                    }
                ]
            })
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        await UserSignUp.create({firstName, lastName, birthDate, city, coutry, email, passwordHash});
        res.status(201).send("User created");
    } catch(error){
        res.status(500).send({
            "statusCode": 500,
            "error": "Internal Server Error",
            "message": "Something went wrong"
        })
    }
    
    
}