import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import UserSignIn from "../server/database/schemas/UserSignIn";
import UserSignUp from "../server/database/schemas/UserSignUp";

export const signInController = async (req: Request, res: Response) => {
    try {
        const user = await UserSignIn.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).send({
                "type": "Validation Error",
                "errors": [
                    {
                        "resource": "email",
                        "message": "Invalid email"
                    }
                ]
            });
        }

        if (user.password && typeof user.password === 'string') {
            const correctPassword = await bcrypt.compare(req.body.password, user.password);

            if (correctPassword) {
                // Busca o usuário na coleção UserSignUp para obter mais informações
                const userSignUp = await UserSignUp.findOne({ email: req.body.email });

                if (userSignUp) {
                    return res.send({
                        "firstName": userSignUp.firstName,
                        "lastName": userSignUp.lastName,
                        "email": userSignUp.email
                    });
                } else {
                    return res.status(500).send('Erro interno do servidor');
                }
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
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor');
    }
};