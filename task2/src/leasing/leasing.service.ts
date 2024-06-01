import { Injectable } from '@nestjs/common';
import { CreateLeasingDto } from './dto/create-leasing.dto';
import { UpdateLeasingDto } from './dto/update-leasing.dto';

@Injectable()
export class LeasingService {
  create(createLeasingDto: CreateLeasingDto) {
    return 'This action adds a new leasing';
  }

  findAll() {
    return `This action returns all leasing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leasing`;
  }

  update(id: number, updateLeasingDto: UpdateLeasingDto) {
    return `This action updates a #${id} leasing`;
  }

  remove(id: number) {
    return `This action removes a #${id} leasing`;
  }
}
