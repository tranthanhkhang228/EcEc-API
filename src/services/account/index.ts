import { Student } from './../../models/student';
import { Account } from '../../models';
import { AccountRepo } from '../../repositories';
import { IAccount, IStudent } from '../../repositories/account';

export default class AccountService {
  public async getAccounts(): Promise<Array<Student>> {
    return AccountRepo.getAccounts();
  }

  public async createAccount(body: IAccount): Promise<Account> {
    try {
      const account = AccountRepo.createAccount(body);
      return account;
    } catch (error) {
      return error;
    }
  }

  public async getAccount(id: string): Promise<Account | null> {
    return AccountRepo.getAccount(Number(id));
  }

  public async updateAccount(body: IStudent): Promise<Student | null> {
    try {
      const account = AccountRepo.updateAccount(body);
      return account;
    } catch (error) {
      return error;
    }
  }

  public async deleteAccount(id: string): Promise<void> {
    AccountRepo.deleteAccount(Number(id));
  }
}
