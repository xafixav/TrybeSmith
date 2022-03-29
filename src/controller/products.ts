import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import IProduct from '../interface/IProduct';
import ProductService from '../service/products';

export default class ProductsController {
  private service: ProductService;
  
  constructor() {
    this.service = new ProductService();
  }

  public async getAll(_req: Request, res: Response, next:NextFunction): Promise<Response | void> {
    try {
      const data: IProduct[] = await this.service.getAll();
      return res.status(StatusCodes.OK).json(data);
    } catch (e) {
      next(e);
    }
  }
}
