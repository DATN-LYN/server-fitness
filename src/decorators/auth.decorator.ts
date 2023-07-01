import { JwtAuthGuard } from '@/guards/auth.guard';
import { RolesGuard } from '@/guards/roles.guard';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

export function Auth(scopes?: string[]) {
  if (scopes && scopes.length > 0) {
    return applyDecorators(
      SetMetadata('scopes', scopes),
      UseGuards(JwtAuthGuard, RolesGuard),
    );
  }
  return applyDecorators(UseGuards(JwtAuthGuard));
}
