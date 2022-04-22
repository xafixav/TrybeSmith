import express from 'express';
import routerProducts from './routes/productsRoutes';
import routerUser from './routes/userRoutes';
import routerOrders from './routes/orderRoutes';
import routerLogin from './routes/loginRoutes';
import errorMiddleware from './middleware/error';

const app = express();

app.use(express.json());
app.use('/products', routerProducts);
app.use('/users', routerUser);
app.use('/orders', routerOrders);
app.use('/login', routerLogin);
app.use(errorMiddleware);

export default app;
