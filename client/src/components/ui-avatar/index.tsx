import React from 'react';
import { useAvatarHolder } from './model';

type AvatarProps = {
	avatarUrl?: string;
	alt: string;
	online?: boolean;
	userId: string;
};

export const UIAvatar: React.FC<AvatarProps> = ({ userId, avatarUrl, alt, online }) => {
	const avatarColor = useAvatarHolder(userId || '11111111111111', alt || 'default-alt');

	return (
		<div className="relative">
			<div
				className={`rounded-full w-full overflow-hidden aspect-square ${avatarColor} flex justify-center items-center`}>
				{avatarUrl ? (
					<img
						src={avatarUrl && `${process.env.REACT_APP_BASE_URL}${avatarUrl}`}
						alt={alt}
						className="w-full h-full object-cover object-top"
					/>
				) : (
					<span className="font-bold text-neutral-700">{alt[0]}</span>
				)}
			</div>
			{online && (
				<div className="absolute w-3 h-3 border border-white bg-green-400 bottom-0 right-0 rounded-full"></div>
			)}
		</div>
	);
};
