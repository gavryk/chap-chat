import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import avatarHolder from '../../assets/images/avatar-holder.jpg';
import { InputUploadProps } from '../../common';
import { UILabel } from '../ui-label';
import { AvatarLoader } from '../avatar-loader';

export const UIAvatarUploader = React.forwardRef<HTMLInputElement, InputUploadProps>(
	(
		{
			onChange,
			placeholder,
			id,
			name,
			onBlur,
			error,
			onClick,
			customClass,
			label,
			accept = 'image/*',
			multiple,
			file,
			loadImage,
			avatar,
		},
		ref,
	) => {
		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (e.target.files && e.target.files[0]) {
				let image = e.target.files[0];
				const formData = new FormData();
				formData.append('image', image);
				onChange({
					file: formData,
					imagePreviewUrl: URL.createObjectURL(image),
					fileLoaded: true,
				});
			}
		};

		const removeImage = () => {
			onChange({ file: null, imagePreviewUrl: '', fileLoaded: false });
		};
		return (
			<div className="flex items-center justify-center sm:w-1/5 w-1/4 mb-6 mx-auto relative">
				{!file?.fileLoaded ? (
					<div className="relative cursor-pointer">
						{label && (
							<UILabel htmlFor={id ? id : ''} className="absolute cursor-pointer w-full h-full">
								<FontAwesomeIcon
									icon={['fas', 'plus-circle']}
									color="#fff"
									size="2xl"
									className={`absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 cursor-pointer ${
										!loadImage && 'opacity-10'
									}`}
								/>
							</UILabel>
						)}
						{avatar && (
							<div className={`rounded-full overflow-hidden ${!loadImage && 'opacity-60'}`}>
								<img src={avatarHolder} alt="avatarHolder" />
							</div>
						)}
						<input
							id={id}
							onBlur={onBlur}
							name={name}
							type="file"
							onChange={handleChange}
							className="hidden"
							ref={ref}
							placeholder={placeholder}
							onClick={onClick}
							accept={accept}
							multiple={multiple}
							value=""
							disabled={!loadImage}
						/>
						{error && <span className="text-red-700">{error}</span>}
					</div>
				) : (
					<>
						<div
							className={`rounded-full overflow-hidden relative aspect-squere w-full h-28 ${
								!loadImage && 'opacity-60'
							}`}>
							<img src={file?.imagePreviewUrl as string} alt={file?.file?.name as string} />
						</div>
						{loadImage && (
							<div className="cursor-pointer " onClick={removeImage}>
								<FontAwesomeIcon
									icon={['fas', 'remove']}
									color="red"
									size="2xs"
									className="absolute top-2 right-1"
								/>
							</div>
						)}
					</>
				)}
				{!loadImage && <AvatarLoader />}
			</div>
		);
	},
);
