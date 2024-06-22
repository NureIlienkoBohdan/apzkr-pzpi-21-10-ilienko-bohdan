// src/maintenances/dto/update-maintenance.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateMaintenanceDto } from './create-maintenance.dto';

export class UpdateMaintenanceDto extends PartialType(CreateMaintenanceDto) {}
