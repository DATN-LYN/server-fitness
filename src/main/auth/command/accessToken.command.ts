import _ from 'lodash';

import {
  CreateAccessTokenDto,
  CreateAccessTokenResponseDto,
  LoginResponseDto,
} from '../dto';
import { User } from '@/db/entities/User';
import { Jwt } from '@/provider/jwt';

export class AccessToken {
  static SELECT_USER = ['id', 'email', 'avatar', 'createdAt', 'updatedAt'];

  static async createAccessToken(
    payload: User,
  ): Promise<CreateAccessTokenResponseDto> {
    const user = { ...payload };
    const tokenizedData: CreateAccessTokenDto = _.pick(
      user,
      AccessToken.SELECT_USER,
    );

    const accessToken = Jwt.issueAccessToken(tokenizedData);
    const refreshToken = Jwt.issueRefreshToken(tokenizedData);

    user.refreshToken = refreshToken;
    await User.update({ id: user.id }, { refreshToken });

    return { accessToken, refreshToken };
  }

  static async generateUserWithAccessToken(
    user: User,
  ): Promise<LoginResponseDto> {
    const { accessToken, refreshToken } = await AccessToken.createAccessToken(
      user,
    );

    return {
      ...user,
      accessToken,
      refreshToken,
    };
  }
}
