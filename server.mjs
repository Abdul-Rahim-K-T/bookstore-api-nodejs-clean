import express, { json } from 'express';
import dotenv from 'dotenv';
import userRoutes from './interfaces/routes/userRouter.js';
import { initializeDatabase } from './infrastructure/db/initDb.js';

import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './config/swagger.js';

dotenv.config();

const app = express();
app.use(json());

// Swagger setup
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

async function startServer(){
    // Ensure database is ready before routing starts
    await initializeDatabase();

    app.use('/api/users', userRoutes);

    app.use((req, res)=> {
        res.status(404).json({ message: 'Not found' });
    });

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port at http://localhost:${process.env.PORT}`);
        console.log(`Swagger Docs at http://localhost:${process.env.PORT}/api-docs`);
    });
}

startServer();