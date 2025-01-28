import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { validNumber } from "@/utils/validNumber";
import { ErrorType } from "@/types/types";

type InputProps = {
	name: string;
	type: "TEXT" | "NUM" | "PASS" | "DESCRIPTION";
	placeholder: string;
	className?: string;
	value: string;
	onChange: (name: string, value: string) => void;
	error?: ErrorType;
	setError?: (error: { [x: string]: ErrorType }) => void;
	disabled: boolean;
	style?: "NORMAL" | "SMALL";
};

const Input: React.FC<InputProps> = ({
	name,
	type,
	placeholder,
	className = "",
	value,
	onChange,
	error,
	setError,
	disabled,
	style = "NORMAL",
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (disabled) {
			return;
		}
		const inputValue = e.target.value;

		if (error?.active && setError) {
			setError({ [name]: { active: false, message: null } });
		}

		if (type === "NUM" && validNumber(inputValue)) {
			return;
		}

		onChange(name, inputValue);
	};

	const inputType =
		type === "PASS"
			? isPasswordVisible
				? "TEXT"
				: "PASS"
			: type.toLowerCase();

	const inputClasses = [
		"customInput",
		style === "SMALL" && "small",
		error?.active && "error",
		disabled && "dis",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={`relative ${className}`}>
			{type === "DESCRIPTION" ? (
				<textarea
					name={name}
					placeholder={placeholder}
					className={inputClasses}
					value={value}
					onChange={handleChange}
					disabled={disabled}
				>
					{value}
				</textarea>
			) : (
				<input
					name={name}
					type={inputType}
					placeholder={placeholder}
					className={inputClasses}
					value={value}
					onChange={handleChange}
					disabled={disabled}
				/>
			)}
			{type === "PASS" && (
				<div
					onClick={() => setIsPasswordVisible(!isPasswordVisible)}
					className="inputEye"
				>
					{isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
				</div>
			)}
		</div>
	);
};

export default Input;
