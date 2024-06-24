// src/support/support.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupportDto } from './dto/create-support.dto';
import { UpdateSupportDto } from './dto/update-support.dto';
import { SupportTicket } from './entities/support-ticket.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(SupportTicket)
    private readonly supportRepository: Repository<SupportTicket>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    userId: string,
    createSupportDto: CreateSupportDto,
  ): Promise<SupportTicket> {
    const supportTicket = this.supportRepository.create({
      ...createSupportDto,
      user: { id: userId },
    });

    return await this.supportRepository.save(supportTicket);
  }

  async findAll(): Promise<SupportTicket[]> {
    return await this.supportRepository.find({
      relations: ['user', 'manager'],
    });
  }

  async findOne(id: string): Promise<SupportTicket> {
    const supportTicket = await this.supportRepository.findOne({
      where: { id },
      relations: ['user', 'manager'],
    });
    if (!supportTicket) {
      throw new NotFoundException('Support ticket not found');
    }
    return supportTicket;
  }

  async updateAsAComplaint(
    id: string,
    userId: string,
    updateSupportDto: UpdateSupportDto,
  ): Promise<SupportTicket> {
    const supportTicket = await this.findOne(id);
    if (supportTicket.user.id !== userId) {
      throw new NotFoundException('Support ticket not found');
    }

    Object.assign(supportTicket, updateSupportDto);

    return await this.supportRepository.save(supportTicket);
  }

  async updateAsAManager(
    id: string,
    userId: string,
    updateSupportDto: UpdateSupportDto,
  ): Promise<SupportTicket> {
    const supportTicket = await this.findOne(id);
    if (supportTicket.manager?.id !== userId) {
      throw new NotFoundException('Support ticket not found');
    }

    Object.assign(supportTicket, updateSupportDto);

    return await this.supportRepository.save(supportTicket);
  }

  async remove(id: string): Promise<void> {
    const supportTicket = await this.findOne(id);
    await this.supportRepository.softRemove(supportTicket);
  }
}
