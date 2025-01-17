import AuthCard from "@/components/shared/cards/auth/AuthCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import Header from "@/pages/auth/Header/Header";
import { HTTP_STATUS } from "@/redux/constant";
import {
	getUserState,
	registerSucceeded,
} from "@/redux/slices/auth/auth.store";
import { register } from "@/redux/slices/auth/auth.thunk";
import { ErrorType } from "@/types/types";
import { validEmail } from "@/utils/vaildEmail";
import { validText } from "@/utils/validText";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { register: registerState } = useAppSelector(getUserState);
	const { status, error } = registerState;
	const [fullName, setFullName] = useState<string>("");
	const [fullNameErr, setFullNameErr] = useState<ErrorType>({
		active: false,
		message: null,
	});

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

	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [confirmPasswordErr, setConfirmPasswordErr] = useState<ErrorType>({
		active: false,
		message: null,
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (validText(fullName)) {
			toast.error("Please fill out this field");
			setFullNameErr({
				active: true,
				message: "Please fill out this field",
			});
			return;
		}

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

		if (validText(confirmPassword)) {
			toast.error("Please fill out this field");

			setConfirmPasswordErr({
				active: true,
				message: "Please fill out this field",
			});
			return;
		}
		if (confirmPassword !== password) {
			toast.error("Passwords do not match. Please try again.");

			setPasswordErr({
				active: true,
				message: "Passwords do not match",
			});
			setConfirmPasswordErr({
				active: true,
				message: "Passwords do not match",
			});

			return;
		}
		dispatch(
			register({
				fullName: fullName,
				email: email,
				password: password,
				image: "NoImage",
				favorites: [],
				basket: [],
			})
		);
	};

	useEffect(() => {
		if (status === HTTP_STATUS.FULFILLED) {
			dispatch(registerSucceeded());
			navigate("/login");
			toast.success("Register successfully");
		} else if (status === HTTP_STATUS.REJECTED) {
			dispatch(registerSucceeded());
			toast.error(error.message);
			setEmailErr({ active: true, message: error.message });
		}
	}, [dispatch, error, navigate, status]);
	return (
		<div className="h-full w-full bg-loginBg bg-cover bg-no-repeat flex flex-col">
			<Header />
			<main className="w-full h-full flex justify-center items-center">
				<AuthCard className="w-1/3 flex justify-center items-center flex-col">
					<div className="flex flex-col items-center mb-4">
						<h3 className="text-4xl text-white font-semibold">Sign Up</h3>
					</div>
					<form onSubmit={handleSubmit} className="w-full">
						<Input
							value={fullName}
							setValue={setFullName}
							error={fullNameErr}
							setError={setFullNameErr}
							className="mt-4"
							type={"TEXT"}
							placeholder={"Full name"}
							disabled={false}
						/>
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
						<Input
							value={confirmPassword}
							setValue={setConfirmPassword}
							error={confirmPasswordErr}
							setError={setConfirmPasswordErr}
							className="mt-4"
							type={"PASS"}
							placeholder={"Confirm password"}
							disabled={false}
						/>

						<Button
							className="mt-10"
							type={"submit"}
							title={"Sign Up"}
							disabled={status === HTTP_STATUS.PENDING}
						/>
					</form>
					<div className="line my-12"></div>
					<div className="flex justify-center text-2xl text-white gap-4">
						<p>Do you have an account?</p>
						<NavLink to={"/login"} className={`text-orange`}>
							<p>Sign In</p>
						</NavLink>
					</div>
				</AuthCard>
			</main>
		</div>
	);
};

export default Register;
