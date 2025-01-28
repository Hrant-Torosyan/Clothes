import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import RegisterForm from "@/pages/auth/Register/_components/RegisterForm";
import { HTTP_STATUS } from "@/redux/constant";
import { getUserState } from "@/redux/slices/auth/auth.store";
import { register } from "@/redux/slices/auth/auth.thunk";
import { ErrorTypes, UserType } from "@/types/types";
import { validEmail } from "@/utils/vaildEmail";
import { validText } from "@/utils/validText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { register: registerState } = useAppSelector(getUserState);
	const { status } = registerState;
	const [registerPayload, setRegisterPayload] = useState<Omit<UserType, "id">>(
		{
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
			image: "NoImage",
			favorites: [],
			basket: [],
			role: "USER",
		}
	);
	const [errors, setErrors] = useState<ErrorTypes>({});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (validText(registerPayload.fullName)) {
			toast.error("Please fill out this field");
			setErrors({
				fullName: {
					active: true,
					message: "Please fill out this field",
				},
			});
			return;
		}

		if (validText(registerPayload.email)) {
			toast.error("Please fill out this field");
			setErrors({
				email: {
					active: true,
					message: "Please fill out this field",
				},
			});
			return;
		}
		if (validEmail(registerPayload.email)) {
			toast.error("Invalid email address");
			setErrors({
				email: {
					active: true,
					message: "Invalid email address",
				},
			});
			return;
		}

		if (validText(registerPayload.password)) {
			toast.error("Please fill out this field");
			setErrors({
				email: {
					active: true,
					message: "Please fill out this field",
				},
			});
			return;
		}

		if (validText(registerPayload.confirmPassword)) {
			toast.error("Please fill out this field");

			setErrors({
				confirmPassword: {
					active: true,
					message: "Please fill out this field",
				},
			});
			return;
		}
		if (registerPayload.confirmPassword !== registerPayload.password) {
			toast.error("Passwords do not match. Please try again.");
			setErrors({
				password: {
					active: true,
					message: "Passwords do not match",
				},
				confirmPassword: {
					active: true,
					message: "Passwords do not match",
				},
			});
			return;
		}
		dispatch(register(registerPayload))
			.unwrap()
			.then(() => {
				setRegisterPayload((prevState) => ({
					...prevState,
					password: "",
					confirmPassword: "",
					email: "",
					fullName: "",
				}));
				navigate("/login");
			})
			.catch((err) => {
				setErrors({
					email: {
						active: true,
						message: err.message,
					},
				});
			});
	};

	return (
		<RegisterForm
			errors={errors}
			registerPayload={registerPayload}
			setErrors={setErrors}
			onSubmit={handleSubmit}
			onInputChange={(name, value) =>
				setRegisterPayload((prevState) => ({
					...prevState,
					[name]: value,
				}))
			}
			isSubmitting={status === HTTP_STATUS.PENDING}
		/>
	);
};

export default Register;
