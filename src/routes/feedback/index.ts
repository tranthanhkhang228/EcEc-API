import { Router } from 'express';
import { FeedbackController } from '../../controllers';
import httpStatus from 'http-status';

const router = Router();
//Login route
router.post('/', async (req, res) => {
  const controller = new FeedbackController();
  try {
    const response = await controller.createFeedback(req.body);
    return res.status(httpStatus.CREATED).send(response);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, detail: error.detail });
  }
});

router.get('/', async (req, res) => {
  try {
    const controller = new FeedbackController();
    const response = await controller.getFeedbacks();

    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, detail: error.detail });
  }
});

router.get('/:id', async (req, res) => {
  const controller = new FeedbackController();
  const response = await controller.getFeedback(req.params.id);
  if (!response) res.status(404).send({ message: 'No feedback found' });
  return res.status(httpStatus.OK).send(response);
});

export default router;
