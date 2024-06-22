import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Drone } from '../entities/drone.entity';
import { Not, Repository } from 'typeorm';
import { CreateDroneDto } from './dto/create-drone.dto';
import { DroneOwnerType, DroneStatus } from 'core';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { DroneLeaseToCompany } from 'src/leasing/entities/leasing.entity';

interface DroneUpdate {
  ownerId?: string;
  droneId: string;
  updateDroneDto: UpdateDroneDto;
}

@Injectable()
export class DroneService {
  constructor(
    @InjectRepository(Drone)
    private droneRepository: Repository<Drone>,
    @InjectRepository(DroneLeaseToCompany)
    private droneLeaseToCompanyRepository: Repository<DroneLeaseToCompany>,
  ) {}

  async create(createDroneDto: CreateDroneDto) {
    const drone = this.droneRepository.create({
      ...createDroneDto,
      owner: DroneOwnerType.THIRD_PARTY,
    });

    return await this.droneRepository.save(drone);
  }

  async findAll() {
    return await this.droneRepository.find({
      relations: ['droneModel'],
      where: {
        status: DroneStatus.AVAILABLE,
      },
    });
  }

  async update(droneUpdate: DroneUpdate) {
    const { ownerId, droneId, updateDroneDto } = droneUpdate;
    const drone = await this.droneRepository.findOne({
      where: {
        id: droneId,
      },
      relations: ['leases', 'leases.user'],
    });

    if (!drone) {
      throw new NotFoundException('Drone not found');
    }

    if (ownerId) {
      const droneLeases = drone.leases;
      const droneLeaseThatBelongsToUser = droneLeases.find(
        (lease) => lease.landlord.id === ownerId,
      );

      if (!droneLeaseThatBelongsToUser) {
        throw new ForbiddenException('Drone does not belong to the user');
      }

      droneLeaseThatBelongsToUser.landlord.id = ownerId;

      await this.droneLeaseToCompanyRepository.save(
        droneLeaseThatBelongsToUser,
      );
    }

    Object.assign(drone, updateDroneDto);

    return await this.droneRepository.save(drone);
  }

  async remove(id: string, force = false) {
    const drone = await this.droneRepository.findOne({
      where: {
        id,
      },
    });

    if (!drone) {
      throw new NotFoundException('Drone not found');
    }

    if (force) {
      return await this.droneRepository.remove(drone);
    }

    drone.status = DroneStatus.REMOVED;

    return await this.droneRepository.save(drone);
  }
}
