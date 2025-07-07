import express, { json } from 'express';
import dotenv from 'dotenv';
import userRoutes from './interfaces/routes/userRouter.js';
import { initializeDatabase } from './infrastructure/db/initDb.js';

dotenv.config();

const app = express();
app.use(json());

async function startServer(){
    // Ensure database is ready before routing starts
    await initializeDatabase();

    app.use('/api/users', userRoutes);

    app.use((req, res)=> {
        res.status(404).json({ message: 'Not found' });
    });

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}

startServer();