import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import ICreated from '../interface/ICreated';
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

  public async create(req: Request, res: Response, next:NextFunction):
  Promise<Response | void> {
    try {
      const { name, amount } = req.body;
      const data: ICreated = await this.service.createProduct({ name, amount });
      return res.status(StatusCodes.CREATED).json(data);
    } catch (e) {
      next(e);
    }
  }
}
