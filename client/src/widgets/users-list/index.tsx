import React from 'react';
import { AuthProps, ChatUserProp } from '../../common';
import { UIUser } from '../../components';

interface UserListProps {
	users: AuthProps[] | ChatUserProp[];
	online: boolean;
	selectedUser: string;
	onClick: (id: string) => void;
}

export const UsersList: React.FC<UserListProps> = React.memo(
	({ users, online, onClick, selectedUser }) => {
		return (
			<div className="relative">
				{users?.map((user: any) => (
					<UIUser
						online={online}
						{...user}
						userId={user._id || user.userId}
						key={user?.userId || user?._id}
						onClick={() => onClick(user._id || user.userId)}
						className={`py-2 px-3 cursor-pointer duration-500 hover:bg-sky-200 ${
							selectedUser === user._id || selectedUser === user.userId ? 'bg-sky-200' : ''
						}`}
					/>
				))}
			</div>
		);
	},
);
