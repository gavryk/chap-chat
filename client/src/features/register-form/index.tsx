import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { UIInput, UITypography } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const RegisterForm: React.FC = () => {
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
		<div className="bg-blue-50 h-screen flex flex-wrap place-content-center items-center justify-center">
			<UITypography
				variant="h2"
				fontWeight="bold"
				space="mb-8"
				align="text-center"
				className="basis-full">
				Register
			</UITypography>
			<form onSubmit={handleSubmit(onSubmit)} className="w-64 mx-auto mb-12">
				<UIInput
					type="text"
					id="userNameField"
					label="User Name"
					className="block w-full rounded-sm p-2 mb-2 border"
					{...register('fullName', { required: 'Please enter your username.' })}
				/>
				<ErrorMessage
					errors={errors}
					name="fullName"
					render={({ message }) => (
						<p className="text-red-700 flex gap-1 items-center">
							<FontAwesomeIcon icon={['fas', 'circle-exclamation']} />
							{message}
						</p>
					)}
				/>
				<UIInput
					type="email"
					id="emailField"
					label="Email"
					className="block w-full rounded-sm p-2 mb-2 border"
					{...register('email', { required: 'Please enter your email.' })}
				/>
				<ErrorMessage
					errors={errors}
					name="email"
					render={({ message }) => (
						<p className="text-red-700 text-red-700 flex gap-1 items-center">
							<FontAwesomeIcon icon={['fas', 'circle-exclamation']} />
							{message}
						</p>
					)}
				/>
				<button type="submit" className="bg-blue-500 text-white block w-full rounded-sm p-2">
					Send
				</button>
			</form>
		</div>
	);
};
