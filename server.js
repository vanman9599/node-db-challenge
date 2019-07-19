const express = require('express');
const helmet = require('helmet');

const ProjectsRouter = require('./projects/projects-router.js');
const ActionsRouter = require('./actions/actions-router.js');
const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/projects', ProjectsRouter);
// server.use('/api/actions', ActionsRouter);

module.exports = server;