import express from 'express';
import routerProducts from './routes/productsRoutes';
import ErrorMiddleware from './middleware/error';
import routerUser from './routes/userRoutes';

const app = express();

app.use(express.json());
app.use('/products', routerProducts);
app.use('/users', routerUser);
app.use(ErrorMiddleware.consoleError);

export default app;
