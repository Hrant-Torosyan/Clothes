import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import LoginForm from "@/pages/auth/Login/_components/LoginForm";
import { HTTP_STATUS } from "@/redux/constant";
import { getUserState } from "@/redux/slices/auth/auth.store";
import { login } from "@/redux/slices/auth/auth.thunk";
import { ErrorTypes } from "@/types/types";
import { validEmail } from "@/utils/vaildEmail";
import { validText } from "@/utils/validText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
	const { status } = useAppSelector(getUserState);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [loginPayload, setLoginPayload] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<ErrorTypes>({});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (validText(loginPayload.email)) {
			toast.error("Please fill out this field");
			setErrors({
				email: { active: true, message: "Please fill out this field" },
			});
			return;
		}
		if (validEmail(loginPayload.email)) {
			toast.error("Invalid email address");
			setErrors({
				email: { active: true, message: "Invalid email address" },
			});
			return;
		}

		if (validText(loginPayload.password)) {
			toast.error("Please fill out this field");
			setErrors({
				password: { active: true, message: "Please fill out this field" },
			});
			return;
		}
		dispatch(login(loginPayload))
			.unwrap()
			.then(() => {
				navigate("/");
			})
			.catch((error) => {
				setErrors({
					password: { active: true, message: error.message },
					email: { active: true, message: error.message },
				});
			});
	};

	return (
		<LoginForm
			loginPayload={loginPayload}
			errors={errors}
			setErrors={setErrors}
			onInputChange={(name, value) =>
				setLoginPayload((prevState) => ({
					...prevState,
					[name]: value,
				}))
			}
			onSubmit={handleSubmit}
			isSubmitting={status === HTTP_STATUS.PENDING}
		/>
	);
};

export default Login;
