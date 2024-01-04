/* eslint-disable @typescript-eslint/no-unused-vars */
import { signInController } from "../controllers/signInController";
import bcrypt from "bcrypt";
import UserSignUp from "../server/database/schemas/UserSignUp";
import UserSignIn from "../server/database/schemas/UserSignIn";

jest.mock("bcrypt");
jest.mock("../server/database/schemas/UserSignUp");
jest.mock("../server/database/schemas/UserSignIn");

describe("signInController", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        email: "test@test.com",
        password: "teste",
      },
    };

    res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
  });

  it("should return error if email already exists", async () => {
    UserSignIn.findOne = jest.fn().mockReturnValue(null);

    await signInController(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      type: "Validation Error",
      errors: [
        {
          resource: "email",
          message: "Invalid email",
        },
      ],
    });
  });

  it("confirm if password is false", async () => {
    bcrypt.compare = jest.fn().mockReturnValue(false);

    await signInController(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      type: "Validation Error",
      errors: [
        {
          resource: "password",
          message: "Invalid password",
        },
      ],
    });
  });

  it("return sign in", async () => {
    bcrypt.compare = jest.fn().mockReturnValue(true);
    const mockUser = {
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
    };
    UserSignUp.findOne = jest.fn().mockReturnValue(mockUser);

    await signInController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      email: mockUser.email
    });
  });
});
