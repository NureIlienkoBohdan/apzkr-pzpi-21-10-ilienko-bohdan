import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DroneLog } from '../entities/drone-logs.entity';
import { CreateDroneLogDto } from './dto/create-drone-log.dto';

@Injectable()
export class DroneLogsService {
  constructor(
    @InjectRepository(DroneLog)
    private droneLogRepository: Repository<DroneLog>,
  ) {}

  async create(createDroneLogDto: CreateDroneLogDto): Promise<DroneLog> {
    const droneLog = this.droneLogRepository.create(createDroneLogDto);
    return this.droneLogRepository.save(droneLog);
  }

  async findAll(): Promise<DroneLog[]> {
    return this.droneLogRepository.find();
  }

  async findByDroneId(droneId: string): Promise<DroneLog[]> {
    return this.droneLogRepository.find({ where: { drone: { id: droneId } } });
  }

  async findOne(id: string): Promise<DroneLog> {
    return this.droneLogRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string): Promise<void> {
    await this.droneLogRepository.delete(id);
  }
}
