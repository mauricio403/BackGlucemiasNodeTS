import { Router } from 'express';
import { test } from '../controllers/sheetsController';

export const sheetsRouter = Router();


sheetsRouter.get('/', test);
