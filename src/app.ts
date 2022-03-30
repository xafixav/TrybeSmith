import express from 'express';
import productRoutes from './routes/productsRoutes';
import ErrorMiddleware from './middleware/error';

const app = express();

app.use(express.json());
app.use('/products', productRoutes);
app.use(ErrorMiddleware.consoleError);

export default app;
