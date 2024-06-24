import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drone } from '../entities/drone.entity';
import { CreateDroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { DroneLeaseToCompany } from 'src/leasing/entities/leasing.entity';
import { DroneOwnerType, DroneStatus, DroneUsagePlan } from 'core';
import axios from 'axios';

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

  calculatePrice(
    plan: DroneUsagePlan,
    duration: number,
    durationType: 'day' | 'week' | 'month',
  ): number {
    const basePricePerDay = 10;

    const planCoefficients = {
      [DroneUsagePlan.BASIC]: 1,
      [DroneUsagePlan.BUSINESS]: 1.25,
      [DroneUsagePlan.PREMIUM]: 1.45,
    };

    const discountRates = {
      day: 1,
      week: 0.9,
      month: 0.75,
    };

    const coefficient = planCoefficients[plan];
    const discountRate = discountRates[durationType];

    let totalPrice = basePricePerDay * duration * coefficient * discountRate;

    // Дополнительная скидка за более долгий срок
    if (durationType === 'week') {
      totalPrice *= 0.9; // дополнительная скидка 10%
    } else if (durationType === 'month') {
      totalPrice *= 0.75; // дополнительная скидка 25%
    }

    return totalPrice;
  }

  async convertCurrency(
    // amount: number,
    base: string,
    target: string,
  ): Promise<number> {
    const options = {
      method: 'GET',
      url: 'https://exchange-rate-api1.p.rapidapi.com/convert',
      params: { base, target },
      headers: {
        'X-RapidAPI-Key': '9fc976c5bemshf7e9dacfab36645p14ef8ajsn49294716680d',
        'X-RapidAPI-Host': 'exchange-rate-api1.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      return response.data.convert_result.rate;
    } catch (error) {
      console.error(error);
      throw new Error('Currency conversion failed');
    }
  }

  async findAvailable(currency: string = 'USD') {
    const drones = await this.droneRepository.find({
      relations: ['droneModel'],
      where: {
        status: DroneStatus.AVAILABLE,
      },
    });

    return Promise.all(
      drones.map(async (drone) => {
        const dailyPrice = this.calculatePrice(drone.plan, 1, 'day');
        const weeklyPrice = this.calculatePrice(drone.plan, 7, 'week');
        const monthlyPrice = this.calculatePrice(drone.plan, 30, 'month');

        const rate = await this.convertCurrency('USD', currency);

        const convertedDailyPrice = Math.round(dailyPrice * rate * 100) / 100;
        const convertedWeeklyPrice = Math.round(weeklyPrice * rate * 100) / 100;
        const convertedMonthlyPrice =
          Math.round(monthlyPrice * rate * 100) / 100;

        return {
          ...drone,
          prices: {
            daily: convertedDailyPrice,
            weekly: convertedWeeklyPrice,
            monthly: convertedMonthlyPrice,
          },
        };
      }),
    );
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
