import React from 'react';
import { AuthProps } from '../../common';
import { UIAvatar } from '../ui-avatar';

type UserProps = Pick<AuthProps, 'userName' | 'avatarUrl'> & {
	userId: string;
	online?: boolean;
	onClick?: () => void;
	className?: string;
};

export const UIUser: React.FC<UserProps> = ({
	userId,
	userName,
	avatarUrl,
	online,
	onClick,
	className,
}) => {
	return (
		<div className={`grid grid-cols-[40px_auto] items-center gap-3 ${className}`} onClick={onClick}>
			<UIAvatar avatarUrl={avatarUrl} alt={userName} userId={userId} online={online} />
			<div>
				<span>{userName}</span>
			</div>
		</div>
	);
};
