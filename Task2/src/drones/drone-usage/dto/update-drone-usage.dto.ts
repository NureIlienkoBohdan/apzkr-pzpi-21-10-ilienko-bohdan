import { PartialType } from '@nestjs/swagger';
import { CreateDroneUsageDto } from './create-drone-usage.dto';

export class UpdateDroneUsageDto extends PartialType(CreateDroneUsageDto) {}
