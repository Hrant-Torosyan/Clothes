import Image from "@/components/shared/Image/Image";
import { useAppSelector } from "@/hooks/reduxHooks";
import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
	const { user } = useAppSelector((state) => state.auth);
	return (
		<header className="w-full bg-appBlack text-white p-4 px-8 flex items-center justify-end">
			{user ? (
				<NavLink to={"/profile"}>
					<div className="flex gap-3 items-center">
						<div className="w-16 h-16 rounded-full bg-appLightBlack flex justify-center items-center">
							<Image
								className="w-1/3 h-auto"
								url="/icons/noImage.svg"
								alt={"Logo"}
							/>
						</div>
						<h3 className="text-white text-base">{user.fullName}</h3>
					</div>
				</NavLink>
			) : (
				<div className="flex gap-3">
					<NavLink
						to={"/login"}
						className={`px-5 py-3 text-base bg-gray border-solid rounded-xl border-appLightBlack transition-all hover:bg-orange`}
					>
						<span>Login</span>
					</NavLink>
					<NavLink
						to={"/register"}
						className={`px-5 py-3 text-base bg-gray border-solid rounded-xl border-appLightBlack transition-all hover:bg-orange`}
					>
						<span>Register</span>
					</NavLink>
				</div>
			)}
		</header>
	);
};

export default Header;
