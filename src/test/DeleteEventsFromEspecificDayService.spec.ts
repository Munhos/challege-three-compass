import Event from "../server/database/schemas/Event";
import { deleteEventsFromEspecificDayController } from "../controllers/deleteEventsFromEspecificDayController";
import jwt from "jsonwebtoken";

describe("deleteEventsFromEspecificDay | DELETE /events", () => {
  let req, res;
  beforeEach(() => {
    req = {
      body: {
        dayOfWeek: "TEST-DAY",
      },
    };

    res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
  });

  it("decodedToken error", async () => {
    jwt.verify = jest.fn().mockReturnValue(false);

    await deleteEventsFromEspecificDayController(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({
        "statusCode": 401,
        "error": "Unauthorized",
        "message": "Not Authenticated"
    });
  });

  it("input NULL", async () => {
    req.body.dayOfWeek = null;

    await deleteEventsFromEspecificDayController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      type: "Validation Error",
      errors: [
        {
          resource: "email",
          message: "Requires day of week imput",
        },
      ],
    });
  });

  it("do not find on data base", async () => {
    Event.find = jest.fn().mockReturnValue(null);

    await deleteEventsFromEspecificDayController(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
        statusCode: 404,
        error: "Not Found",
        message: "Not found",
    });
  });

  it("error 500", async () => {
    try {
      await deleteEventsFromEspecificDayController(req, res);
    } catch (error) {
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        statusCode: 500,
        error: "Internal Server Error",
        message: "Something went wrong",
      });
    }
  });
});
