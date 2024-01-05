import { type Request, type Response } from "express";
import Event from "../server/database/schemas/Event";
import { valueToken } from "./signInController";
import jwt from "jsonwebtoken";

export const deleteEventsFromEspecificDayController = async (
  req: Request,
  res: Response
) => {
  const { dayOfWeek } = req.body;
  const decodedToken = jwt.verify(valueToken, process.env.SECRET);
  if (req.body.dayOfWeek == null) {
    return res.status(400).send({
      type: "Validation Error",
      errors: [
        {
          resource: "email",
          message: "Requires day of week imput",
        },
      ],
    });
  }
  try {
    const dataDeleted = await Event.find({
      dayOfWeek,
      userId: decodedToken._id,
    });

    if(dataDeleted == null){
        return res.status(404).send(
            {
                statusCode: 404,
                error: "Not Found",
                message: "Not found",
            }
        );
    }

    void (await Event.deleteMany({ dayOfWeek, userId: decodedToken._id }));
    return res.send(dataDeleted);
  } catch {
    return res.status(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message: "Something went wrong",
    });
  }
};
