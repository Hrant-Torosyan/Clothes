import { NavLink } from "react-router-dom";

const LoginOrReg = () => {
	return (
		<div className="flex flex-col gap-6">
			<NavLink
				to={"/login"}
				className={`px-5 w-full text-center py-3 text-base bg-gray border-solid rounded-xl border-appLightBlack transition-all hover:bg-orange`}
			>
				<span>Login</span>
			</NavLink>
			<p >If you don't have an account please register</p>
			<NavLink
				to={"/register"}
				className={`px-5 w-full text-center py-3 text-base bg-gray border-solid rounded-xl border-appLightBlack transition-all hover:bg-orange`}
			>
				<span>Register</span>
			</NavLink>
		</div>
	);
};

export default LoginOrReg;
