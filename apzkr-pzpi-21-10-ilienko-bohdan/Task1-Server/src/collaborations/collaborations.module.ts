import { Module } from '@nestjs/common';
import { CollaborationsService } from './collaborations.service';
import { CollaborationsController } from './collaborations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobOpening } from './entities/job-opening.entity';
import { CollaborationApplication } from './entities/collaboration-application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobOpening, CollaborationApplication])],
  controllers: [CollaborationsController],
  providers: [CollaborationsService],
})
export class CollaborationsModule {}
