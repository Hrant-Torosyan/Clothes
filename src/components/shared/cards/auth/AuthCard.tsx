import React, { ReactNode } from "react";

type Props = {
	children: ReactNode;
	className?: string;
};

const AuthCard: React.FC<Props> = ({ children, className }) => {
	return <div className={`p-16 bg-appBlack rounded-[2.4rem] ${className}`}>{children}</div>;
};

export default AuthCard;
