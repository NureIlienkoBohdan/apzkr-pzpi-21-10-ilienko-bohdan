import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobOpening } from './entities/job-opening.entity';
import { Repository } from 'typeorm';
import {
  ApplicantType,
  CollaborationApplication,
} from './entities/collaboration-application.entity';
import { CreateJobOpeningDto } from './dto/create-job-opening.dto';
import { UpdateJobOpeningDto } from './dto/update-job-opening.dto';

interface SearchJobOpeningParams {
  id?: string;
  title?: string;
  description?: string;
  location?: string;
}

@Injectable()
export class CollaborationsService {
  constructor(
    @InjectRepository(JobOpening)
    private readonly jobOpeningRepository: Repository<JobOpening>,
    @InjectRepository(CollaborationApplication)
    private readonly collaborationApplicationRepository: Repository<CollaborationApplication>,
  ) {}

  //Function to create a new job opening
  async createJobOpening(jobOpening: CreateJobOpeningDto): Promise<JobOpening> {
    return this.jobOpeningRepository.save(jobOpening);
  }

  //Function to get all job openings with optional search parameters
  async getJobOpeningsWithParams(
    params: SearchJobOpeningParams = {},
  ): Promise<JobOpening[]> {
    return this.jobOpeningRepository.find(
      Object.keys(params).length ? { where: params } : {},
    );
  }

  //TODO: реализовать выборочное получение юзеров и апликейшенов
  //Function to get a job opening by id
  async getJobOpeningById(id: string): Promise<JobOpening> {
    return this.jobOpeningRepository.findOne({
      where: { id },
      relations: [
        'collaborationApplications',
        'collaborationApplications.user',
      ],
    });
  }

  async getJobOpeningApplicationsById(
    id: string,
  ): Promise<CollaborationApplication[]> {
    return this.collaborationApplicationRepository.find({
      where: { jobOpening: { id } },
      relations: ['user'],
    });
  }

  //Function to update a job opening by id
  async updateJobOpening(
    id: string,
    updateJobOpeningDto: UpdateJobOpeningDto,
  ): Promise<JobOpening> {
    await this.jobOpeningRepository.update(id, updateJobOpeningDto);
    return this.jobOpeningRepository.findOne({
      where: { id },
    });
  }

  //Function to delete a job opening by id
  async deleteJobOpening(id: string): Promise<{ message: string }> {
    const removeResult = await this.jobOpeningRepository.delete(id);
    if (!removeResult.affected) {
      throw new NotFoundException(`Job opening with id ${id} not found`);
    }

    return {
      message: `Job opening with id ${id} was successfully deleted`,
    };
  }

  async removeJobOpening(id: string): Promise<{ message: string }> {
    const jobOpening = await this.jobOpeningRepository.findOne({
      where: { id },
    });

    if (!jobOpening) {
      throw new NotFoundException(`Job opening with id ${id} not found`);
    }

    await this.jobOpeningRepository.delete(id);

    return {
      message: `Job opening with id ${id} was successfully deleted`,
    };
  }

  //Function to get all applications for a job opening
  async applyForJobOpening(
    userId: string,
    jobOpeningId: string,
    coverLetter: string,
  ): Promise<CollaborationApplication> {
    const jobOpening = await this.jobOpeningRepository.findOne({
      where: { id: jobOpeningId },
    });

    if (!jobOpening) {
      throw new NotFoundException(
        `Job opening with id ${jobOpeningId} not found`,
      );
    }

    const application = this.collaborationApplicationRepository.create({
      coverLetter,
      user: { id: userId },
      jobOpening: { id: jobOpeningId },
    });

    return this.collaborationApplicationRepository.save(application);
  }

  //Function to apply to become a landlord
  async applyToBecomeLandlord(
    userId: string,
    coverLetter: string,
  ): Promise<CollaborationApplication> {
    const application = this.collaborationApplicationRepository.create({
      applicantType: ApplicantType.LANDLORD,
      coverLetter,
      user: { id: userId },
    });

    return this.collaborationApplicationRepository.save(application);
  }

  async cancelApplication(
    userId: string,
    jobOpeningId: string,
  ): Promise<{ message: string }> {
    const application = await this.collaborationApplicationRepository.findOne({
      where: { user: { id: userId }, jobOpening: { id: jobOpeningId } },
    });

    if (!application) {
      throw new NotFoundException(
        `Application for job opening with id ${jobOpeningId} not found`,
      );
    }

    await this.collaborationApplicationRepository.delete(application.id);

    return {
      message: `Application for job opening with id ${jobOpeningId} was successfully deleted`,
    };
  }

  async getApplicationsByUserId(
    userId: string,
  ): Promise<CollaborationApplication[]> {
    return this.collaborationApplicationRepository.find({
      where: { user: { id: userId } },
      relations: ['jobOpening'],
    });
  }

  async getApplicationById(id: string): Promise<CollaborationApplication> {
    return this.collaborationApplicationRepository.findOne({
      where: { id },
      relations: ['jobOpening'],
    });
  }

  async updateApplication(
    id: string,
    coverLetter: string,
  ): Promise<CollaborationApplication> {
    await this.collaborationApplicationRepository.update(id, { coverLetter });

    return this.collaborationApplicationRepository.findOne({
      where: { id },
    });
  }

  async removeApplication(
    id: string,
    userId: string,
  ): Promise<{ message: string }> {
    const application = await this.collaborationApplicationRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!application) {
      throw new NotFoundException(`Application with id ${id} not found`);
    }

    await this.collaborationApplicationRepository.delete(id);

    return {
      message: `Application with id ${id} was successfully deleted`,
    };
  }
}
