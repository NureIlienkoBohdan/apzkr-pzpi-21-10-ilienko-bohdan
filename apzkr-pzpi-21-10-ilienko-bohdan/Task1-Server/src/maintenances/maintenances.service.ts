// src/maintenances/maintenances.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { MaintenanceRecord } from './entities/maintenance.entity';
import { Drone } from 'src/drones/entities/drone.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MaintenancesService {
  constructor(
    @InjectRepository(MaintenanceRecord)
    private readonly maintenanceRepository: Repository<MaintenanceRecord>,
    @InjectRepository(Drone)
    private readonly droneRepository: Repository<Drone>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    userId: string,
    createMaintenanceDto: CreateMaintenanceDto,
  ): Promise<MaintenanceRecord> {
    const drone = await this.droneRepository.findOne({
      where: { id: createMaintenanceDto.droneId },
    });
    if (!drone) {
      throw new NotFoundException('Drone not found');
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const maintenance = this.maintenanceRepository.create({
      ...createMaintenanceDto,
      drone,
      performed_by: user,
    });

    return await this.maintenanceRepository.save(maintenance);
  }

  async findAll(): Promise<MaintenanceRecord[]> {
    return await this.maintenanceRepository.find({
      relations: ['drone', 'performed_by'],
    });
  }

  async findOne(id: string): Promise<MaintenanceRecord> {
    const maintenance = await this.maintenanceRepository.findOne({
      where: { id },
      relations: ['drone', 'performed_by'],
    });
    if (!maintenance) {
      throw new NotFoundException('Maintenance record not found');
    }
    return maintenance;
  }

  async update(
    id: string,
    updateMaintenanceDto: UpdateMaintenanceDto,
  ): Promise<MaintenanceRecord> {
    const maintenance = await this.maintenanceRepository.preload({
      id,
      ...updateMaintenanceDto,
    });
    if (!maintenance) {
      throw new NotFoundException('Maintenance record not found');
    }
    return await this.maintenanceRepository.save(maintenance);
  }

  async remove(id: string): Promise<void> {
    const maintenance = await this.findOne(id);
    await this.maintenanceRepository.softRemove(maintenance);
  }
}
