import express from 'express';

import morgan from 'morgan';

import allowCors from './middlewares/cors';

import apiRoutesV1 from './api/v1/routes';

class App {
  constructor() {
    this.subDirectory = process.env.SUBDIRECTORY;

    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(allowCors);

    this.server.use(
      morgan(`[:date] - :method [:status] :url - :response-time ms`)
    );
  }

  routes() {
    this.server.use(`${this.subDirectory}/api/v1`, apiRoutesV1);
    // this.server.use(`${this.subDirectory}/v2`, apiRoutesV2);
  }
}

export default new App().server;
