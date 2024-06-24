// rentals.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Rental } from './entities/rental.entity';

export interface SearchRentalParams {
  id?: string;
  title?: string;
  description?: string;
  location?: string;
  landlordId?: string;
  tenantId?: string;
}

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
  ) {}

  async create(createRentalDto: CreateRentalDto): Promise<Rental> {
    const newRental = this.rentalRepository.create(createRentalDto);
    await this.rentalRepository.save(newRental);
    return newRental;
  }

  async findAll(params: SearchRentalParams = {}): Promise<Rental[]> {
    const query = this.rentalRepository.createQueryBuilder('rental');

    query.leftJoinAndSelect('rental.drone', 'drone');
    query.leftJoinAndSelect('rental.landlord', 'landlord');
    query.leftJoinAndSelect('rental.tenant', 'tenant');

    if (params.id) {
      query.andWhere('rental.id = :id', { id: params.id });
    }

    if (params.title) {
      query.andWhere('rental.title LIKE :title', {
        title: `%${params.title}%`,
      });
    }

    if (params.description) {
      query.andWhere('rental.description LIKE :description', {
        description: `%${params.description}%`,
      });
    }

    if (params.location) {
      query.andWhere('rental.location LIKE :location', {
        location: `%${params.location}%`,
      });
    }

    if (params.landlordId) {
      query.andWhere('landlord.id = :landlordId', {
        landlordId: params.landlordId,
      });
    }

    if (params.tenantId) {
      query.andWhere('tenant.id = :tenantId', { tenantId: params.tenantId });
    }

    return await query.getMany();
  }

  async findOne(id: string): Promise<Rental> {
    const rental = await this.rentalRepository.findOne({
      where: { id },
    });
    if (!rental) {
      throw new NotFoundException(`Rental with ID ${id} not found`);
    }
    return rental;
  }

  async update(id: string, updateRentalDto: UpdateRentalDto): Promise<Rental> {
    const rental = await this.rentalRepository.preload({
      id,
      ...updateRentalDto,
    });
    if (!rental) {
      throw new NotFoundException(`Rental with ID ${id} not found`);
    }
    await this.rentalRepository.save(rental);
    return rental;
  }

  async remove(id: string): Promise<string> {
    const result = await this.rentalRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Rental with ID ${id} not found`);
    }

    return `Rental with ID ${id} was successfully deleted`;
  }
}
