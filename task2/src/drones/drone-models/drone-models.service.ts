import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DroneModel } from '../entities/drone-model.entity';
import { Repository } from 'typeorm';
import { CreateDroneModelDto } from './dto/create-drone-model.dto';

@Injectable()
export class DroneModelsService {
  constructor(
    @InjectRepository(DroneModel)
    private droneModelsRepository: Repository<DroneModel>,
  ) {}

  async create(createDroneModelDto: CreateDroneModelDto) {
    const droneModel = this.droneModelsRepository.create(createDroneModelDto);

    return await this.droneModelsRepository.save(droneModel);
  }

  async findAll() {
    return await this.droneModelsRepository.find();
  }

  async findOne(id: string) {
    const droneModel = await this.droneModelsRepository.findOne({
      where: { id },
    });

    if (!droneModel) {
      throw new NotFoundException(`Drone model with id ${id} not found`);
    }

    return droneModel;
  }

  async update(id: string, updateDroneModelDto: CreateDroneModelDto) {
    const droneModel = await this.droneModelsRepository.preload({
      id: id,
      ...updateDroneModelDto,
    });

    if (!droneModel) {
      throw new NotFoundException(`Drone model with id ${id} not found`);
    }

    return await this.droneModelsRepository.save(droneModel);
  }

  async remove(id: string) {
    const droneModel = await this.findOne(id);

    return await this.droneModelsRepository.remove(droneModel);
  }
}
