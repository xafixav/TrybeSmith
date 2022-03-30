import ICreated from '../interface/ICreated';
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

  public async createProduct(data: IProduct): Promise<ICreated> {
    const result = await this.model.createProduct(data);
    return { item: result };
  }
}