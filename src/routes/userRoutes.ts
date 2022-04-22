import { Router } from 'express';
import UserController from '../controller/user';
import ValidationUser from '../middleware/validationUser';

const routerUser = Router();

const userController = new UserController();
const middleware = new ValidationUser();

routerUser
  .route('/')
  .get(async (req, res, next) =>
    userController.getAll(req, res, next));

routerUser
  .route('/')
  .post(
    async (req, res, next) =>
      middleware.validateUser(req, res, next),
    async (req, res, next) =>
      userController.create(req, res, next),
  );

export default routerUser;