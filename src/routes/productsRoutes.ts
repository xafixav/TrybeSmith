import { Router } from 'express';
import ProductsController from '../controller/products';

const router = Router();

const productsController = new ProductsController();

router
  .route('/')
  .get(async (req, res, next) =>
    productsController.getAll(req, res, next));

export default router;