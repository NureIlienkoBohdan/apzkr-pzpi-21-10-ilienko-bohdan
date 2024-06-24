import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateLeasingDto } from './dto/create-leasing.dto';
import { UpdateLeasingDto } from './dto/update-leasing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DroneLeaseStatus,
  DroneLeaseToCompany,
} from './entities/leasing.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LeasingService {
  constructor(
    @InjectRepository(DroneLeaseToCompany)
    private leasingRepository: Repository<DroneLeaseToCompany>,
  ) {}

  create(ownerId: string, createLeasingDto: CreateLeasingDto) {
    const existingLeasingThatNotCompleted = this.leasingRepository.findOne({
      where: {
        landlord: {
          id: ownerId,
        },
        id: createLeasingDto.drone.id,
        //TODO: нужно искать запили из DroneLeaseStatus.ACTIVE или DroneLeaseStatus.PENDING
        status: DroneLeaseStatus.ACTIVE,
      },
    });

    if (existingLeasingThatNotCompleted) {
      throw new UnauthorizedException('This drone actually');
    }

    return this.leasingRepository.save({
      ...createLeasingDto,
      user: {
        id: ownerId,
      },
    });
  }

  async findAll() {
    return await this.leasingRepository.find({
      relations: ['landlord', 'drone', 'drone.droneModel'],
    });
  }

  async findByLandlordId(landlordId: string) {
    return this.leasingRepository.find({
      where: {
        landlord: {
          id: landlordId,
        },
      },
      relations: ['landlord', 'drone', 'drone.droneModel'],
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} leasing`;
  }

  async update(
    id: string,
    ownerId: string,
    updateLeasingDto: UpdateLeasingDto,
  ) {
    const leasing = await this.leasingRepository.findOne({
      where: {
        id: id,
        landlord: {
          id: ownerId,
        },
      },
    });

    if (!leasing) {
      throw new NotFoundException(
        'Leasing not found or you do not have access to it',
      );
    }

    return await this.leasingRepository.save({
      ...leasing,
      ...updateLeasingDto,
    });
  }

  async remove(id: string) {
    const leasing = await this.leasingRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!leasing) {
      throw new NotFoundException('Leasing not found');
    }

    return await this.leasingRepository.remove(leasing);
  }
}
