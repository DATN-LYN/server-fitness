import { User } from '@/db/entities/User';
import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import jwt_decode from 'jwt-decode';

export interface Context {
  currentUser: any; //Later change to User type
  IPAddress: string;
  AccessToken: string;
  Platform: string;
}

export const GetContext = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const {
      req: {
        headers: { authorization, platform },
      },
    } = ctx.getContext();

    if (!authorization) {
      throw new BadRequestException('Permission denied');
    }

    const jwtDecode = jwt_decode<any>(authorization);

    const currentUser = await User.findOne(jwtDecode?.email);

    if (!currentUser) {
      throw new BadRequestException('User not found');
    }

    return {
      currentUser,
      // IPAddress: sourceIp,
      AccessToken: authorization,
      Platform: platform,
    };
  },
);
