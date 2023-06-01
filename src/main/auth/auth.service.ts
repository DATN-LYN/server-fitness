import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import _ from 'lodash';
import {
  ChangePasswordInputDto,
  CreateUserSocial,
  LoginResponseDto,
  RefreshTokenResponseDto,
  RegisterInputDto,
} from './dto';

import { User } from '@/db/entities/User';
import { UserCommand } from '../user/command/user.command';
import { AccessToken } from './command/accessToken.command';
// import { JwtAuthGuard } from '@/guards/auth.guard';
import { Jwt } from '@/provider/jwt';
import { PasswordUtil } from '@/provider/password';
import { getManager } from 'typeorm';

@Injectable()
export class AuthService {
  async loginGoogle(token: string): Promise<LoginResponseDto> {
    const oAuth2Client = new OAuth2Client();

    const client = await oAuth2Client.verifyIdToken({
      idToken: token,
    });

    const clientUser = client.getPayload();

    const result = await AuthService.loginSocial({
      email: clientUser?.email,
      googleId: clientUser?.sub,
      avatar: clientUser?.picture,
      firstName: clientUser?.family_name,
      lastName: clientUser?.given_name,
      isVerified: clientUser?.email_verified,
    });

    return result as LoginResponseDto;
  }

  static async loginSocial(
    payload: CreateUserSocial,
  ): Promise<LoginResponseDto> {
    const existsUser = await UserCommand.findByEmail(payload?.email);

    if (!existsUser) {
      throw new NotFoundException('User not found');
    }

    existsUser.googleId = payload.googleId;
    existsUser.avatar = payload.avatar;
    await User.save(existsUser);

    return await AccessToken.generateUserWithAccessToken(existsUser);
  }

  async refreshToken(refreshToken: string): Promise<RefreshTokenResponseDto> {
    const user = await User.createQueryBuilder()
      .where({ refreshToken })
      .getOne();
    if (!user) {
      throw new BadRequestException('Invalid Refresh Toekn');
    }
    const decodedToken = null; //await JwtAuthGuard.getUserRequest(refreshToken);
    const refreshTokenExpired = new Date(decodedToken.exp * 1000);
    if (new Date() > refreshTokenExpired) {
      throw new UnauthorizedException('Refresh Token expire');
    }

    const tokenIssueData = _.pick(user, AccessToken.SELECT_USER);
    const accessToken = Jwt.issueAccessToken(tokenIssueData);

    return {
      token: accessToken,
    };
  }

  async login(email: string, password: string) {
    const user = await UserCommand.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatched = await PasswordUtil.validateHash(password, user.password);
    if (!isMatched) {
      throw new BadRequestException('Password incorrect');
    }

    return await AccessToken.generateUserWithAccessToken(user);
  }

  async register(input: RegisterInputDto) {
    const { email, password, avatar, age, fullName } = input;
    const user = await UserCommand.findByEmail(email);
    if (user) {
      throw new BadRequestException('User Exists');
    }

    const hashPassword = await PasswordUtil.generateHash(password);

    await getManager().transaction(
      async (transaction) =>
        await transaction
          .getRepository(User)
          .create({ email: email, avatar: avatar, age: age, password: hashPassword, fullName: fullName })
          .save(),
    );
    return {
      message: 'oke',
      success: true,
    };
  }

  async logout(userId: string) {
    const user = await User.findOne({ id: userId });
    if (!user) {
      throw new BadRequestException('User Not Found');
    }
    await getManager()
      .getRepository(User)
      .createQueryBuilder()
      .update()
      .set({ refreshToken: null })
      .where({ id: userId })
      .execute();

    return {
      success: true,
      message: 'sucess',
    };
  }

  async changePassword(userId: string, input: ChangePasswordInputDto) {
    const { oldPassword, newPassword } = input;
    const user = await User.findOne({ id: userId });
    if (!user) {
      throw new BadRequestException('User Not Found');
    }

    const isMatched = await PasswordUtil.validateHash(oldPassword, user.password);
    if (!isMatched) {
      throw new BadRequestException('sai roi');
    }
    return await getManager().transaction(async transaction => {
      const hashPassword = await PasswordUtil.generateHash(newPassword);
      await transaction
        .getRepository(User)
        .createQueryBuilder()
        .update()
        .set({
          password: hashPassword
        })
        .where({ id: user.id })
        .execute();

        return {
          message: 'Send Code Successfully.',
          success: true
        };
    });
  }
}
