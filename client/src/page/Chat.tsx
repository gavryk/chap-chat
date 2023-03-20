import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { UIInput, UITypography } from '../components';
import { authSelector } from '../redux/slices/auth/selector';
import { chatSelector } from '../redux/slices/chat/selector';
import { setOnlinePeople } from '../redux/slices/chat/slice';
import { useAppDispatch } from '../redux/store';
import { AdminBox, UsersList } from '../widgets';
import { AuthProps } from '../common';

export const Chat: React.FC = () => {
	const dispatch = useAppDispatch();
	const { auth } = useSelector(authSelector);
	const { online } = useSelector(chatSelector);
	const [msg, setMsg] = useState('');
	const [selectedUser, setSelectedUser] = useState<any>(null);
	const [offlinePeople, setOfflinePeople] = useState<AuthProps[]>([]);
	const [connected, setConnected] = useState<boolean>();
	const socket = useRef<any>(null);

	const connectToWs = () => {
		socket.current = new WebSocket(`ws://${process.env.REACT_APP_SOCKET_URL}`);
		socket.current.addEventListener('open', () => {
			setConnected(true);
		});
		socket.current.addEventListener('message', handleMessage);
		socket.current.addEventListener('close', () => {
			console.log('Disconnected.');
		});
	};

	const logoutHandler = () => {
		setConnected(false);
		socket.current.close();
	};

	useEffect(() => {
		if (auth) {
			if (Object.keys(auth).length > 0) connectToWs();
		}
	}, [auth]);

	useEffect(() => {
		axios.get('/people').then((res) => {
			const offlinePeopleArr = res.data
				.filter((p: any) => p._id !== auth?._id)
				.filter((p: any) => online.every((user) => p._id !== user.userId));
			setOfflinePeople(offlinePeopleArr);
		});
	}, [online]);

	const handleMessage = (ev: any) => {
		const messageData = JSON.parse(ev.data);
		if ('online' in messageData) {
			dispatch(setOnlinePeople(messageData.online));
		}
	};

	const onlineExclMeFromList = online.filter(({ userName }) => userName !== auth?.userName);

	return (
		<div className="flex w-full">
			<div className="bg-blue-100 w-1/4 grid grid-rows-[auto_1fr_auto] overflow-auto relative">
				<UITypography
					variant="h3"
					className="text-center pt-4 pb-2 font-bold text-blue-400 flex gap-2 justify-center items-center">
					<FontAwesomeIcon icon={['fas', 'comments']} />
					ChapChat
				</UITypography>
				<div className="">
					<UsersList
						users={onlineExclMeFromList}
						online={true}
						onClick={setSelectedUser}
						selectedUser={selectedUser}
					/>
					<UsersList
						users={offlinePeople}
						online={false}
						onClick={setSelectedUser}
						selectedUser={selectedUser}
					/>
				</div>
				<AdminBox logoutHandler={logoutHandler} />
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
