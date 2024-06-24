import { Roles } from 'core/enums';

export interface JwtPayload {
  id: string;
  roles: Roles[];
}

export interface JwtPayloadWithRefreshToken extends JwtPayload {
  refreshToken: string;
}
