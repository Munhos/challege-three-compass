import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import { signUpValidator } from "./validator/signUpValidator";

import UserSignUp from "../server/database/schemas/UserSignUp";
import UserSignIn from "../server/database/schemas/UserSignIn";

export const signUpController = async (req:Request, res:Response) => {
    try{
        let {firstName, lastName, birthDate, city, coutry, email, password, confirmPassword} = req.body;
        
        const { error } = signUpValidator.validate(
            {
                firstName,
                lastName,
                birthDate,
                city,
                coutry,
                email,
                password,
                confirmPassword
            }
        );

        if(error != null){
            return res.status(400).send(
                {
                    "type": "Validation Error",
                    "errors": [
                      {
                        "resource": "email",
                        "message": "Requires email imput"
                      }
                    ]
                  }
            );
        }

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if(!email){
            return res.status(400).send({
                "type": "Validation Error",
                "errors": [
                    {
                    "resource": "email",
                    "message": "Requires email imput"
                    }
                ]
            });
        }
        if((await UserSignUp.findOne({email: req.body.email})) != null){
            return res.status(400).send({
                "type": "Validation Error",
                "errors": [
                    {
                    "resource": "email",
                    "message": "E-mail already registered"
                    }
                ]
            });
        }
        if(password !== confirmPassword){
            return res.status(400).send({
                "type": "Validation Error",
                "errors": [
                    {
                    "resource": "password",
                    "message": "Different passwords"
                    }
                ]
            });
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        password = passwordHash;

        
        await UserSignIn.create({email, password});
        await UserSignUp.create({firstName, lastName, birthDate, city, coutry, email, password});
        return res.status(201).send("User created");
    } catch(error){
        return res.status(500).send({
            "statusCode": 500,
            "error": "Internal Server Error",
            "message": "Something went wrong"
        });
    }
    
    
};