import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import IUser from '../interface/IUser';

export default class UserModel {
  constructor(private connection: Pool) {}

  public async getAll(): Promise<IUser[]> {
    const [result] = await this.connection.execute<RowDataPacket[]>(`
    SELECT * FROM Trybesmith.Users
    `);
    return result as IUser[];
  }

  public async createProduct(data: IUser): Promise<IUser> {
    const { username, classe, level, password } = data;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(`
    INSERT into Trybesmith.Users(username, classe, level, password)
    VALUES (?, ?, ?, ?)`, [username, classe, level, password]);
    return { id: insertId, ...data };
  }
}
