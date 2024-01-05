import { Request } from "jest-express/lib/request";
import Event from "../server/database/schemas/Event";
import { getEspecificEventController } from "../controllers/getEspecificEventController";

describe("getEspecificEvent | GET /events/:id", () => {
  let req, res;
  beforeEach(() => {
    req = new Request();
    res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
  });

  it("not found event", async () => {
    Event.findOne = jest.fn().mockReturnValue(null);

    await getEspecificEventController(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      statusCode: 404,
      error: "Not Found",
      message: "Not found",
    });
  });

  it("found event", async () => {
    req.setParams({ id: "ID-TESTE" });
    Event.findOne = jest.fn().mockReturnValue(req.params.id);

    await getEspecificEventController(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(req.params.id);
  });

  it("error 500", async () => {
    try {
      await getEspecificEventController(req, res);
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
