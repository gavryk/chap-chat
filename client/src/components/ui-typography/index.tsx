import { ReactNode } from 'react';
import { useFontSize, useTitleTag } from './model/hooks';

interface TypoProps {
	variant: string;
	fontWeight?: string;
	space?: string;
	align?: string;
	children: ReactNode;
	className?: string;
}

export const UITypography = ({
	variant,
	fontWeight = 'regular',
	space = 'mb-5',
	align = 'text-left',
	children,
	className,
}: TypoProps) => {
	const Tag: any = useTitleTag(variant);
	const fontSize = useFontSize(variant);

	return (
		<Tag className={`${space} font-${fontWeight} ${align} ${fontSize} ${className}`}>
			{children}
		</Tag>
	);
};
