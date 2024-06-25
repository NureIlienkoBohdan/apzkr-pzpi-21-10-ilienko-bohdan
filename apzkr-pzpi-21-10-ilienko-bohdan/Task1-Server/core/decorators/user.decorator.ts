import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtPayloadWithRefreshToken } from '../interfaces/jwt-payload.interface';

export const User = createParamDecorator(
  (
    data: keyof JwtPayloadWithRefreshToken | undefined,
    context: ExecutionContext,
  ): JwtPayloadWithRefreshToken | string => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayloadWithRefreshToken;
    //TODO: Implement the logic
    if (data) return user;

    return user;
  },
);
