import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import IProduct from '../interface/IProduct';

export default class ProductModel {
  constructor(private connection: Pool) {}

  public async getAll(): Promise<IProduct[]> {
    const [result] = await this.connection.execute<RowDataPacket[]>(`
    SELECT * FROM Trybesmith.Products
    `);
    return result as IProduct[];
  }

  public async createProduct(data: IProduct): Promise<IProduct> {
    const { name, amount } = data;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(`
    INSERT into Trybesmith.Products(name, amount)
    VALUES (?, ?)`, [name, amount]);
    return { id: insertId, name, amount };
  }
}
