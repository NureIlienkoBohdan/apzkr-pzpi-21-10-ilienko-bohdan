import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transactions.entity';
import { UserBalance } from './entities/user-balances.entity';
import { CreateUserBalanceDto } from './dto/create-user-balance.dto';
import { UpdateUserBalanceDto } from './dto/update-user-balance.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class BillingsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(UserBalance)
    private readonly userBalanceRepository: Repository<UserBalance>,
    private readonly i18n: I18nService,
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
      throw new NotFoundException(this.i18n.t('errors.USER_BALANCE_NOT_FOUND'));
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
      throw new NotFoundException(
        this.i18n.t('errors.TRANSACTION_NOT_FOUND', { args: { id } }),
      );
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
      throw new NotFoundException(
        this.i18n.t('errors.TRANSACTION_NOT_FOUND', { args: { id } }),
      );
    }
    return await this.transactionRepository.save(transaction);
  }

  async removeTransaction(id: string): Promise<void> {
    await this.transactionRepository.softDelete(id);
  }

  // Баланси користувачів
  async createUserBalance(
    userId: string,
    dto: CreateUserBalanceDto,
  ): Promise<UserBalance> {
    const userBalance = this.userBalanceRepository.create({
      user: { id: userId },
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
      throw new NotFoundException(
        this.i18n.t('errors.USER_BALANCE_NOT_FOUND', { args: { id } }),
      );
    }
    return balance;
  }

  async updateUserBalance(
    id: string,
    dto: UpdateUserBalanceDto,
  ): Promise<UserBalance> {
    const balance = await this.userBalanceRepository.preload({ id, ...dto });
    if (!balance) {
      throw new NotFoundException(
        this.i18n.t('errors.USER_BALANCE_NOT_FOUND', { args: { id } }),
      );
    }
    return await this.userBalanceRepository.save(balance);
  }

  async removeUserBalance(id: string): Promise<void> {
    await this.userBalanceRepository.softDelete(id);
  }
}
