import { SetMetadata } from '@nestjs/common';
import { Roles } from 'core/enums';

export const Role = (roles: Roles[]) => SetMetadata('role', roles);
