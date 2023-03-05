import React, { ReactNode } from 'react';

interface LabelProps {
	children: ReactNode;
	htmlFor: string;
	className?: string;
}

export const UILabel: React.FC<LabelProps> = ({ htmlFor, className, children }) => {
	return (
		<label className={className} htmlFor={htmlFor}>
			{children}
		</label>
	);
};
