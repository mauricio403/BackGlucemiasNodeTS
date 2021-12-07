import dotenv from 'dotenv';
import Server from './src/models/server';
import express, { Application } from 'express';


dotenv.config();
const server = new Server();
server.listen();

