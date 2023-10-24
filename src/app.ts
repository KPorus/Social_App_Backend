import express, { Application } from 'express';
import cors from 'cors';
import router from './app/Router/router';

const app:Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.use('/api/v1', router)
export default app;