import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'core';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const role = this.reflector.getAllAndOverride<Roles>('role', [
      context.getHandler(),
      context.getClass(),
    ]) as Roles;
    const request = context.switchToHttp().getRequest();

    if (request?.user) {
      const user = request.user as JwtPayload;

      return user.roles.includes(role);
    }

    return false;
  }
}
