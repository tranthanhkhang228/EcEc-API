import { Feedback } from './../../models/';
import { FeedbackRepo } from '../../repositories';
import { IFeedback } from '../../repositories/feedback';

export default class FeedbackService {
  public async getFeedbacks(): Promise<Array<Feedback> | null> {
    return FeedbackRepo.getFeedbacks();
  }

  public async createFeedback(body: IFeedback): Promise<Feedback | null> {
    try {
      const feedback = FeedbackRepo.createFeedback(body);
      return feedback;
    } catch (error) {
      return error;
    }
  }

  public async getFeedback(id: string): Promise<Feedback | null> {
    return FeedbackRepo.getFeedback(Number(id));
  }
}
