import express, { Express } from "express";
import cors from 'cors'

import { loanRoute } from './routes/loan.routes';

export const app: Express = express();
app.use(cors());
app.use(express.json());

app.use("/loans", loanRoute);
