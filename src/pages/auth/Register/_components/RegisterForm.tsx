import Header from "@/components/Layouts/Header/Header";
import AuthCard from "@/components/shared/cards/auth/AuthCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ErrorType, ErrorTypes, UserType } from "@/types/types";
import React from "react";
import { NavLink } from "react-router-dom";

type RegisterFormProps = {
	registerPayload: Omit<UserType, "id">;
	errors: ErrorTypes;
	onInputChange: (name: string, value: string) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	isSubmitting: boolean;
	setErrors: (error: { [x: string]: ErrorType }) => void;
};

const RegisterForm: React.FC<RegisterFormProps> = ({
	registerPayload,
	errors,
	onInputChange,
	onSubmit,
	setErrors,
	isSubmitting,
}) => {
	return (
		<div className="h-full w-full bg-loginBg bg-cover bg-no-repeat flex flex-col">
			<Header />
			<main className="w-full h-full flex justify-center items-center">
				<AuthCard className="w-1/3 flex justify-center items-center flex-col">
					<div className="flex flex-col items-center mb-4">
						<h3 className="text-4xl text-white font-semibold">Sign Up</h3>
					</div>
					<form onSubmit={onSubmit} className="w-full">
						<Input
							name="fullName"
							value={registerPayload.fullName}
							onChange={onInputChange}
							error={errors.fullName}
							setError={setErrors}
							className="mt-4"
							type={"TEXT"}
							placeholder={"Full name"}
							disabled={false}
						/>
						<Input
							name="email"
							value={registerPayload.email}
							onChange={onInputChange}
							error={errors.email}
							setError={setErrors}
							className="mt-4"
							type={"TEXT"}
							placeholder={"Email"}
							disabled={false}
						/>
						<Input
							name="password"
							value={registerPayload.password}
							onChange={onInputChange}
							error={errors.password}
							setError={setErrors}
							className="mt-4"
							type={"PASS"}
							placeholder={"Password"}
							disabled={false}
						/>
						<Input
							name="confirmPassword"
							value={registerPayload.confirmPassword}
							onChange={onInputChange}
							error={errors.confirmPassword}
							setError={setErrors}
							className="mt-4"
							type={"PASS"}
							placeholder={"Confirm password"}
							disabled={false}
						/>

						<Button
							className="mt-10"
							type={"submit"}
							title={"Sign Up"}
							disabled={isSubmitting}
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

export default RegisterForm;
