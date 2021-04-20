import { getRepository } from 'typeorm';
import { Journey, Result, StageContent } from '../models';

export interface IResult {
  journeyID: number;
  point: number;
  stageContentID: number;
  completeTime: string;
}

const getJourneys = async (): Promise<Array<Journey>> => {
  const journeys = await getRepository(Journey)
    .createQueryBuilder('journey')
    .leftJoinAndSelect('journey.results', 'results')
    .getMany();

  //   const account = await accountRepository.find({ relations: ['account'] });
  return journeys;
};

const getJourney = async (id: number): Promise<Journey | null> => {
  const accountRepository = getRepository(Journey);
  const account = await accountRepository.findOne({ id: id });
  if (!account) return null;
  return account;
};

const createResult = async (payload: IResult): Promise<void> => {
  const stageContent = await getRepository(StageContent).findOne({
    id: payload.stageContentID
  });

  const journeyRepo = getRepository(Journey);

  const journey = await journeyRepo.findOne({
    id: payload.journeyID
  });

  if (!stageContent || !journey) {
    throw new Error("This request couldn't be performed!");
  }

  const result = new Result();
  result.point = payload.point;
  result.completeTime = new Date(payload.completeTime);
  result.stageContent = stageContent;

  await getRepository(Result).save(result);

  journey.results = [...journey.results, { ...result }];

  await journeyRepo.save(journey);
};

// const updateAccount = async (payload: IStudent): Promise<Student | null> => {
//   const account = await getRepository(Account).findOne(payload.accountID);
//   if (account) {
//     const student = new Student();
//     if (payload.firstName) {
//       student!.firstName = payload.firstName;
//     }
//     if (payload.lastName) {
//       student!.lastName = payload.lastName;
//     }
//     if (payload.phoneNumber) {
//       student!.phoneNumber = payload.phoneNumber;
//     }
//     if (payload.birthday) {
//       student!.birthday = new Date(payload.birthday);
//     }
//     if (payload.introduction) {
//       student!.introduction = payload.introduction;
//     }

//     student.account = account!;

//     const updatedStudent = await getRepository(Student).save(student!);

//     return updatedStudent;
//   }

//   return null;
// };

// const deleteAccount = async (id: number): Promise<void> => {
//   const accountRepository = getRepository(Account);
//   accountRepository.delete({ id });
// };

export default {
  getJourneys,
  getJourney,
  createResult
  //   deleteAccount,
  //   updateAccount
};
