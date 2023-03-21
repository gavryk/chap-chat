import { useMemo } from 'react';
export const useAvatarHolder = (userId: string, alt: string) => {
	const colors = [
		'bg-teal-200',
		'bg-red-200',
		'bg-green-200',
		'bg-purple-200',
		'bg-blue-200',
		'bg-yellow-200',
		'bg-orange-200',
		'bg-pink-200',
		'bg-fuchsia-200',
		'bg-rose-200',
	];
	const userIdBase10 = userId
		? parseInt(userId.substring(10), 16)
		: parseInt(alt.substring(10), 16);
	const colorIndex = userIdBase10 % colors.length;
	const color = colors[colorIndex];
	return useMemo(() => {
		return color;
	}, [userId]);
};
