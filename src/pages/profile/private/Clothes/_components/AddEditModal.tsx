import Modal from "@/components/shared/Modal/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SimpleSelect from "@/components/ui/SimpleSelect";
import ChooseSize from "@/components/widgets/ChooseSize";
import { AddEditClothType, ErrorType } from "@/types/types";
import React, { useState } from "react";

type Props = {
	info: AddEditClothType;
	onClose: () => void;
};

const AddEditModal = ({ onClose, info }: Props) => {
	console.log(info);
	const [formData, setFormData] = useState({ ...info.infoObj });
	const [errors, setErrors] = useState<Record<string, ErrorType>>({});
	const handleChange = (key: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log(formData);
	};
	return (
		Boolean(info.isOpen) && (
			<Modal
				title={info.type === "ADD" ? "Create cloth" : "Edit cloth"}
				isOpen={info.isOpen}
				onClose={onClose}
			>
				<form onSubmit={handleSubmit}>
					<div className="flex gap-8 mb-6">
						<label className="w-full">
							<h3 className="text-xl ml-1 mb-2">Cloth Name</h3>
							<Input
								value={""}
								setValue={(value) => handleChange("name", value)}
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
							<h3 className="text-xl ml-1 mb-2">Price ($)</h3>
							<Input
								value={""}
								setValue={(value) => handleChange("price", value)}
								error={errors.surname}
								style="SMALL"
								setError={(err) =>
									setErrors((prev) => ({ ...prev, surname: err }))
								}
								className="w-full"
								type={"NUM"}
								placeholder={"Price"}
								disabled={false}
							/>
						</label>
					</div>

					<div className="flex gap-8 mb-5">
						<label className="w-full">
							<h3 className="text-xl ml-1 mb-2">Gender</h3>
							<SimpleSelect
								title="Gender"
								setSelect={(value) => handleChange("gender", value)}
								select={"test"}
								selectOptions={["gender"]}
							/>
						</label>
						<label className="w-full">
							<h3 className="text-xl ml-1 mb-2">Country</h3>
							<SimpleSelect
								title="Country"
								setSelect={(value) => handleChange("country", value)}
								select={"sd"}
								selectOptions={["countries"]}
							/>
						</label>
					</div>
					<div className="flex gap-8 mb-5">
						<label className="w-full">
							<h3 className="text-xl ml-1 mb-2">Gender</h3>
							<SimpleSelect
								title="Gender"
								setSelect={(value) => handleChange("gender", value)}
								select={"test"}
								selectOptions={["gender"]}
							/>
						</label>
						<label className="w-full">
							<h3 className="text-xl ml-1 mb-2">Country</h3>
							<SimpleSelect
								title="Country"
								setSelect={(value) => handleChange("country", value)}
								select={"sd"}
								selectOptions={["countries"]}
							/>
						</label>
					</div>
					<div className="flex gap-8 mb-5">
						<label className="w-full">
							<h3 className="text-xl ml-1 mb-2">Sizes</h3>
							<ChooseSize onChange={() => null} selectedSizes={[]} />
						</label>
						<label className="w-full">
							<h3 className="text-xl ml-1 mb-2">Sale(%)</h3>
							<Input
								value={""}
								setValue={(value) => handleChange("price", value)}
								error={errors.surname}
								style="SMALL"
								setError={(err) =>
									setErrors((prev) => ({ ...prev, surname: err }))
								}
								className="w-full"
								type={"NUM"}
								placeholder={"Sale"}
								disabled={false}
							/>
						</label>
					</div>
					<label className="w-full">
						<h3 className="text-xl ml-1 mb-2">Description</h3>
						<Input
							value={""}
							setValue={(value) => handleChange("price", value)}
							error={errors.surname}
							style="SMALL"
							setError={(err) =>
								setErrors((prev) => ({ ...prev, surname: err }))
							}
							className="w-full"
							type={"DESCRIPTION"}
							placeholder={"Description..."}
							disabled={false}
						/>
					</label>
					<div className="mt-10 w-60 mx-auto">
						<Button
							type={"submit"}
							style="SMALL"
							title={"Save"}
							disabled={false}
						/>
					</div>
				</form>
			</Modal>
		)
	);
};

export default AddEditModal;
