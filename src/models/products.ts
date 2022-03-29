import { Pool, RowDataPacket } from 'mysql2/promise';
import IProduct from '../interface/IProduct';

export default class ProductModel {
  constructor(private connection: Pool) {}

  public async getAll(): Promise<IProduct[]> {
    const [result] = await this.connection.execute<RowDataPacket[]>(`
    SELECT * FROM Trybesmith.Products
    `);
    return result as IProduct[];
  }
}
