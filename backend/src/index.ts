import express from 'express'
const app = express();
import bodyParser from 'body-parser'
const cors = require('cors')

var corsOptions = {
    origin: 'http://localhost:3000',
}

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({ extended: true }));

import dotenv from 'dotenv'
dotenv.config();

import { router as mediaRouter } from './routers/mediaRouter';
app.use('/media', mediaRouter);

import { router as albumRouter } from './routers/albumRouter';
app.use('/albums', albumRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));