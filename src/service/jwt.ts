import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import ILogin from '../interface/ILogin';

dotenv.config();

export default class TokenService {
  private secret: string;

  constructor() {
    this.secret = process.env.JWT_KEY || 'xafixavxdavid';
  }

  public generateToken(data: ILogin) {
    const token = Jwt.sign(data, this.secret, {
      expiresIn: '24h',
      algorithm: 'HS256',
    });
    return token;
  }

  public validateToken(token: string) {
    try {
      const user: string | Jwt.JwtPayload = Jwt.verify(token, this.secret);
      return user;
    } catch (e) {
      return null;
    }
  }
}
