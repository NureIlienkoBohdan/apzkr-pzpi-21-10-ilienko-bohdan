import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'core';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class ExcludeRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const role: Roles[] = this.reflector.getAllAndOverride<Roles[]>('role', [
      context.getHandler(),
      context.getClass(),
    ]) as Roles[];
    const request = context.switchToHttp().getRequest();

    if (request?.user) {
      const userRoles = (request.user as JwtPayload).roles;

      const hasAccess = userRoles.every((userRole) => !role.includes(userRole));

      return hasAccess;
    }

    return false;
  }
}
