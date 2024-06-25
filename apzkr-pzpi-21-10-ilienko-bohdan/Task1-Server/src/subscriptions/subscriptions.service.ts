// src/subscriptions/subscriptions.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from './entities/subscription.entity';
import { UserBalance } from 'src/billings/entities/user-balances.entity';
import { Transaction } from 'src/billings/entities/transactions.entity';
import { TransactionType } from 'core';

@Injectable()
export class SubscriptionsService {
  private readonly plans = {
    basic: 10,
    premium: 20,
    pro: 30,
  };

  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(UserBalance)
    private readonly userBalanceRepository: Repository<UserBalance>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(
    userId: string,
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const { plan } = createSubscriptionDto;
    const amount = this.plans[plan];

    if (amount === undefined) {
      throw new BadRequestException('Invalid plan');
    }

    const userBalance = await this.userBalanceRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!userBalance) {
      throw new NotFoundException('User balance not found');
    }

    if (userBalance.balance < amount) {
      throw new BadRequestException('Insufficient funds');
    }

    userBalance.balance -= amount;

    const transaction = this.transactionRepository.create({
      userBalance,
      amount,
      type: TransactionType.SUBSCRIPTION_PAYMENT,
      description: `Payment for ${plan} subscription`,
    });

    await this.userBalanceRepository.save(userBalance);
    await this.transactionRepository.save(transaction);

    const subscription = this.subscriptionRepository.create({
      ...createSubscriptionDto,
      user: { id: userId },
      is_active: true,
    });

    return await this.subscriptionRepository.save(subscription);
  }

  async findAll(): Promise<Subscription[]> {
    return await this.subscriptionRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }
    return subscription;
  }

  async update(
    id: string,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.preload({
      id,
      ...updateSubscriptionDto,
    });
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }
    return await this.subscriptionRepository.save(subscription);
  }

  async remove(id: string): Promise<void> {
    const subscription = await this.findOne(id);
    await this.subscriptionRepository.remove(subscription);
  }
}
