/* eslint-disable @typescript-eslint/no-unused-vars */
import Event from "../server/database/schemas/Event";
import { getAllEventsController } from "../controllers/getAllEventsController";
import jwt from "jsonwebtoken";
import { valueToken } from "../controllers/signInController";

describe("getAllEvents | GET /events", () => {
  let req, res;
  beforeEach(() => {
    res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
  });

  it("send info", async () => {
    Event.find = jest.fn().mockReturnValue({});

    await getAllEventsController(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(
      (Event.find = jest.fn().mockReturnValue({}))
    );
  });

  it("should call Event.find with correct parameters", async () => {
    const mockFind = jest.fn();
    Event.find = mockFind;
    const mockToken = "mockToken";
    jwt.verify = jest.fn().mockReturnValue({ _id: mockToken });

    await getAllEventsController(req, res);

    expect(mockFind).toHaveBeenCalledWith({ userId: mockToken });
  });

  it("should call jwt.verify with correct parameters", async () => {
    const mockVerify = jest.fn();
    jwt.verify = mockVerify;

    await getAllEventsController(req, res);

    expect(mockVerify).toHaveBeenCalledWith(valueToken, process.env.SECRET);
  });

  it("error 500", async () => {
    try {
      await getAllEventsController(req, res);
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
