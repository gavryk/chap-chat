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
					className="w-full rounded-sm border p-2"
					ref={ref}
					checked={checked}
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
