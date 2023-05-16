import { SimpleServer } from '@zooduck/simple-server';

const server = new SimpleServer({ port: 8080, staticPath: 'docs' });

server.start();
