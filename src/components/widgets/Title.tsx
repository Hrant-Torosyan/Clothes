import React from "react";

type TitleProps = {
	title: string;
	className?: string;
};

const Title: React.FC<TitleProps> = ({ title, className }) => {
	return (
		<h1 className={`text-5xl text-white mb-16 font-bold ${className}`}>
			{title}
		</h1>
	);
};

export default Title;
