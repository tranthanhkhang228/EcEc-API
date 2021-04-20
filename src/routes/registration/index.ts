import { Router } from 'express';
import { RegistrationController } from '../../controllers';
import httpStatus from 'http-status';

const router = Router();
//Login route
router.post('/', async (req, res) => {
  const controller = new RegistrationController();
  try {
    const response = await controller.createRegistration(req.body);
    return res.status(httpStatus.CREATED).send(response);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, detail: error.detail });
  }
});

router.get('/', async (req, res) => {
  try {
    const controller = new RegistrationController();
    const response = await controller.getRegistrations();

    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, detail: error.detail });
  }
});

router.get('/:id', async (req, res) => {
  const controller = new RegistrationController();
  const response = await controller.getRegistration(req.params.id);
  if (!response) res.status(404).send({ message: 'No registration found' });
  return res.status(httpStatus.OK).send(response);
});

router.put('/', async (req, res) => {
  const controller = new RegistrationController();
  try {
    const response = await controller.updateRegistration(req.body);
    return res.status(httpStatus.CREATED).send(response);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, detail: error.detail });
  }
});

export default router;
