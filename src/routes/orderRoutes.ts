import { Router } from 'express';
import OrderController from '../controller/order';
import ValidationToken from '../middleware/validateJWT';
import ValidationOrder from '../middleware/validateOrder';

const routerOrders = Router();

const middlewareToken = new ValidationToken();
const middleware = new ValidationOrder();

const controller = new OrderController();

routerOrders
  .route('/')
  .get(async (req, res, next) =>
    controller.getAll(req, res, next));

routerOrders
  .route('/')
  .post(
    async (req, res, next) =>
      middlewareToken.validateToken(req, res, next),
    async (req, res, next) =>
      middleware.validateOrder(req, res, next),
    async (req, res, next) =>
      controller.create(req, res, next),
  );

export default routerOrders;