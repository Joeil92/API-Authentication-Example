import express from "express";
import http from "http";
import { AddressInfo } from 'net'
import dotenv from "dotenv";
import expressConfig from "./config/express";
import routes from "./routes";
import errorHandlingMiddleware from "./middlewares/errorHandlingMiddleware";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Setup configuration
expressConfig(app);

// Setup all routes
routes(app);

// Error Middleware
app.use(errorHandlingMiddleware);

server.listen(process.env.PORT, () => {
    const host = server.address() as AddressInfo;

    console.log('Documentation: http://%s:%s/api-docs', host.address === "::" ? "localhost" : host.address, host.port);
});