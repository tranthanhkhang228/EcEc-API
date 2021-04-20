import { Game } from '../../models';
import { GameRepo } from '../../repositories';

export default class StageService {
  public async getGames(): Promise<Array<Game>> {
    return GameRepo.getGames();
  }

  //   public async create(body: IStage): Promise<Stage> {
  //     try {
  //       const stage = StageRepo.create(body);
  //       return stage;
  //     } catch (error) {
  //       return error;
  //     }
  //   }

  public async getGame(id: string): Promise<Game | null> {
    return GameRepo.getGame(Number(id));
  }

  //   public async update(body: IStudent): Promise<Stage | null> {
  //     try {
  //       const account = StageRepo.updateAccount(body);
  //       return account;
  //     } catch (error) {
  //       return error;
  //     }
  //   }

  //   public async delete(id: string): Promise<void> {
  //     StageRepo.deleteStage(Number(id));
  //   }
}
