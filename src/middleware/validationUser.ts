import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import userSchema from '../schema/user';

export default class ValidationUser {
  public error;

  constructor() {
    this.error = 'Internal server error';
  }

  public validateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, classe, level, password } = req.body;

      const { error } = userSchema.validate(
        { username, classe, level, password },
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
