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
import { ErrorType, ErrorTypes, UserType } from "@/types/types";
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
	const handleChange = (key: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[key]: value,
		}));
	};
	const handleFullNameChange = (key: "name" | "surname", value: string) => {
		const [currentName, currentSurname] = formData.fullName.split(" ");
		const updatedFullName =
			key === "name"
				? `${value} ${currentSurname || ""}`.trim()
				: `${currentName || ""} ${value}`.trim();
		setFormData((prev) => ({
			...prev,
			fullName: updatedFullName,
		}));
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
		try {
			const resultAction = await dispatch(
				updateUserInfo({ type: "ADMIN", user: formData })
			);

			if (updateUserInfo.fulfilled.match(resultAction)) {
				onClose();
			}
		} catch (error) {
			console.error("Неизвестная ошибка:", error);
		}
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
									value={formData?.fullName?.split?.(" ")?.[0] || ""}
									setValue={(value) =>
										handleFullNameChange("name", value)
									}
									error={errors.fullName}
									style="SMALL"
									setError={(err) =>
										setErrors((prev) => ({ ...prev, fullName: err }))
									}
									className="w-full"
									type={"TEXT"}
									placeholder={"Name"}
									disabled={false}
								/>
							</label>
							<label className="w-full">
								<h3 className="text-xl ml-1 mb-2">Surname</h3>
								<Input
									value={formData?.fullName?.split?.(" ")?.[1] || ""}
									setValue={(value) =>
										handleFullNameChange("surname", value)
									}
									error={errors.surname}
									style="SMALL"
									setError={(err) =>
										setErrors((prev) => ({ ...prev, surname: err }))
									}
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
									value={formData.age}
									setValue={(value) => handleChange("age", value)}
									error={errors.age}
									style="SMALL"
									setError={(err) =>
										setErrors((prev) => ({ ...prev, age: err }))
									}
									className="w-full"
									type={"NUM"}
									placeholder={"Age"}
									disabled={false}
								/>
							</label>
							<label className="w-full">
								<h3 className="text-xl ml-1 mb-2">Email</h3>
								<Input
									value={formData.email}
									setValue={(value) => handleChange("email", value)}
									error={errors.email}
									style="SMALL"
									setError={(err) =>
										setErrors((prev) => ({ ...prev, email: err }))
									}
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
									setSelect={(value) => handleChange("gender", value)}
									select={formData.gender}
									selectOptions={gender}
								/>
							</label>
							<label className="w-full">
								<h3 className="text-xl ml-1 mb-2">Country</h3>
								<SimpleSelect
									title="Country"
									setSelect={(value) => handleChange("country", value)}
									select={formData.country}
									selectOptions={countries}
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
								value={formData.facebook}
								setValue={(value) => handleChange("facebook", value)}
								error={errors.facebook}
								style="SMALL"
								setError={(err) =>
									setErrors((prev) => ({ ...prev, facebook: err }))
								}
								className="w-full"
								type={"TEXT"}
								placeholder={"facebook.com/@username"}
								disabled={false}
							/>
							<Input
								value={formData.instagram}
								setValue={(value) => handleChange("instagram", value)}
								error={errors.instagram}
								style="SMALL"
								setError={(err) =>
									setErrors((prev) => ({ ...prev, instagram: err }))
								}
								className="w-full"
								type={"TEXT"}
								placeholder={"instagram.com/@username"}
								disabled={false}
							/>
							<Input
								value={formData.twitter}
								setValue={(value) => handleChange("twitter", value)}
								error={errors.twitter}
								style="SMALL"
								setError={(err) =>
									setErrors((prev) => ({ ...prev, twitter: err }))
								}
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
