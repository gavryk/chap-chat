import { useMemo } from 'react';

type AvatarColorMap = Record<string, string>;

const AvatarColor: AvatarColorMap = {
	teal: 'bg-teal-200',
	red: 'bg-red-200',
	green: 'bg-green-200',
	purple: 'bg-purple-200',
	blue: 'bg-blue-200',
	yellow: 'bg-yellow-200',
	orange: 'bg-orange-200',
	pink: 'bg-pink-200',
	fuchsia: 'bg-fuchsia-200',
	rose: 'bg-rose-200',
};

const calculateColor = (userId: string, alt: string): string => {
	const userIdBase10 = userId
		? parseInt(userId?.substring(10), 16)
		: parseInt(alt?.substring(10), 16);

	const colors = Object.values(AvatarColor);
	const colorIndex = userIdBase10 % colors.length;

	return colors[colorIndex];
};

export const useAvatarHolder = (userId: string, alt: string) => {
	const color = useMemo(() => calculateColor(userId, alt), [userId]);

	return color;
};
