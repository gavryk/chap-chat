import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { UIInput, UITypography } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export const LoginForm: React.FC = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm();
	const onSubmit = (data: any) => {
		console.log(data);
	};

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
			<form onSubmit={handleSubmit(onSubmit)} className="w-2/4 mx-auto mb-12">
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
