import { Pool, RowDataPacket } from 'mysql2/promise';
import IOrder from '../interface/IOrder';

export default class OrderModel {
  constructor(private connection: Pool) {}

  public async getAll(): Promise<IOrder[]> {
    const [result] = await this.connection.execute<RowDataPacket[]>(`
    SELECT TSO.id, TSO.userId, TSP.id as products
     FROM Trybesmith.Orders as TSO,
     Trybesmith.Products as TSP WHERE TSP.orderId = TSO.id;
    `);
    return result as IOrder[];
  }
}
