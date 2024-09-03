import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import socketIo from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server);

io.on('connection', socket => {
	console.log('New user connected');

	socket.on('video', data => {
		socket.broadcast.emit('video', data);
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

const PORT = process.env.PORT || 80;

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});