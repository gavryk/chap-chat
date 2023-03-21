import React from 'react';
import { AuthProps, ChatUserProp } from '../../common';
import { UIUser } from '../../components';

interface UserListProps {
	users: AuthProps[] | ChatUserProp[];
	online: boolean;
	selectedUser: string;
	onClick: (id: string) => void;
}

export const UsersList: React.FC<UserListProps> = ({ users, online, onClick, selectedUser }) => {
	return (
		<div className="relative">
			{users?.map((user: any) => (
				<UIUser
					online={online}
					{...user}
					key={user?.userId || user?._id}
					onClick={() => onClick(user.userId || user._id)}
					className={`py-2 px-3 cursor-pointer duration-500 hover:bg-sky-200 ${
						user.userId || user._id
					} ${selectedUser === user._id || selectedUser === user.userId ? 'bg-sky-200' : ''}`}
				/>
			))}
		</div>
	);
};
