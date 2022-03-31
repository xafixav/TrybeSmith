import { ErrorRequestHandler } from 'express';

const error:ErrorRequestHandler = (err, _req, res, _next) => {
  const status = err.status || 500;

  console.log(err);
  return res.status(status).json({ error: err.message });
};

export default error;