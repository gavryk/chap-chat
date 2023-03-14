import React from 'react';
import avatarHolder from '../../assets/images/avatar-holder.jpg';
import { AuthProps } from '../../common';

type UserProps = Pick<AuthProps, 'userName' | 'avatarUrl'>;

export const UIUser: React.FC<UserProps> = ({ userName, avatarUrl }) => {
	return (
		<div className="grid grid-cols-[40px_auto] items-center gap-3">
			<div className="rounded-full w-full overflow-hidden aspect-square">
				<img
					src={avatarUrl ? `${process.env.REACT_APP_BASE_URL}${avatarUrl}` : avatarHolder}
					alt={userName}
					className="w-full h-full object-cover object-top"
				/>
			</div>
			<div>
				<span>{userName}</span>
			</div>
		</div>
	);
};
