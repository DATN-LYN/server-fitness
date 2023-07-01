import { User } from '@/db/entities/User';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import jwt_decode from 'jwt-decode';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  static getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  static async getUserRequest(authorization: string) {
    try {
      return jwt_decode<any>(authorization) || null;
    } catch (error) {
      console.log({
        error,
        func: 'getUserRequest',
      });
      throw error;
    }
  }

  async canActivate(context: ExecutionContext) {
    const {
      headers: { authorization },
    } = JwtAuthGuard.getRequest(context);
    if (!authorization) {
      throw new ForbiddenException('Permission denied');
    }

    const { email } = await JwtAuthGuard.getUserRequest(authorization);

    const currentUser = await User.findOne({ email });
    if (!currentUser) {
      throw new ForbiddenException('User not found');
    }

    return true;
  }
}
