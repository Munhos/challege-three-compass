/* eslint-disable @typescript-eslint/no-unused-vars */
import { signUpController } from "../controllers/signUpController";
import { Request, Response } from "express";
import UserSignUp from "../server/database/schemas/UserSignUp";
import UserSignIn from "../server/database/schemas/UserSignIn";
import bcrypt from "bcrypt";

jest.mock("bcrypt");
jest.mock("../server/database/schemas/UserSignUp");
jest.mock("../server/database/schemas/UserSignIn");

describe("signUpController", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        firstName: "Test",
        lastName: "User",
        birthDate: "2000-01-01",
        city: "Test City",
        country: "Test Country",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
      },
    };

    res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };

    
  });

  it("should create a new user if validation passes", async () => {
    bcrypt.genSalt = jest.fn().mockReturnValue("salt");
    bcrypt.hash = jest.fn().mockResolvedValue("hashedPassword");
    UserSignUp.findOne = jest.fn().mockResolvedValue(null);
    UserSignIn.create = jest.fn().mockResolvedValue({});
    UserSignUp.create = jest.fn().mockResolvedValue({});

    await signUpController(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith("User created");
  });

  it("should return validation error if validation fails", async () => {
    req.body.email = "";
    await signUpController(req, res);
    expect(res.send).toHaveBeenCalledWith({
      type: "Validation Error",
      errors: [
        {
          resource: "email",
          message: "Requires email input",
        },
      ],
    });
  });

  it("should return error if email already exists", async () => {
    UserSignUp.findOne = jest.fn().mockReturnValue(null);
    await signUpController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      type: "Validation Error",
      errors: [
        {
          resource: "email",
          message: "E-mail already registered",
        },
      ],
    });
  });

  it("should return error if passwords do not match", async () => {
    req.body.confirmPassword = "differentPassword";
    await signUpController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      type: "Validation Error",
      errors: [
        {
          resource: "email",
          message: "Different passwords",
        },
      ],
    });
  });

  it("should return server error if an error is thrown", async () => {
    UserSignUp.findOne = jest.fn().mockImplementation(() => {
        throw new Error("Test error");
    });
    await signUpController(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      statusCode: 500,
      error: "Internal Server Error",
      message: "Something went wrong",
    });
  });
});
