import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UITypography } from '../components';
import { authSelector } from '../redux/slices/auth/selector';

export const Chat: React.FC = () => {
	const { auth } = useSelector(authSelector);

	return auth ? (
		<div>
			<UITypography variant="h1" fontWeight="semibold" space="mb-0">
				Chat
			</UITypography>
		</div>
	) : (
		<>
			<UITypography variant="h2" fontWeight="semiBold" className="text-cyan-50 text-center">
				Please log in to chat
			</UITypography>
			<div className="flex justify-center">
				<Link
					to="/login"
					className="text-white transition ease-in-out duration-700 bg-lime-600 px-10 border border-transparent py-3 rounded-lg bg-opacity-80 hover:bg-transparent hover:border-white">
					Login
				</Link>
			</div>
		</>
	);
};
