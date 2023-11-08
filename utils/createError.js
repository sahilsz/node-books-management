const createError = (status, message) => {
  const err = new Error();

  err.status = status || 500;
  err.message = message || "Internal Server Error";

  return err;
};

export default createError;
