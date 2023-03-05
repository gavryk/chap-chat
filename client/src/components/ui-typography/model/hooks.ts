export const useTitleTag = (variant: string) => {
	if (variant[0] === 'h') return `${variant}`;
	if (variant.includes('subtitle')) return `h6`;
	if (variant.includes('body')) return `p`;
	if (variant.includes('caption')) return `span`;
	return `div` as keyof JSX.IntrinsicElements;
};

export const useFontSize = (variant: string) => {
	switch (variant) {
		case 'h1':
			return 'text-6xl';
		case 'h2':
			return 'text-5xl';
		case 'h3':
			return 'text-4xl';
		case 'h4':
			return 'text-3xl';
		case 'h5':
			return 'text-2xl';
		case 'h6':
			return 'text-xl';
		case 'p':
			return 'text-lg';
		case 'span':
			return 'text-sm';
		default:
			return 'text-base';
	}
};
