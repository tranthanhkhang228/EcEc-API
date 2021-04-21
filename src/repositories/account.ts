import { getRepository } from 'typeorm';
import { Account, Student, Journey } from '../models';
import moment from 'moment';

export interface IAccount {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthday: string;
  introduction: string;
}

export interface IStudent {
  accountID: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthday: string;
  introduction: string;
}

const getAccounts = async (): Promise<Array<Student>> => {
  const accountRepository = getRepository(Student);

  const account = await accountRepository.find({ relations: ['account'] });
  return account;
};

const getAccount = async (id: number): Promise<Account | null> => {
  const accountRepository = getRepository(Account);
  const account = await accountRepository.findOne({ id });
  if (!account) return null;
  return account;
};

const getAccountByEmail = async (email: string): Promise<Student | null> => {
  const account = await getRepository(Student)
    .createQueryBuilder('student')
    .leftJoinAndSelect('student.account', 'account')
    .where('account.email = :email', { email })
    .getOne();

  if (!account) return null;
  return account;
};

const createAccount = async (payload: IAccount): Promise<Account> => {
  const accountRepository = getRepository(Account);
  const studentRepository = getRepository(Student);
  const journeyRepository = getRepository(Journey);

  const account = new Account();
  const student = new Student();
  const journey = new Journey();

  account.email = payload.email;

  const newAccount = await accountRepository.save(account);

  (student.firstName = payload.firstName),
    (student.lastName = payload.lastName),
    (student.phoneNumber = payload.phoneNumber),
    (student.birthday = new Date(
      moment(payload.birthday).format('YYYY-MM-DD')
    )),
    (student.introduction = payload.introduction),
    (student.account = account);

  journey.account = account;

  const newJourney = await journeyRepository.save(journey);
  const newStudent = await studentRepository.save(student);
  return { ...newAccount, ...newStudent, ...newJourney };
};

const updateAccount = async (payload: IStudent): Promise<Student | null> => {
  const account = await getRepository(Account).findOne(payload.accountID);
  if (account) {
    const student = new Student();
    if (payload.firstName) {
      student!.firstName = payload.firstName;
    }
    if (payload.lastName) {
      student!.lastName = payload.lastName;
    }
    if (payload.phoneNumber) {
      student!.phoneNumber = payload.phoneNumber;
    }
    if (payload.birthday) {
      student!.birthday = new Date(payload.birthday);
    }
    if (payload.introduction) {
      student!.introduction = payload.introduction;
    }

    student.account = account!;

    const updatedStudent = await getRepository(Student).save(student!);

    return updatedStudent;
  }

  return null;
};

const deleteAccount = async (id: number): Promise<void> => {
  const accountRepository = getRepository(Account);
  accountRepository.delete({ id });
};

export default {
  getAccounts,
  getAccount,
  createAccount,
  deleteAccount,
  updateAccount,
  getAccountByEmail
};
