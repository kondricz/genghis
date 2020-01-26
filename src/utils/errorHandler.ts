import { Response } from 'express';

const errorHandler = (res: Response, statusCode: number, data: string): Response => {
  return res.status(statusCode).send({ data });
};

export default errorHandler;
