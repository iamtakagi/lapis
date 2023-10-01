import { LapisRouter } from './router';
import { LapisServer } from './server';

const router = new LapisRouter();
router.init();

const server = new LapisServer(router);
server.init();
server.start();
