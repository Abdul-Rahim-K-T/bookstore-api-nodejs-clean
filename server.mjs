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

// Serve raw OpenAPI JSON spect at /api-docs-json
app.get('/api-docs-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

async function startServer(){
    try{
      // Ensure database is ready before routing starts
      await initializeDatabase();

      //api routes
      app.use('/api/users', userRoutes);

      // 404 fallback handler
      app.use((req, res)=> {
        res.status(404).json({ message: 'Not found' });
      });

      const port = process.env.PORT || 3000;
      app.listen(port, () => {
        console.log(`Server is running on port at http://localhost:${port}`);
        console.log(`Swagger Docs at http://localhost:${port}/api-docs`);
        console.log(`Swagger JSON: http://localhost:${port}/api-docs-json`);
      });
    } catch (error) {
        console.error('Failed to initilize server:', error);
    }
}

startServer();