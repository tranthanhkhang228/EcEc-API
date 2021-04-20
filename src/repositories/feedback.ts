import { getRepository } from 'typeorm';
import { Feedback, Account } from '../models';

export interface IFeedback {
  accountID: string;
  subject: string;
  content: string;
}

const getFeedbacks = async (): Promise<Array<Feedback> | null> => {
  const feedbackRepository = getRepository(Feedback);

  const feedbacks = await feedbackRepository.find({ relations: ['account'] });
  if (!feedbacks) return null;
  return feedbacks;
};

const getFeedback = async (id: number): Promise<Feedback | null> => {
  const feedbackRepository = getRepository(Feedback);
  const feedback = await feedbackRepository.findOne({ id: id });
  if (!feedback) return null;
  return feedback;
};

const createFeedback = async (payload: IFeedback): Promise<Feedback | null> => {
  const account = await getRepository(Account).findOne(payload.accountID);

  if (account) {
    const feedbackRepository = getRepository(Feedback);

    const feedback = new Feedback();

    const tempFeedback = {
      subject: payload.subject,
      content: payload.content,
      account: account
    };

    const newFeedback = await feedbackRepository.save({
      ...feedback,
      ...tempFeedback
    });
    return newFeedback;
  }

  return null;
};

export default {
  getFeedbacks,
  getFeedback,
  createFeedback
};
