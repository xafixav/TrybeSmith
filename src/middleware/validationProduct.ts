import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import schemaPostProduct from '../schema/products';

export default class ValidationProduct {
  public error;

  constructor() {
    this.error = 'Internal server error';
  }

  public validatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, amount } = req.body;
      const { error } = schemaPostProduct.validate({ name, amount });
  
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
