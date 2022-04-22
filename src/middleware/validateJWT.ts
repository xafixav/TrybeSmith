import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import TokenService from '../service/jwt';
import UserService from '../service/user';

export default class ValidationToken {
  public error;

  public token: TokenService;

  public user: UserService;

  constructor() {
    this.error = 'Internal server error';
    this.token = new TokenService();
    this.user = new UserService();
  }

  public async validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      
      if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token not found' });
      }
      const { username, password } = this.token
        .validateToken(authorization) as { username: string, password: string };
      const user = await this.user.getUser({ username, password });
        
      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
      }
      req.body = { ...req.body, userId: user.id };
      next();
    } catch (e) {
      console.log(e);
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
    }
  }
}
