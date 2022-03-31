import ILogin from '../interface/ILogin';
import IUser from '../interface/IUser';
import connection from '../models/connection';
import UserModel from '../models/user';
import TokenService from './jwt';

export default class UserService {
  private model: UserModel;

  private token: TokenService;

  constructor() {
    this.model = new UserModel(connection);
    this.token = new TokenService();
  }

  public async getAll(): Promise<IUser[]> {
    const data = await this.model.getAll();
    return data;
  }

  public async createUser(data: IUser): Promise<object> {
    const { username, password } = data;
    await this.model.createProduct(data);
    const tokenResult = this.token.generateToken({ username, password });

    return { tokenResult };
  }

  public async getUser(data: ILogin): Promise<null | object> {
    const { username, password } = data;
    const user = await this.model.getUser(username, password);
    console.log(user);
    
    if (user.length < 1) {
      return null;
    }

    const Token = this.token.generateToken({ username, password });

    return { token: Token };
  }
}