import getUserInfo from "@/utils/getUserInfo";
import React from "react";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
interface ProtectedRoutes {
	children: ReactNode;
	href: "/login";
}

const ProtectedRoutes: React.FC<ProtectedRoutes> = ({ children, href }) => {
	const login = getUserInfo();

	if (!login) {
		return <Navigate to={href} replace={true} />;
	}
	if (login) {
		return children;
	}
	return "loading";
};

export default ProtectedRoutes;
