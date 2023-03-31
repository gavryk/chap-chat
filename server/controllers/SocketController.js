import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import Message from '../models/Message.js';
import UserModel from '../models/User.js';

export const socketConnect = (server) => {
	//Connect Socket
	const wss = new WebSocketServer({ server });

	//Connected to WebSocket
	wss.on('connection', async (connection, req) => {
		connection.on('message', async (msg, isBinary) => {
			msg = JSON.parse(msg);
			switch (msg.method) {
				case 'connection':
					connectionHandler(connection, msg);
					break;
				case 'draw':
					broadcastConnection(connection, msg);
					break;
				case 'message':
					try {
						const { recipient, text } = msg.message;
						if (recipient && text) {
							const messageDoc = new Message({
								sender: connection.userId,
								recipient,
								text,
							});
							const msgDb = await messageDoc.save();
							[...wss.clients]
								.filter((user) => user.id === recipient)
								.forEach((u) =>
									u.send(
										JSON.stringify({
											text,
											sender: connection.userId,
											recipient,
											_id: msgDb._id,
										}),
									),
								);
						}
					} catch (error) {
						console.log(error);
					}
					break;
			}
		});

		const cookie = req.headers.cookie;
		if (cookie) {
			const tokenCookieString = cookie.split(';').find((str) => str.startsWith('access_token='));
			if (tokenCookieString) {
				const token = tokenCookieString.split('=')[1];
				if (token) {
					const { _id } = jwt.verify(token, 'secret_id');
					const user = await UserModel.findById(_id);
					connection.userId = user._id;
					connection.userName = user.userName;
					connection.avatarUrl = user?.avatarUrl;
				}
			}
		}

		connection.on('close', (data) => {
			notifyAboutOnlinePeople();
		});

		notifyAboutOnlinePeople();
	});

	const connectionHandler = (ws, msg) => {
		ws.id = msg.id;
		broadcastConnection(ws, msg);
	};

	const broadcastConnection = (ws, msg) => {
		wss.clients.forEach((client) => {
			if (client.id !== msg.id) {
				client.send(
					JSON.stringify({
						connectUser: { ...msg },
					}),
				);
			}
		});
	};

	function notifyAboutOnlinePeople() {
		[...wss.clients].forEach((client) => {
			client.send(
				JSON.stringify({
					online: [...wss.clients].map((client) => {
						const { userId, userName, avatarUrl } = client;
						if (client) {
							return { userId, userName, avatarUrl };
						}
					}),
				}),
			);
		});
	}
};
