import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import loginSchema from '../schema/login';

export default class ValidationLogin {
  public error;

  constructor() {
    this.error = 'Internal server error';
  }

  public validateLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const { error } = loginSchema.validate(
        { username, password },
        { convert: false },
      );
  
      if (error) {
        const [code, message] = error.details[0].message.split('|');
  
        return res.status(Number(code)).json({ error: message });
      }
      next();
    } catch (e) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: this.error });
    }
  }
}
