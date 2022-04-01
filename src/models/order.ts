import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import IOrder from '../interface/IOrder';
import IOrderRequest from '../interface/IOrderRequest';

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

  public async create(data: IOrderRequest): Promise<number> {
    const { userId } = data;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(`
    INSERT into Trybesmith.Orders(userId)
    VALUES (?)
    `, [userId]);
    return insertId;
  }
}
