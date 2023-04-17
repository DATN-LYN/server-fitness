import jsonwebtoken from 'jsonwebtoken';
import { ObjectLiteral } from 'typeorm';

export class Jwt {
  static issueAccessToken(payload: ObjectLiteral) {
    return jsonwebtoken.sign(payload, 'secretKey', {
      expiresIn: 5 * 60,
    });
  }

  static issueRefreshToken(payload: ObjectLiteral) {
    return jsonwebtoken.sign(payload, 'refreshSecretKey', {
      expiresIn: 12 * 30 * 60 * 60,
    });
  }
}
