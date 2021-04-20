import { getRepository } from 'typeorm';
import { Game } from '../models';

const getGames = async (): Promise<Array<Game>> => {
  const games = await getRepository(Game).find({ relations: ['gameType'] });
  // .createQueryBuilder('stage')
  // .leftJoinAndSelect('stage.stageContents', 'stageContents')
  // .leftJoinAndSelect('stageContents.games', 'games')
  // .leftJoinAndSelect('games.gameType', 'type')
  // .getMany();

  return games;
};

const getGame = async (id: number): Promise<Game | null> => {
  const game = await getRepository(Game).findOne(
    { id },
    { relations: ['gameType'] }
  );
  // .createQueryBuilder('stage')
  // .leftJoinAndSelect('stage.stageContents', 'stageContents')
  // .leftJoinAndSelect('stageContents.games', 'games')
  // .leftJoinAndSelect('games.gameType', 'type')
  // .where('stage.id = :id', { id })
  // .getOne();
  if (!game) return null;
  return game;
};

// const create = async (payload: IStage): Promise<Stage> => {
//   const stageRepo = getRepository(Stage);
//   const stage = new Stage();

//   const tempStage = {
//     stageOrder: payload.stageOrder,
//     name: payload.name,
//     description: payload.description
//   };

//   const newStage = await stageRepo.save({
//     ...stage,
//     ...tempStage
//   });
//   return newStage;
// };

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

// const deleteStage = async (id: number): Promise<void> => {
//   const stageRepo = getRepository(Game);
//   stageRepo.delete({ id });
// };

export default {
  getGames,
  getGame
  //   create,
  //   deleteStage
  //   updateAccount
};
