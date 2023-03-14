export interface InputUploadProps {
	onChange: (file: ImageUpload) => void;
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	placeholder?: string;
	id?: string;
	name?: string;
	error?: string;
	onClick?: React.MouseEventHandler<HTMLInputElement>;
	customClass?: string;
	label?: string;
	accept?: string;
	multiple?: boolean;
	file: ImageUpload;
	loadImage: boolean;
	avatar?: boolean;
}

export type ImageUpload = {
	file: File | null | any;
	imagePreviewUrl: string;
	fileLoaded: boolean;
};
