import { Router } from 'express';
import { AccountController } from '../../controllers';
import httpStatus from 'http-status';

const router = Router();
//Login route
router.post('/', async (req, res) => {
  const controller = new AccountController();
  try {
    const response = await controller.createAccount(req.body);
    return res.status(httpStatus.CREATED).send(response);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, detail: error.detail });
  }
});

router.get('/', async (req, res) => {
  try {
    const controller = new AccountController();
    const response = await controller.getAccounts();

    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, detail: error.detail });
  }
});

router.get('/:id', async (req, res) => {
  const controller = new AccountController();
  const response = await controller.getAccount(req.params.id);
  if (!response) res.status(404).send({ message: 'No account found' });
  return res.status(httpStatus.OK).send(response);
});

router.put('/', async (req, res) => {
  const controller = new AccountController();
  try {
    const response = await controller.updateAccount(req.body);
    return res.status(httpStatus.CREATED).send(response);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, detail: error.detail });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const controller = new AccountController();
    await controller.deleteAccount(req.params.id);

    return res.status(httpStatus.OK).send();
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message, detail: error.detail });
  }
});

export default router;
