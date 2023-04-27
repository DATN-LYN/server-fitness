
import { User } from '@/db/entities/User';
import { Jwt } from '@/provider/jwt';
import {
  CreateAccessTokenDto,
  CreateAccessTokenResponseDto,
  LoginResponseDto
} from '../dto';

export class AccessToken {
  static SELECT_USER = ['id', 'email'];

  static async createAccessToken(
    payload: User,
  ): Promise<CreateAccessTokenResponseDto> {
    const user = { ...payload };
    console.log(user);
    // const tokenizedData: CreateAccessTokenDto = _.pick(
    //   user,
    //   AccessToken.SELECT_USER,
    // );
    const tokenizedData : CreateAccessTokenDto= {email: user.email, id: user.id}

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
    console.log('------', user);
    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}
