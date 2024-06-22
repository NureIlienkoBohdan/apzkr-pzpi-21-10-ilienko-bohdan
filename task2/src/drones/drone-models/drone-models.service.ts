import { Injectable } from '@nestjs/common';
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
}
