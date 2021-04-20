import { getRepository } from 'typeorm';
import { Stage } from '../models';

export interface IStage {
  stageOrder: number;
  name: string;
  description: string;
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

const getStages = async (): Promise<Array<Stage>> => {
  const stages = await getRepository(Stage)
    .createQueryBuilder('stage')
    .leftJoinAndSelect('stage.stageContents', 'stageContents')
    .leftJoinAndSelect('stage.realms', 'realms')
    .leftJoinAndSelect('stageContents.games', 'games')
    .leftJoinAndSelect('games.gameType', 'type')
    .getMany();

  return stages;
};

const getStage = async (id: number): Promise<Stage | null> => {
  const stage = await getRepository(Stage)
    .createQueryBuilder('stage')
    .leftJoinAndSelect('stage.stageContents', 'stageContents')
    .leftJoinAndSelect('stage.realms', 'realms')
    .leftJoinAndSelect('stageContents.games', 'games')
    .leftJoinAndSelect('games.gameType', 'type')
    .where('stage.id = :id', { id })
    .getOne();
  if (!stage) return null;
  return stage;
};

const create = async (payload: IStage): Promise<Stage> => {
  const stageRepo = getRepository(Stage);
  const stage = new Stage();

  const tempStage = {
    stageOrder: payload.stageOrder,
    name: payload.name,
    description: payload.description
  };

  const newStage = await stageRepo.save({
    ...stage,
    ...tempStage
  });
  return newStage;
};

// const updateAccount = async (payload: IStudent): Promise<Student | null> => {
//   const account = await getRepository(Stage).findOne(payload.accountID);
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

const deleteStage = async (id: number): Promise<void> => {
  const stageRepo = getRepository(Stage);
  stageRepo.delete({ id });
};

export default {
  getStages,
  getStage,
  create,
  deleteStage
  //   updateAccount
};
