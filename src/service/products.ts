import IProduct from '../interface/IProduct';
import connection from '../models/connection';
import ProductModel from '../models/products';

export default class ProductService {
  private model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async getAll(): Promise<IProduct[]> {
    const data = await this.model.getAll();
    return data;
  }
}