import express from 'express';
import productRoutes from './routes/productsRoutes';
import Error from './middleware/error';

const app = express();

app.use(express.json());
app.use('/products', productRoutes);
app.use(Error.consoleError);

export default app;
