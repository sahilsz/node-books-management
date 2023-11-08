import createError from "../../utils/createError";

describe("Utility Functions", () => {
  describe("createError", () => {
    it("should create an error object with the specified status and message", () => {
      const status = 404;
      const message = "Not Found!";

      const error = createError(status, message);

      expect(error).toBeInstanceOf(Error);
      expect(error.status).toBe(404);
      expect(error.message).toBe(message);
    });

    it("should create an error object with a default status of 500 if status is not provided", () => {
      const error = createError();

      expect(error).toBeInstanceOf(Error);
      expect(error.status).toBe(500);
      expect(error.message).toBe("Internal Server Error");
    });
  });
});
