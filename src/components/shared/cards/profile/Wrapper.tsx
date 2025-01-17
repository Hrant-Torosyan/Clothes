import React, { ReactNode } from "react";

type Props = {
	children: ReactNode;
	className?: string;
};

const Wrapper: React.FC<Props> = ({ children, className }) => {
	return (
		<div
			className={`p-8 bg-appBlack w-full rounded-[2.4rem] text-white ${className}`}
		>
			{children}
		</div>
	);
};

export default Wrapper;
