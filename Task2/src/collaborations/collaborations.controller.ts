import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CollaborationsService } from './collaborations.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateJobOpeningDto } from './dto/create-job-opening.dto';
import { UpdateJobOpeningDto } from './dto/update-job-opening.dto';
import { AccessTokenGuard, Role, RoleGuard, Roles, UserId } from 'core';

@ApiTags('collaborations')
@Controller('collaborations')
export class CollaborationsController {
  constructor(private readonly collaborationsService: CollaborationsService) {}

  @ApiOperation({
    summary: 'Create a new job opening',
    operationId: 'createJobOpening',
    description:
      'This endpoint allows you to create a new job opening. You need to provide the title, description, and location of the job opening. User must be authenticated in the admin role to access this endpoint.',
  })
  @ApiBearerAuth()
  @Role([Roles.ADMIN])
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Post()
  createJobOpening(@Body() createJobOpeningDto: CreateJobOpeningDto) {
    return this.collaborationsService.createJobOpening(createJobOpeningDto);
  }

  @Get()
  getJobOpenings() {
    return this.collaborationsService.getJobOpeningsWithParams({});
  }

  @Get(':id')
  getJobOpeningById(@Param('id') id: string) {
    return this.collaborationsService.getJobOpeningById(id);
  }

  @Get(':id/applications')
  getJobOpeningApplicationsById(@Param('id') id: string) {
    return this.collaborationsService.getJobOpeningApplicationsById(id);
  }

  @Patch(':id')
  updateJobOpening(
    @Param('id') id: string,
    @Body() updateJobOpeningDto: UpdateJobOpeningDto,
  ) {
    return this.collaborationsService.updateJobOpening(id, updateJobOpeningDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collaborationsService.removeJobOpening(id);
  }

  @Post(':id/apply')
  @UseGuards(AccessTokenGuard)
  applyForJobOpening(
    @Param('id') id: string,
    @UserId() userId: string,
    @Body('coverLetter') coverLetter: string,
  ) {
    return this.collaborationsService.applyForJobOpening(
      id,
      userId,
      coverLetter,
    );
  }

  @Patch(':id/apply')
  @UseGuards(AccessTokenGuard)
  updateApplication(@Param('id') id: string, @UserId() userId: string) {
    return this.collaborationsService.updateApplication(id, userId);
  }

  @Delete(':id/apply')
  @UseGuards(AccessTokenGuard)
  removeApplication(@Param('id') id: string, @UserId() userId: string) {
    return this.collaborationsService.removeApplication(id, userId);
  }
}
