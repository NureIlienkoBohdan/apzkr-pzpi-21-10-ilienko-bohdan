import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDroneUsageDto } from './dto/create-drone-usage.dto';
import { UpdateDroneUsageDto } from './dto/update-drone-usage.dto';
import { User } from 'src/users/entities/user.entity';
import { Subscription } from 'src/subscriptions/entities/subscription.entity';
import { Rental } from 'src/rentals/entities/rental.entity';
import { Drone } from '../entities/drone.entity';
import { DroneUsage } from '../entities/drone-usage.entity';

@Injectable()
export class DroneUsageService {
  constructor(
    @InjectRepository(DroneUsage)
    private readonly droneUsageRepository: Repository<DroneUsage>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Drone)
    private readonly droneRepository: Repository<Drone>,
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
  ) {}

  async create(createDroneUsageDto: CreateDroneUsageDto): Promise<DroneUsage> {
    const { userId, droneId, subscriptionId, rentalId, ...rest } =
      createDroneUsageDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    const drone = await this.droneRepository.findOne({
      where: { id: droneId },
    });
    if (!drone)
      throw new NotFoundException(`Drone with ID ${droneId} not found`);

    const subscription = subscriptionId
      ? await this.subscriptionRepository.findOne({
          where: { id: subscriptionId },
        })
      : null;
    if (subscriptionId && !subscription)
      throw new NotFoundException(
        `Subscription with ID ${subscriptionId} not found`,
      );

    const rental = rentalId
      ? await this.rentalRepository.findOne({ where: { id: rentalId } })
      : null;
    if (rentalId && !rental)
      throw new NotFoundException(`Rental with ID ${rentalId} not found`);

    const droneUsage = this.droneUsageRepository.create({
      user,
      drone,
      subscription,
      rental,
      ...rest,
    });

    return this.droneUsageRepository.save(droneUsage);
  }

  async findAll(): Promise<DroneUsage[]> {
    return this.droneUsageRepository.find({
      relations: ['user', 'drone', 'subscription', 'rental'],
    });
  }

  async findOne(id: string): Promise<DroneUsage> {
    const droneUsage = await this.droneUsageRepository.findOne({
      where: { id },
      relations: ['user', 'drone', 'subscription', 'rental'],
    });
    if (!droneUsage)
      throw new NotFoundException(`Drone usage with ID ${id} not found`);
    return droneUsage;
  }

  async update(
    id: string,
    updateDroneUsageDto: UpdateDroneUsageDto,
  ): Promise<DroneUsage> {
    const droneUsage = await this.findOne(id);
    Object.assign(droneUsage, updateDroneUsageDto);
    return this.droneUsageRepository.save(droneUsage);
  }

  async remove(id: string): Promise<void> {
    const droneUsage = await this.findOne(id);
    await this.droneUsageRepository.remove(droneUsage);
  }
}
