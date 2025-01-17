import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { validNumber } from "@/utils/validNumber";
import { ErrorType } from "@/types/types";

type InputProps = {
	type: "TEXT" | "NUM" | "PASS";
	placeholder: string;
	className?: string;
	value: string;
	setValue: (val: string) => void;
	error?: ErrorType;
	setError?: (val: ErrorType) => void;
	disabled: boolean;
	style?: "NORMAL" | "SMALL";
};

const Input: React.FC<InputProps> = ({
	type,
	placeholder,
	className = "",
	value,
	setValue,
	error,
	setError,
	disabled,
	style = "NORMAL",
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;

		if (error?.active && setError) {
			setError({ active: false, message: null });
		}

		if (type === "NUM" && !validNumber(inputValue)) {
			return;
		}

		setValue(inputValue);
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
			<input
				type={inputType}
				placeholder={placeholder}
				className={inputClasses}
				value={value}
				onChange={handleChange}
				disabled={disabled}
			/>
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
