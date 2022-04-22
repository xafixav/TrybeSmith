import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import IUser from '../interface/IUser';
import UserService from '../service/user';

export default class UserController {
  private service: UserService;
  
  constructor() {
    this.service = new UserService();
  }

  public async getAll(_req: Request, res: Response, next:NextFunction): Promise<Response | void> {
    try {
      const data: IUser[] = await this.service.getAll();
      return res.status(StatusCodes.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next:NextFunction):
  Promise<Response | void> {
    try {
      const { username, classe, level, password } = req.body;
      const data: object = await this.service.createUser({ username, classe, level, password });
      return res.status(StatusCodes.CREATED).json(data);
    } catch (e) {
      next(e);
    }
  }

  public async login(req: Request, res: Response, next:NextFunction):
  Promise<Response | void> {
    try {
      const { username, password } = req.body;
      const data: object | null = await this.service.loginUser({ username, password });
      if (!data) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Username or password invalid' });
      }
      return res.status(StatusCodes.OK).json(data);
    } catch (e) {
      next(e);
    }
  }
}
