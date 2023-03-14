import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { UIInput, UITypography } from '../components';
import { logout } from '../redux/slices/auth/asyncAuth';
import { useAppDispatch } from '../redux/store';

export const Chat: React.FC = () => {
	const dispatch = useAppDispatch();

	const logOut = () => {
		dispatch(logout());
	};

	return (
		<div className="flex w-full">
			<div className="bg-blue-100 w-1/4">
				<UITypography variant="h3">Contacts</UITypography>
			</div>
			<div className="bg-blue-50 w-3/4 grid grid-rows-[1fr_auto] overflow-auto relative">
				<div className="p-4">
					<UITypography variant="h3">Message</UITypography>
				</div>
				<div className="flex gap-2 sticky bottom-0 p-4 bg-blue-50">
					<UIInput type="text" placeholder="Type your message here" className="flex-grow" />
					<button className="bg-blue-500 p-2 text-white w-[50px] rounded-lg">
						<FontAwesomeIcon icon={['fas', 'paper-plane']} color="#fff" />
					</button>
				</div>
			</div>
		</div>
	);
};
