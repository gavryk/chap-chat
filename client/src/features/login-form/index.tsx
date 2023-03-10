import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { UIInput, UITypography } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/slices/auth/selector';
import { fetchLogin } from '../../redux/slices/auth/asyncAuth';
import { LoginFormValue } from '../../common';

export const LoginForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const { errorString, auth } = useSelector(authSelector);
	const navigate = useNavigate();
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isSubmitSuccessful },
	} = useForm<LoginFormValue>();
	const onSubmit = (data: LoginFormValue) => {
		dispatch(fetchLogin(data));
		if (isSubmitSuccessful) {
			reset({ userName: '', password: '' });
		}
	};

	useEffect(() => {
		if (auth !== null && errorString === '') {
			navigate('/');
		}
	}, [auth, errorString, navigate]);

	return (
		<div className="flex flex-wrap py-7 mx-auto bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg max-w-xl">
			<UITypography
				variant="h2"
				fontWeight="bold"
				space="mb-8"
				align="text-center"
				className="basis-full text-white">
				Login
			</UITypography>
			<form onSubmit={handleSubmit(onSubmit)} className="sm:w-2/4 md:w-3/4 xl:w-1/2 mx-auto mb-12">
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
					Login
				</button>
				<span className="text-red-700">{errorString as React.ReactNode}</span>
				<p className="text-white">
					Dont have an account?
					<Link to="/register" className="text-sky-600 ml-1">
						Register
					</Link>
				</p>
			</form>
		</div>
	);
};
