import { Student } from './../../models/student';
import { Get, Route, Tags, Post, Body, Path, Delete, Put } from 'tsoa';
import { Account } from '../../models';
import { IAccount, IStudent } from '../../repositories/account';
import { AccountService } from '../../services';

@Route('accounts')
@Tags('Account')
export default class AccountController {
  @Get('/')
  public async getAccounts(): Promise<Array<Student>> {
    const accountService = new AccountService();
    return accountService.getAccounts();
  }

  @Post('/')
  public async createAccount(@Body() body: IAccount): Promise<Account> {
    const accountService = new AccountService();
    try {
      let account = accountService.createAccount(body);
      return account;
    } catch (error) {
      return error;
    }
  }

  @Get('/:id')
  public async getAccount(@Path() id: string): Promise<Account | null> {
    const accountService = new AccountService();
    return accountService.getAccount(id);
  }

  @Get('/email/:email')
  public async getAccountByEmail(
    @Path() email: string
  ): Promise<Student | null> {
    const accountService = new AccountService();
    return accountService.getAccountByEmail(email);
  }

  @Put('/')
  public async updateAccount(@Body() body: IStudent): Promise<Student | null> {
    const accountService = new AccountService();
    try {
      let account = accountService.updateAccount(body);
      return account;
    } catch (error) {
      return error;
    }
  }

  @Delete('/:id')
  public async deleteAccount(@Path() id: string): Promise<void> {
    const accountService = new AccountService();
    accountService.deleteAccount(id);
  }
}
