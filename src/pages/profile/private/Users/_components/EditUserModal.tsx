import Modal from "@/components/shared/Modal/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SimpleSelect from "@/components/ui/SimpleSelect";
import { countries } from "@/constants/countries";
import { gender } from "@/constants/gender";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { HTTP_STATUS } from "@/redux/constant";
import { getUserState } from "@/redux/slices/auth/auth.store";
import { updateUserInfo } from "@/redux/slices/auth/auth.thunk";
import { ErrorTypes, UserType } from "@/types/types";
import { validEmail } from "@/utils/vaildEmail";
import { validText } from "@/utils/validText";
import { useState } from "react";
import { toast } from "sonner";

type EditUserModalProps = {
	editUserModal: null | UserType;
	onClose: () => void;
};

const EditUserModal = ({ editUserModal, onClose }: EditUserModalProps) => {
	const dispatch = useAppDispatch();
	const { updateUserInfo: updateState } = useAppSelector(getUserState);
	const [formData, setFormData] = useState({ ...editUserModal });
	const [errors, setErrors] = useState<ErrorTypes>({});
	const handleChange = (name: string, value: string) => {
		const [currentName, currentSurname] = formData.fullName.split(" ");
		if (name === "name" || name === "surname") {
			const updatedFullName =
				name === "name"
					? `${value} ${currentSurname || ""}`.trim()
					: `${currentName || ""} ${value}`.trim();

			setFormData((prevState) => ({
				...prevState,
				fullName: updatedFullName,
			}));
		} else {
			setFormData((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (validText(formData.email)) {
			toast.error("Please fill out this field");
			setErrors({
				email: { active: true, message: "Please fill out this field" },
			});
			return;
		}
		if (validEmail(formData.email)) {
			toast.error("Invalid email address");
			setErrors({
				email: { active: true, message: "Invalid email address" },
			});
			return;
		}
		dispatch(updateUserInfo({ type: "ADMIN", user: formData }))
			.unwrap()
			.then(() => {
				onClose();
			})
			.catch((err) => {
				setErrors({
					email: { active: true, message: err.message },
				});
			});
	};

	return (
		Boolean(editUserModal) && (
			<Modal
				title="User Edite"
				isOpen={Boolean(editUserModal)}
				onClose={onClose}
			>
				<form onSubmit={handleSubmit}>
					<div className="mb-10">
						<h2 className="text-2xl opacity-70 font-bold mb-7">
							Personal info
						</h2>
						<div className="flex gap-8 mb-6">
							<label className="w-full">
								<h3 className="text-xl ml-1 mb-2">Name</h3>
								<Input
									name="name"
									value={formData?.fullName?.split?.(" ")?.[0] || ""}
									onChange={(name, value) => handleChange(name, value)}
									error={errors.fullName}
									style="SMALL"
									setError={setErrors}
									className="w-full"
									type={"TEXT"}
									placeholder={"Name"}
									disabled={false}
								/>
							</label>
							<label className="w-full">
								<h3 className="text-xl ml-1 mb-2">Surname</h3>
								<Input
									name="surname"
									value={formData?.fullName?.split?.(" ")?.[1] || ""}
									onChange={(name, value) => handleChange(name, value)}
									error={errors.surname}
									style="SMALL"
									setError={setErrors}
									className="w-full"
									type={"TEXT"}
									placeholder={"Surname"}
									disabled={false}
								/>
							</label>
						</div>
						<div className="flex gap-6">
							<label className="w-full">
								<h3 className="text-xl ml-1 mb-2">Age</h3>
								<Input
									name="age"
									value={formData.age}
									onChange={(name, value) => handleChange(name, value)}
									error={errors.age}
									style="SMALL"
									setError={setErrors}
									className="w-full"
									type={"NUM"}
									placeholder={"Age"}
									disabled={false}
								/>
							</label>
							<label className="w-full">
								<h3 className="text-xl ml-1 mb-2">Email</h3>
								<Input
									name="email"
									value={formData.email}
									onChange={(name, value) => handleChange(name, value)}
									error={errors.email}
									style="SMALL"
									setError={setErrors}
									className="w-full"
									type={"TEXT"}
									placeholder={"Email Address"}
									disabled={false}
								/>
							</label>
						</div>
					</div>

					<div className="mb-10">
						<h2 className="text-2xl opacity-70 font-bold mb-3">
							Additional Info
						</h2>
						<div className="flex gap-8 mb-5">
							<label className="w-full">
								<h3 className="text-xl ml-1 mb-2">Gender</h3>
								<SimpleSelect
									title="Gender"
									select={formData.gender}
									optionsRenderer={() =>
										gender.map((genderValue, index) => (
											<div
												onClick={() =>
													handleChange("gender", genderValue)
												}
												className={`selectMenuItem 	${
													genderValue === formData.gender
														? "active"
														: ""
												}`}
												key={index}
											>
												{genderValue}
											</div>
										))
									}
								/>
							</label>
							<label className="w-full">
								<h3 className="text-xl ml-1 mb-2">Country</h3>
								<SimpleSelect
									title="Country"
									select={formData.country}
									optionsRenderer={() =>
										countries.map((country, index) => (
											<div
												onClick={() =>
													handleChange("country", country)
												}
												className={`selectMenuItem 	${
													country === formData.country
														? "active"
														: ""
												}`}
												key={index}
											>
												{country}
											</div>
										))
									}
								/>
							</label>
						</div>
					</div>
					<div className="mb-10">
						<h2 className="text-2xl opacity-70 font-bold mb-3">
							Social Media
						</h2>
						<div className="flex gap-8 mb-5">
							<Input
								name="facebook"
								value={formData.facebook}
								onChange={(name, value) => handleChange(name, value)}
								error={errors.facebook}
								style="SMALL"
								setError={setErrors}
								className="w-full"
								type={"TEXT"}
								placeholder={"facebook.com/@username"}
								disabled={false}
							/>
							<Input
								name="instagram"
								value={formData.instagram}
								onChange={(name, value) => handleChange(name, value)}
								error={errors.instagram}
								style="SMALL"
								setError={setErrors}
								className="w-full"
								type={"TEXT"}
								placeholder={"instagram.com/@username"}
								disabled={false}
							/>
							<Input
								name="instagram"
								value={formData.twitter}
								onChange={(name, value) => handleChange(name, value)}
								error={errors.twitter}
								style="SMALL"
								setError={setErrors}
								className="w-full"
								type={"TEXT"}
								placeholder={"twitter.com/@username"}
								disabled={false}
							/>
						</div>
					</div>
					<div className="mt-10 w-60 mx-auto">
						<Button
							type={"submit"}
							style="SMALL"
							title={"Save"}
							disabled={updateState.status === HTTP_STATUS.PENDING}
						/>
					</div>
				</form>
			</Modal>
		)
	);
};

export default EditUserModal;
