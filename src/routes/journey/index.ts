import { Router } from 'express';
import { JourneyController } from '../../controllers';
import httpStatus from 'http-status';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const controller = new JourneyController();
    const response = await controller.getJourneys();

    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, detail: error.detail });
  }
});

router.get('/:id', async (req, res) => {
  const controller = new JourneyController();
  const response = await controller.getJourney(req.params.id);
  if (!response) res.status(404).send({ message: 'No stage found' });
  return res.status(httpStatus.OK).send(response);
});

// router.put('/', async (req, res) => {
//   const controller = new StageController();
//   try {
//     const response = await controller.update(req.body);
//     return res.status(httpStatus.CREATED).send(response);
//   } catch (error) {
//     return res
//       .status(httpStatus.INTERNAL_SERVER_ERROR)
//       .send({ message: error.message, detail: error.detail });
//   }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     const controller = new StageController();
//     await controller.delete(req.params.id);

//     return res.status(httpStatus.OK).send();
//   } catch (error) {
//     return res
//       .status(httpStatus.INTERNAL_SERVER_ERROR)
//       .send({ message: error.message, detail: error.detail });
//   }
// });

export default router;
