import AuthCard from "@/components/shared/cards/auth/AuthCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import Header from "@/pages/auth/Header/Header";
import { HTTP_STATUS } from "@/redux/constant";
import { getUserState, loginSucceeded } from "@/redux/slices/auth/auth.store";
import { login } from "@/redux/slices/auth/auth.thunk";
import { ErrorType } from "@/types/types";
import { validEmail } from "@/utils/vaildEmail";
import { validText } from "@/utils/validText";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
	const { status } = useAppSelector(getUserState);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [email, setEmail] = useState<string>("");
	const [emailErr, setEmailErr] = useState<ErrorType>({
		active: false,
		message: null,
	});

	const [password, setPassword] = useState<string>("");
	const [passwordErr, setPasswordErr] = useState<ErrorType>({
		active: false,
		message: null,
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (validText(email)) {
			toast.error("Please fill out this field");
			setEmailErr({ active: true, message: "Please fill out this field" });
			return;
		}
		if (validEmail(email)) {
			toast.error("Invalid email address");
			setEmailErr({ active: true, message: "Invalid email address" });
			return;
		}

		if (validText(password)) {
			toast.error("Please fill out this field");
			setPasswordErr({
				active: true,
				message: "Please fill out this field",
			});
			return;
		}
		dispatch(login({ email: email, password: password }));
		console.log("Form submitted successfully");
	};

	useEffect(() => {
		if (status === HTTP_STATUS.FULFILLED) {
			dispatch(loginSucceeded());
			navigate("/");
		} else if (status === HTTP_STATUS.REJECTED) {
			dispatch(loginSucceeded());
			setEmailErr({ active: true, message: "" });
			setPasswordErr({ active: true, message: "" });
			toast.error("Login or password wrong !");
		}
	}, [dispatch, status, navigate]);

	return (
		<div className="h-full w-full bg-loginBg bg-cover bg-no-repeat flex flex-col">
			<Header />

			<main className="w-full h-full flex justify-center items-center">
				<AuthCard className="w-1/3 flex justify-center items-center flex-col">
					<div className="flex flex-col items-center mb-4">
						<h3 className="text-4xl text-white font-semibold">Welcome</h3>
					</div>
					<form onSubmit={handleSubmit} className="w-full">
						<Input
							value={email}
							setValue={setEmail}
							error={emailErr}
							setError={setEmailErr}
							className="mt-4"
							type={"TEXT"}
							placeholder={"Email"}
							disabled={false}
						/>
						<Input
							value={password}
							setValue={setPassword}
							error={passwordErr}
							setError={setPasswordErr}
							className="mt-4"
							type={"PASS"}
							placeholder={"Password"}
							disabled={false}
						/>

						<Button
							className="mt-10"
							type={"submit"}
							title={"Sign In"}
							disabled={status === HTTP_STATUS.PENDING}
						/>
					</form>
					<div className="line my-12"></div>
					<div className="flex justify-center text-2xl text-white gap-4">
						<p>Don’t have an account?</p>
						<NavLink to={"/register"} className={`text-orange`}>
							<p>Sign Up</p>
						</NavLink>
					</div>
				</AuthCard>
			</main>
		</div>
	);
};

export default Login;
