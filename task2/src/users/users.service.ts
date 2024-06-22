import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'argon2';
import { Roles } from 'core';
import { AuthService } from 'src/auth/auth.service';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';

export interface SearchUserParams {
  id?: string;
  email?: string;
  name?: string;
}
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: SignUpDto): Promise<User> {
    try {
      const hashedPassword = await hash(createUserDto.password);
      const user = this.usersRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
      return await this.usersRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new ConflictException(
        'User with this email or nickname is already exists',
      );
    }
  }

  async createAnotherRole(userId: string, role: Roles) {
    const user = await this.findOneByParams({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.roles.includes(role)) {
      throw new BadRequestException(
        `This user allready have an "${role}" role`,
      );
    }

    user.roles.push(role);

    await this.usersRepository.save(user);

    const { id, roles } = user;

    const { accessToken, refreshToken } = await this.authService.generateTokens(
      {
        id,
        roles,
      },
    );

    return { accessToken, refreshToken };
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOneByParams(params: SearchUserParams): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: params,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<User> {
    const user = await this.findOneByParams({ id });

    if (!user) throw new NotFoundException('User not found');

    try {
      this.usersRepository.merge(user, { token: refreshToken });
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new ConflictException(
        'Some error occured while updating user token',
      );
    }
  }
}
