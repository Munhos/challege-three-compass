import { Request, Response } from "express";

export const teste01 = async (req: Request, res: Response) => {
    const dicioteste = {
        "teste1": 1,
        "teste2": 2
    }
    return res.json(dicioteste);
};
