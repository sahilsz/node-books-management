const createError = (status = 500, message) => {
  const err = new Error();

  err.status = 500;
  err.message = message || "Internal Server Error";

  return err;
};

export default createError;
