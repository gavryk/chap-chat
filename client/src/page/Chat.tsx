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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setLoading } from '../redux/slices/settings/slice';
import { settingsSelector } from '../redux/slices/settings/selector';
import { uniqBy } from 'lodash';

export const Chat: React.FC = () => {
	const dispatch = useAppDispatch();
	const { auth } = useSelector(authSelector);
	const { online } = useSelector(chatSelector);
	const { isLoaded } = useSelector(settingsSelector);
	const [inputText, setInputText] = useState<string>('');
	const [connectUser, setConnectUser] = useState<string>('');
	const [selectedUser, setSelectedUser] = useState<any>(null);
	const [offlinePeople, setOfflinePeople] = useState<AuthProps[]>([]);
	const [messages, setMessages] = useState<any[]>([]);
	const socket = useRef<any>(null);
	const msgBox = useRef<HTMLDivElement>(null);

	const connectToWs = () => {
		setLoading('loading');
		socket.current = new WebSocket(`wss://${process.env.REACT_APP_SOCKET_URL}`);
		socket.current.addEventListener('open', () => {
			socket.current.send(
				JSON.stringify({
					id: auth?._id,
					userName: auth?.userName,
					method: 'connection',
				}),
			);
		});
		socket.current.addEventListener('message', handleMessage);
		setLoading('success');
	};

	const logoutHandler = () => {
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

	useEffect(() => {
		if (connectUser !== '') {
			toast(`User ${connectUser} connected!`);
		}
	}, [connectUser]);

	const handleMessage = (ev: any) => {
		const messageData = JSON.parse(ev.data);
		if (
			'online' in messageData &&
			Array.isArray(messageData.online) &&
			messageData.online.length > 0
		) {
			dispatch(setOnlinePeople(messageData.online));
		} else if ('connectUser' in messageData) {
			setConnectUser(messageData.connectUser.userName);
		} else if ('text' in messageData) {
			setMessages((prev) => [...prev, { ...messageData }]);
		}
	};

	const sendMessage = (ev: any) => {
		if (ev) ev.preventDefault();
		socket.current.send(
			JSON.stringify({
				method: 'message',
				message: {
					recipient: selectedUser,
					text: inputText,
				},
			}),
		);
		setInputText('');
		setMessages((prev) => [
			...prev,
			{ text: inputText, sender: auth?._id, recipient: selectedUser, _id: Date.now() },
		]);
	};

	useEffect(() => {
		const div = msgBox.current;
		if (div) {
			div.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [messages]);

	useEffect(() => {
		if (selectedUser) {
			axios.get(`/messages/${selectedUser}`).then((res) => {
				setMessages(res.data);
			});
		}
	}, [selectedUser]);

	const onlineExclMeFromList = online.filter(({ userName }) => userName !== auth?.userName);
	const messagesWithoutDupes = uniqBy(messages, '_id');

	return (
		<div className="flex w-full">
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
			<div className="bg-blue-50 w-1/4 grid grid-rows-[auto_1fr_auto] overflow-auto relative">
				<UITypography
					variant="h3"
					className="text-center pt-4 pb-2 font-bold text-blue-400 flex gap-2 justify-center items-center">
					<FontAwesomeIcon icon={['fas', 'comments']} />
					ChapChat
				</UITypography>
				<div className="">
					{online.length > 0 && (
						<UsersList
							users={onlineExclMeFromList}
							online={true}
							onClick={setSelectedUser}
							selectedUser={selectedUser}
						/>
					)}
					{offlinePeople.length > 0 && (
						<UsersList
							users={offlinePeople}
							online={false}
							onClick={setSelectedUser}
							selectedUser={selectedUser}
						/>
					)}
				</div>
				{isLoaded === 'success' && <AdminBox logoutHandler={logoutHandler} />}
			</div>
			<div className="bg-blue-100 w-3/4 grid grid-rows-[1fr_auto] overflow-y-auto relative">
				{!!selectedUser && (
					<div className="p-4">
						{messagesWithoutDupes.map((mess, index) => (
							<div
								className={mess.sender === auth?._id ? 'text-right' : 'text-left'}
								key={`${mess.text}_${index}`}>
								<div
									className={`p-2 my-2 rounded-md text-sm inline-block ${
										mess.sender === auth?._id ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'
									}`}>
									{mess.text}
								</div>
							</div>
						))}
						<div ref={msgBox}></div>
					</div>
				)}
				{!!selectedUser && (
					<form onSubmit={sendMessage} className="flex gap-2 sticky bottom-0 px-4 py-3 bg-blue-100">
						<UIInput
							type="text"
							placeholder="Type your message here"
							className="flex-grow"
							value={inputText}
							onChange={(e) => setInputText(e.target.value)}
						/>
						<button type="submit" className="bg-blue-500 p-2 text-white w-[50px] rounded-lg">
							<FontAwesomeIcon icon={['fas', 'paper-plane']} color="#fff" />
						</button>
					</form>
				)}
			</div>
		</div>
	);
};
