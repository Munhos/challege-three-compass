/* eslint-disable @typescript-eslint/no-unused-vars */
import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserSignIn from "../server/database/schemas/UserSignIn";
import UserSignUp from "../server/database/schemas/UserSignUp";

export const signInController = async (req: Request, res: Response) => {
  try {
    const user = await UserSignIn.findOne({ email: req.body.email });
    
    if (user == null) {
      return res.status(404).send({
        type: "Validation Error",
        errors: [
          {
            resource: "email",
            message: "Invalid email",
          },
        ],
      });
    }

    

    const correctPassword = await bcrypt.compare(req.body.password, user?.password ?? "");
    if (correctPassword) {
      const userSignUp = await UserSignUp.findOne({ email: req.body.email });
      return res.status(200).send({
        "firstName" : userSignUp?.firstName ?? "",
        "lastName" : userSignUp?.lastName ?? "",
        "email" : userSignUp?.email ?? ""
      });
      
    } else {
      return res.status(400).send({
          "type": "Validation Error",
          "errors": [
              {
                  "resource": "password",
                  "message": "Invalid password"
              }
          ]
          });
      }

  } catch {
    return res.status(500).send({
      "statusCode": 500,
      "error": "Internal Server Error",
      "message": "Something went wrong"
    });
  }
};

