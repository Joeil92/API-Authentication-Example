import { Express } from "express";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import swaggerUi from 'swagger-ui-express';
import openapiSpecification from "./config/swagger";

function routes(app: Express) {
    // ROUTES
    app.use('/auth', authRoutes);
    app.use('/api/users', userRoutes);

    // DOCUMENTATION
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))
}

export default routes;