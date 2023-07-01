import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { User } from '@/db/entities/User';
import { JwtAuthGuard } from './auth.guard';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const scopes = this._reflector.get<string>('scopes', context.getHandler());

    if (!scopes?.length) {
      throw new ForbiddenException('Permission denied');
    }
    const {
      headers: { authorization },
    } = JwtAuthGuard.getRequest(context);

    const { email } = await JwtAuthGuard.getUserRequest(authorization);
    const enouver = await User.findOne({ email });

    if (!scopes.includes(enouver?.role?.name)) {
      throw new ForbiddenException(`You don't have permission`);
    }

    return true;
  }
}
