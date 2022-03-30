import express from 'express';
import ErrorMiddleware from './middleware/error';
import routerProducts from './routes/productsRoutes';
import routerUser from './routes/userRoutes';
import routerOrders from './routes/orderRoutes';

const app = express();

app.use(express.json());
app.use('/products', routerProducts);
app.use('/users', routerUser);
app.use('/orders', routerOrders);
app.use(ErrorMiddleware.consoleError);

export default app;
