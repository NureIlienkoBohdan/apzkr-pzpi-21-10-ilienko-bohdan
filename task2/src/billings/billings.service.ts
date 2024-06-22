// src/billings/billings.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transactions.entity';
import { UserBalance } from './entities/user-balances.entity';
import { CreateUserBalanceDto } from './dto/create-user-balance.dto';
import { UpdateUserBalanceDto } from './dto/update-user-balance.dto';

@Injectable()
export class BillingsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(UserBalance)
    private readonly userBalanceRepository: Repository<UserBalance>,
  ) {}

  // Транзакції
  async createTransaction(
    dto: CreateTransactionDto,
    userId: string,
  ): Promise<Transaction> {
    const userBalance = await this.userBalanceRepository.findOne({
      where: { user: { id: userId } },
    });
    if (!userBalance) {
      throw new NotFoundException('User balance not found');
    }
    const transaction = this.transactionRepository.create({
      ...dto,
      userBalance,
    });
    return await this.transactionRepository.save(transaction);
  }

  async findAllTransactions(): Promise<Transaction[]> {
    return await this.transactionRepository.find({
      relations: ['userBalance'],
    });
  }

  async findOneTransaction(id: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: ['userBalance'],
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  async updateTransaction(
    id: string,
    dto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const transaction = await this.transactionRepository.preload({
      id,
      ...dto,
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return await this.transactionRepository.save(transaction);
  }

  async removeTransaction(id: string): Promise<void> {
    await this.transactionRepository.softDelete(id);
  }

  // Баланси користувачів
  async createUserBalance(dto: CreateUserBalanceDto): Promise<UserBalance> {
    const userBalance = this.userBalanceRepository.create({
      user: { id: dto.userId },
      balance: dto.initialBalance,
    });
    return await this.userBalanceRepository.save(userBalance);
  }

  async findAllUserBalances(): Promise<UserBalance[]> {
    return await this.userBalanceRepository.find({
      relations: ['user', 'transactions'],
    });
  }

  async findOneUserBalance(id: string): Promise<UserBalance> {
    const balance = await this.userBalanceRepository.findOne({
      where: { id },
      relations: ['user', 'transactions'],
    });
    if (!balance) {
      throw new NotFoundException(`User balance with ID ${id} not found`);
    }
    return balance;
  }

  async updateUserBalance(
    id: string,
    dto: UpdateUserBalanceDto,
  ): Promise<UserBalance> {
    const balance = await this.userBalanceRepository.preload({ id, ...dto });
    if (!balance) {
      throw new NotFoundException(`User balance with ID ${id} not found`);
    }
    return await this.userBalanceRepository.save(balance);
  }

  async removeUserBalance(id: string): Promise<void> {
    await this.userBalanceRepository.softDelete(id);
  }
}
