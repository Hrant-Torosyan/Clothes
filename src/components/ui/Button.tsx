import React from "react";

type ButtonProps = {
	title: string;
	onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
	type: "button" | "submit";
	disabled: boolean;
	className?: string;
	style?: "NORMAL" | "SMALL" | "SMALLER";
	reverse?: boolean;
};

const Button: React.FC<ButtonProps> = ({
	title,
	onClick,
	type,
	disabled,
	className,
	style = "NORMAL",
	reverse = false,
}) => {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!disabled && onClick) {
			onClick(e);
		}
	};
	return (
		<button
			type={type}
			onClick={handleClick}
			className={`customButton active:scale-95
				${style === "NORMAL" ? "" : style === "SMALL" ? "small" : "smaller"} 
				${reverse ? "reverse" : ""}
				${disabled ? "dis" : ""} ${className}`}
			disabled={disabled}
		>
			{title}
		</button>
	);
};

export default Button;
