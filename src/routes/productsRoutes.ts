import { Router } from 'express';
import ProductsController from '../controller/products';
import ValidationProduct from '../middleware/validationProduct';

const router = Router();

const productsController = new ProductsController();
const middleware = new ValidationProduct();

router
  .route('/')
  .get(async (req, res, next) =>
    productsController.getAll(req, res, next));

router
  .route('/')
  .post(
    async (req, res, next) =>
      middleware.validatePost(req, res, next),
    async (req, res, next) =>
      productsController.create(req, res, next),
  );

export default router;