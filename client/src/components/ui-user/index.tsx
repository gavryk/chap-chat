import React from 'react';
import avatarHolder from '../../assets/images/avatar-holder.jpg';
import { AuthProps } from '../../common';

type UserProps = Pick<AuthProps, 'userName' | 'avatarUrl'> & {
	online?: boolean;
};

export const UIUser: React.FC<UserProps> = ({ userName, avatarUrl, online }) => {
	return (
		<div className="grid grid-cols-[40px_auto] items-center gap-3">
			<div className="relative">
				<div className="rounded-full w-full overflow-hidden aspect-square">
					<img
						src={avatarUrl ? `${process.env.REACT_APP_BASE_URL}${avatarUrl}` : avatarHolder}
						alt={userName}
						className="w-full h-full object-cover object-top"
					/>
				</div>
				{online && (
					<div className="absolute w-3 h-3 border border-white bg-green-400 bottom-0 right-0 rounded-full"></div>
				)}
			</div>
			<div>
				<span>{userName}</span>
			</div>
		</div>
	);
};
