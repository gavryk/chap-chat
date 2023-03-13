import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Loader, UIAvatarUploader, UIInput, UITypography } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/slices/auth/selector';
import { ImageUpload, RegisterFormValues } from '../../common';
import { fetchRegister } from '../../redux/slices/auth/asyncAuth';
import axios from '../../axios';
import { settingsSelector } from '../../redux/slices/settings/selector';

export const RegisterForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const { errorString } = useSelector(authSelector);
	const { isLoaded } = useSelector(settingsSelector);
	const navigate = useNavigate();
	const [userImage, setUImage] = useState('');
	const [file, setFile] = useState<ImageUpload>({
		file: null,
		imagePreviewUrl: '',
		fileLoaded: false,
	});

	const setUserImage = async (imageFile: ImageUpload) => {
		setFile(imageFile);
		if (imageFile.file) {
			try {
				const { data } = await axios.post(`/upload`, imageFile.file);
				setUImage(data.url);
			} catch (err) {
				console.log(err);
			}
		} else {
			setUImage('');
			const fileUrl = userImage.replace('/uploads/', '');
			axios.delete(`/upload/${fileUrl}`);
		}
	};

	useEffect(() => {
		console.log(userImage);
	}, [userImage]);

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormValues>();
	const onSubmit = async (data: RegisterFormValues) => {
		await dispatch(fetchRegister({ ...data, avatarUrl: userImage })).then((data) => {
			const status = data.meta.requestStatus;
			if (status === 'fulfilled') {
				reset({ userName: '', userEmail: '', password: '' });
				setFile({
					file: null,
					imagePreviewUrl: '',
					fileLoaded: false,
				});
				navigate('/login');
			}
		});
	};

	return (
		<div className="flex relative min-h-[450px] flex-wrap flex-col py-7 mx-auto bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg max-w-xl">
			{isLoaded !== 'loading' ? (
				<>
					<UITypography
						variant="h2"
						fontWeight="bold"
						space="mb-8"
						align="text-center"
						className="basis-full text-white">
						Register
					</UITypography>
					<UIAvatarUploader
						onChange={setUserImage}
						label="upload image"
						id="file"
						file={file}
						avatar
					/>
					<form onSubmit={handleSubmit(onSubmit)} className="sm:w-2/4 w-3/4 mx-auto mb-12">
						<UIInput
							type="text"
							id="userNameField"
							placeholder="User Name"
							className="block w-full mb-4"
							{...register('userName', { required: 'Please enter your username.' })}
						/>
						<ErrorMessage
							errors={errors}
							name="userName"
							render={({ message }) => (
								<p className="text-red-700 flex gap-1 -mt-4 mb-2 items-center mt">
									<FontAwesomeIcon icon={['fas', 'circle-exclamation']} />
									{message}
								</p>
							)}
						/>
						<UIInput
							type="text"
							id="userEmailField"
							placeholder="User Email"
							className="block w-full mb-4"
							{...register('userEmail', { required: 'Please enter your email.' })}
						/>
						<ErrorMessage
							errors={errors}
							name="userEmail"
							render={({ message }) => (
								<p className="text-red-700 flex gap-1 -mt-4 mb-2 items-center mt">
									<FontAwesomeIcon icon={['fas', 'circle-exclamation']} />
									{message}
								</p>
							)}
						/>
						<UIInput
							type="password"
							id="passwordField"
							placeholder="password"
							className="block w-full mb-4"
							{...register('password', { required: 'Please enter your password.' })}
						/>
						<ErrorMessage
							errors={errors}
							name="password"
							render={({ message }) => (
								<p className="text-red-700 flex gap-1 -mt-4 mb-2 items-center">
									<FontAwesomeIcon icon={['fas', 'circle-exclamation']} />
									{message}
								</p>
							)}
						/>
						<button
							type="submit"
							className="bg-sky-600 hover:bg-sky-700 ease-in duration-300 text-white block w-full rounded-sm p-2 mb-2">
							Register
						</button>
						<span className="text-red-700">{errorString as React.ReactNode}</span>
						<p className="text-white">
							Already a member?
							<Link to="/login" className="text-sky-600 ml-1">
								Login
							</Link>
						</p>
					</form>
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};
