import bodyParser from 'body-parser';
import { Express } from 'express';
import cors from 'cors';

export default function expressConfig(app: Express) {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use((req, res, next) => {
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, OPTIONS, PUT, PATCH, DELETE'
        );
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-Requested-With, Content-type, Authorization, Accept-language'
        );
        next();
    });
}