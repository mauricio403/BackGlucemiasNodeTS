import { Router } from 'express';
import { test,storeRow } from '../controllers/sheetsController';

export const sheetsRouter = Router();


sheetsRouter.get('/', test);
sheetsRouter.post('/', storeRow);
sheetsRouter.put('/');
