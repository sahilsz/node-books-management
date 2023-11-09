import bcrypt, { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../../../models/user.model.js";
import createError from "../../../utils/createError.js";
import {
  register,
  login,
  logout,
} from "../../../controllers/auth.controller.js";
import { afterEach } from "node:test";

// Mock the required dependencies
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../../models/user.model.js");
jest.mock("../../../utils/createError.js");

describe("Authentication Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        username: "testuser",
        password: "testpassword",
      },
    };

    res = {
      status: jest.fn(() => res),
      send: jest.fn(),
      cookie: jest.fn(() => res),
      clearCookie: jest.fn(() => res),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  next = jest.fn();

  describe("register", () => {
    it("should register a new user", async () => {
      //   const hashSyncMock = jest.fn();
      bcrypt.hashSync = jest.fn();

      const saveMock = jest.fn();

      User.mockReturnValue({ save: saveMock });

      await register(req, res, next);

      expect(bcrypt.hashSync).toHaveBeenCalledWith(req.body.password, 10);
      expect(saveMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith("User has been created.");
      expect(next).not.toHaveBeenCalled();
    });

    it("should handle error while registration", async () => {
      const error = new Error("Registration error!");

      bcrypt.hashSync.mockImplementation(() => {
        throw error;
      });

      await register(req, res, next);

      expect(bcrypt.hashSync).toHaveBeenCalledWith(req.body.password, 10);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("User Login", () => {
    it("should log in a user successfully", async () => {
      const user = {
        _id: "userID",
        username: "testuser",
        password: "hashedpassword",
        isSeller: false,
        _doc: {
          password: "test",
          test: "test",
        },
      };

      User.findOne.mockResolvedValue(user);
      bcrypt.compareSync.mockReturnValue(true);
      jwt.sign.mockReturnValue("test_token");

      await login(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({
        username: "testuser",
      });
      expect(bcrypt.compareSync).toHaveBeenCalledWith(
        "testpassword",
        "hashedpassword"
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: "userID", isSeller: false },
        process.env.JWT_KEY
      );
      expect(res.cookie).toHaveBeenCalledWith("accessToken", "test_token", {
        httpOnly: true,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalled();
      //   expect(next).not.toHaveBeenCalled();
    });

    it("should handle wrong password", async () => {
      const user = {
        _id: "userID",
        username: "testuser",
        password: "hashedpassword",
        isSeller: false,
        _doc: {
          password: "test",
        },
      };

      User.findOne.mockResolvedValue(user);
      bcrypt.compareSync.mockReturnValue(false);
      //   createError.mockReturnValue(new Error("Error occured"));

      await login(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
      expect(bcrypt.compareSync).toHaveBeenCalledWith(
        "testpassword",
        "hashedpassword"
      );

      expect(createError).toHaveBeenCalledWith(
        400,
        "Wrong password or username!"
      );
      expect(next).toHaveBeenCalled();

      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
      expect(res.cookie).not.toHaveBeenCalled();
    });

    it("should handle a user not found", async () => {
      User.findOne.mockResolvedValue(null);

      await login(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
      expect(createError).toHaveBeenCalledWith(404, "User not found!");
      expect(next).toHaveBeenCalled();

      expect(bcrypt.compareSync).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
      expect(res.cookie).not.toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
    });

    it("should handle error during login", async () => {
      const error = new Error("Login Error!");
      User.findOne.mockRejectedValue(error);

      await login(req, res, next);

      expect(User.findOne).toHaveBeenCalledWith({ username: "testuser" });
      expect(next).toHaveBeenCalledWith(error);

      expect(bcrypt.compareSync).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
      expect(res.cookie).not.toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
    });
  });

  describe("logout", () => {
    it("should logout a user successfully", async () => {
      await logout(req, res, next);

      expect(res.clearCookie).toHaveBeenCalledWith("accessToken", {
        sameSite: "none",
        secure: true,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith("User has been logged out!");
    });

    it("should handle any unexpected errors", async () => {
      const error = new Error("Something went Wrong!");
      res.clearCookie.mockImplementation(() => {
        throw error;
      });

      await logout(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
