import { Feedback } from '../../models';
import { Get, Route, Tags, Post, Body, Path } from 'tsoa';
import { IFeedback } from '../../repositories/feedback';
import { FeedbackService } from '../../services';

@Route('feedbacks')
@Tags('Feedback')
export default class FeedbackController {
  @Get('/')
  public async getFeedbacks(): Promise<Array<Feedback> | null> {
    const feedbackService = new FeedbackService();
    return feedbackService.getFeedbacks();
  }

  @Post('/')
  public async createFeedback(
    @Body() body: IFeedback
  ): Promise<Feedback | null> {
    const feedbackService = new FeedbackService();

    try {
      let feedback = feedbackService.createFeedback(body);
      return feedback;
    } catch (error) {
      return error;
    }
  }

  @Get('/:id')
  public async getFeedback(@Path() id: string): Promise<Feedback | null> {
    const feedbackService = new FeedbackService();
    return feedbackService.getFeedback(id);
  }
}
