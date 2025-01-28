import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { ErrorType, ErrorTypes } from "@/types/types";
import Header from "@/components/Layouts/Header/Header";
import AuthCard from "@/components/shared/cards/auth/AuthCard";
import { NavLink } from "react-router-dom";

type LoginFormProps = {
	loginPayload: { email: string; password: string };
	errors: ErrorTypes;
	onInputChange: (name: string, value: string) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	isSubmitting: boolean;
	setErrors: (error: { [x: string]: ErrorType }) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({
	loginPayload,
	errors,
	onInputChange,
	onSubmit,
	isSubmitting,
	setErrors,
}) => {
	return (
		<div className="h-full w-full bg-loginBg bg-cover bg-no-repeat flex flex-col">
			<Header />

			<main className="w-full h-full flex justify-center items-center">
				<AuthCard className="w-1/3 flex justify-center items-center flex-col">
					<div className="flex flex-col items-center mb-4">
						<h3 className="text-4xl text-white font-semibold">Welcome</h3>
					</div>
					<form onSubmit={onSubmit} className="w-full">
						<Input
							name="email"
							value={loginPayload.email}
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
							value={loginPayload.password}
							onChange={onInputChange}
							error={errors.password}
							setError={setErrors}
							className="mt-4"
							type={"PASS"}
							placeholder={"Password"}
							disabled={false}
						/>

						<Button
							className="mt-10"
							type={"submit"}
							title={"Sign In"}
							disabled={isSubmitting}
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

export default LoginForm;
