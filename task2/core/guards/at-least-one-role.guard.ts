import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'core';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AtLeastOneRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: Roles[] = this.reflector.getAllAndOverride<Roles[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true; // Якщо ролі не задані, дозволяємо доступ
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;

    if (!user) {
      return false; // Якщо користувача немає в запиті, відмовляємо в доступі
    }

    const userRoles = user.roles;
    const hasAccess = roles.some((role) => userRoles.includes(role));

    return hasAccess;
  }
}
