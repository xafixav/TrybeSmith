import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import IOrderResponse from '../interface/IOrderResponse';
import OrderService from '../service/order';

export default class OrderController {
  private service: OrderService;
  
  constructor() {
    this.service = new OrderService();
  }

  public async getAll(_req: Request, res: Response, next:NextFunction): Promise<Response | void> {
    try {
      const data: IOrderResponse[] = await this.service.getAll();
      return res.status(StatusCodes.OK).json(data);
    } catch (e) {
      next(e);
    }
  }
}
