import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { UIUser } from '../../components';
import { logout } from '../../redux/slices/auth/asyncAuth';
import { authSelector } from '../../redux/slices/auth/selector';
import { useAppDispatch } from '../../redux/store';

export const AdminBox: React.FC<any> = ({ logoutHandler }) => {
	const { auth } = useSelector(authSelector);
	const dispatch = useAppDispatch();

	const logOut = () => {
		dispatch(logout());
		logoutHandler();
	};

	return (
		<div className="flex justify-between items-center px-2 py-3 sticky bottom-0 bg-white">
			{auth && <UIUser {...auth} />}
			<button className="text-black hover:text-red-500 ease-in-out duration-500" onClick={logOut}>
				<FontAwesomeIcon icon={['fas', 'right-from-bracket']} />
			</button>
		</div>
	);
};
