import { Router } from 'express';
import OrderController from '../controller/order';

const routerOrders = Router();

const controller = new OrderController();

routerOrders
  .route('/')
  .get(async (req, res, next) =>
    controller.getAll(req, res, next));

export default routerOrders;