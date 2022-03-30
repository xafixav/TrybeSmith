import IToken from '../interface/IToken';
import IUser from '../interface/IUser';
import connection from '../models/connection';
import UserModel from '../models/user';

export default class UserService {
  private model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async getAll(): Promise<IUser[]> {
    const data = await this.model.getAll();
    return data;
  }

  public async createUser(data: IUser): Promise<IToken> {
    await this.model.createProduct(data);

    return { token: '1239909239xdavid' };
  }
}