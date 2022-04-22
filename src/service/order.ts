import connection from '../models/connection';
import OrderModel from '../models/order';
import ProductModel from '../models/product';
import IOrderResponse from '../interface/IOrderResponse';
import IOrderCreated from '../interface/IOrderCreated';
import IOrderRequest from '../interface/IOrderRequest';

export default class OrderService {
  private model: OrderModel;

  private productModel: ProductModel;

  constructor() {
    this.model = new OrderModel(connection);
    this.productModel = new ProductModel(connection);
  }

  public async getAll(): Promise<IOrderResponse[]> {
    const data = await this.model.getAll();
    const result = data
      .map(async ({ id: orderId, userId }) => {
        const allProducts = await this.productModel.getById(orderId);
        const arrayOfProductIds = allProducts.map(({ id }) => id);
        return { id: orderId, userId, products: arrayOfProductIds };
      });
    const resultFinal = await Promise.all(result);
    return resultFinal as IOrderResponse[];
  }

  public async createOrder(data: IOrderRequest): Promise<IOrderCreated> {
    const { userId, products } = data;
    await this.model.create(data);
    return { order: { userId, products } };
  }
}