import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UITypography } from '../components';
import { logout } from '../redux/slices/auth/asyncAuth';
import { authSelector } from '../redux/slices/auth/selector';
import { useAppDispatch } from '../redux/store';

export const Chat: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { auth } = useSelector(authSelector);

	const logOut = () => {
		dispatch(logout());
	};

	if (!auth) {
		navigate('/login', { replace: true });
	}

	return (
		<div>
			<UITypography variant="h1" fontWeight="semibold" space="mb-0">
				Chat
			</UITypography>
			<button className="py-2 px-7 bg-red-500 text-white rounded-lg my-3" onClick={logOut}>
				Logout
			</button>
		</div>
	);
};
