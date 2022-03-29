import { Request, Response } from 'express';
import IError from '../interface/IError';

export default class Error {
  public static consoleError(e: IError, _req: Request, res: Response):Response {
    const status = e.status || 500;
    const message = e.message || 'Internal server error';
    console.log(e.message);
    return res.status(status).json(message);
  }
}