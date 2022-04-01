import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import TokenService from '../service/jwt';
import UserService from '../service/user';
import orderSchema from '../schema/order';

export default class ValidationOrder {
  public error;

  public token: TokenService;

  public user: UserService;

  constructor() {
    this.error = 'Internal server error';
    this.token = new TokenService();
    this.user = new UserService();
  }

  public validateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { products } = req.body;
      const { error } = orderSchema.validate({ products });
  
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
