import { Router } from 'express';
import UserController from '../controller/user';
import ValidationLogin from '../middleware/validationLogin';

const routerLogin = Router();

const userController = new UserController();
const middleware = new ValidationLogin();

routerLogin
  .route('/')
  .post(
    async (req, res, next) =>
      middleware.validateLogin(req, res, next),
    async (req, res, next) =>
      userController.login(req, res, next),
  );

export default routerLogin;