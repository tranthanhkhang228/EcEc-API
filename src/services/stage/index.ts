import { Stage } from '../../models';
import { StageRepo } from '../../repositories';
import { IStage } from '../../repositories/stage';

export default class StageService {
  public async getStages(): Promise<Array<Stage>> {
    return StageRepo.getStages();
  }

  public async create(body: IStage): Promise<Stage> {
    try {
      const stage = StageRepo.create(body);
      return stage;
    } catch (error) {
      return error;
    }
  }

  public async getStage(id: string): Promise<Stage | null> {
    return StageRepo.getStage(Number(id));
  }

  //   public async update(body: IStudent): Promise<Stage | null> {
  //     try {
  //       const account = StageRepo.updateAccount(body);
  //       return account;
  //     } catch (error) {
  //       return error;
  //     }
  //   }

  public async delete(id: string): Promise<void> {
    StageRepo.deleteStage(Number(id));
  }
}
