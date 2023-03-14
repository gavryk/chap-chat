import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { InputHTMLAttributes } from 'react';
import { UILabel } from '../ui-label';

interface InputProps {
	label?: string;
	id?: string;
	type: React.HTMLInputTypeAttribute;
	required?: InputHTMLAttributes<HTMLInputElement>['required'];
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	onFocus?: React.FocusEventHandler<HTMLInputElement>;
	name?: string;
	value?: string | number;
	error?: string | boolean;
	placeholder?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onInput?: React.FormEventHandler<HTMLInputElement>;
	onClick?: React.MouseEventHandler<HTMLInputElement>;
	checked?: boolean;
	className?: string;
}

export const UIInput = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			id,
			type,
			required,
			onBlur,
			onFocus,
			name,
			placeholder,
			value,
			onChange,
			onInput,
			onClick,
			error,
			checked,
			className,
		},
		ref,
	) => {
		return (
			<div className={className}>
				{label && type !== 'radio' && type !== 'checkbox' && (
					<UILabel htmlFor={id ? id : ''}>{label}</UILabel>
				)}
				<input
					id={id}
					type={type}
					onBlur={onBlur}
					name={name}
					required={required}
					onChange={onChange}
					onInput={onInput}
					placeholder={placeholder}
					onClick={onClick}
					value={value}
					className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none w-full p-2.5 focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      ${
				error &&
				'invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
			}`}
					ref={ref}
					checked={checked}
					onFocus={onFocus}
				/>
				{label && (type === 'radio' || type === 'checkbox') && (
					<UILabel htmlFor={id ? id : ''}>{label}</UILabel>
				)}
				{type === 'search' && <FontAwesomeIcon icon={faMagnifyingGlass} />}
				{error && <span className="text-red-700">{error}</span>}
			</div>
		);
	},
);
