import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { UIInput, UITypography } from '../components';
import { setOnlinePeople } from '../redux/slices/chat/slice';
import { useAppDispatch } from '../redux/store';
import { AdminBox } from '../widgets';

export const Chat: React.FC = () => {
	const dispatch = useAppDispatch();
	const [ws, setWs] = useState<any>(null);
	const [msg, setMsg] = useState('');

	const conectToWs = () => {
		const socket = new WebSocket(`ws://${process.env.REACT_APP_SOCKET_URL}`);
		setWs(socket);
		socket.addEventListener('message', handleMessage);
		socket.addEventListener('close', () => {
			setTimeout(() => {
				console.log('Disconnected. Trying to reconnect.');
				conectToWs();
			}, 1000);
		});
	};

	useEffect(() => {
		conectToWs();
	}, []);

	const handleMessage = (ev: any) => {
		const messageData = JSON.parse(ev.data);
		if ('online' in messageData) {
			dispatch(setOnlinePeople(messageData.online));
		}
	};

	return (
		<div className="flex w-full">
			<div className="bg-blue-100 w-1/4 grid grid-rows-[1fr_auto] overflow-auto relative">
				<UITypography variant="h3">Contacts</UITypography>
				<AdminBox />
			</div>
			<div className="bg-blue-50 w-3/4 grid grid-rows-[1fr_auto] overflow-auto relative">
				<div className="p-4">
					<UITypography variant="h3">Message</UITypography>
				</div>
				<div className="flex gap-2 sticky bottom-0 p-4 bg-blue-50">
					<UIInput
						type="text"
						placeholder="Type your message here"
						className="flex-grow"
						value={msg}
						onChange={(e) => setMsg(e.target.value)}
					/>
					<button className="bg-blue-500 p-2 text-white w-[50px] rounded-lg">
						<FontAwesomeIcon icon={['fas', 'paper-plane']} color="#fff" />
					</button>
				</div>
			</div>
		</div>
	);
};
