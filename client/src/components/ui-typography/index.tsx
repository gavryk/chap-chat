import { ReactNode } from 'react';
import { useFontSize, useTitleTag } from './model/hooks';

interface TypoProps {
	variant: string;
	fontWeight?: string;
	space?: string;
	textAlign?: 'left' | 'center' | 'right';
	children: ReactNode;
}

export const UITypography = ({
	variant,
	fontWeight = 'regular',
	space = 'mb-5',
	textAlign = 'left',
	children,
}: TypoProps) => {
	const Tag: any = useTitleTag(variant);
	const FontSize = useFontSize(variant);

	return (
		<Tag className={`${space} font-${fontWeight} text-${textAlign} ${FontSize}`}>{children}</Tag>
	);
};
