import { Journey } from '../../models';
import { JourneyRepo } from '../../repositories';

export default class JourneyService {
  public async getJourneys(): Promise<Array<Journey>> {
    return JourneyRepo.getJourneys();
  }

  public async getJourney(id: string): Promise<Journey | null> {
    return JourneyRepo.getJourney(Number(id));
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
