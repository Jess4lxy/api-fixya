import express from 'express';
import residentRoutes from './controllers/residentController.js';

const app = express();

app.use(express.json());

app.use('/api', residentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
