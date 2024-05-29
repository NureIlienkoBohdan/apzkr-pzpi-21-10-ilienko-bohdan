import { SetMetadata } from '@nestjs/common';
import { Roles } from 'core/enums';

export const Role = (role: Roles) => SetMetadata('role', role);
