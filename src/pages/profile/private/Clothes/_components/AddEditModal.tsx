import Modal from "@/components/shared/Modal/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SimpleSelect from "@/components/ui/SimpleSelect";
import ChooseSize from "@/components/widgets/ChooseSize";
import CountEdit from "@/components/widgets/CountEdit";
import { clothesGender } from "@/constants/clothesGender";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { HTTP_STATUS } from "@/redux/constant";
import { getClothesState } from "@/redux/slices/clothes/clothes.store";
import { updateCloth } from "@/redux/slices/clothes/clothes.thunk";
import {
	AddEditClothType,
	ClothesTypes,
	ErrorType,
	FiltersTypeData,
	GenderType,
	SizeType,
} from "@/types/types";
import { formatGenderName } from "@/utils/formatGenderName";
import React, { useState } from "react";

type Props = {
	info: AddEditClothType;
	onClose: () => void;
};

const AddEditModal = ({ onClose, info }: Props) => {
	// console.log(info);

	const dispatch = useAppDispatch();
	const {
		brands,
		categories,
		colours,
		updateCloth: updateClothState,
	} = useAppSelector(getClothesState);
	const [formData, setFormData] = useState<ClothesTypes>({ ...info.infoObj });
	const [errors, setErrors] = useState<Record<string, ErrorType>>({});
	const handleChangeSelect = (
		key: string,
		value: string | FiltersTypeData
	) => {
		setFormData((prev) => ({
			...prev,
			[key]: value,
		}));
	};
	const handleChangSize = (value: SizeType) => {
		const sizes = [...formData.size];
		if (formData.size.includes(value)) {
			sizes.splice(sizes.indexOf(value), 1);
		} else {
			sizes.push(value);
		}
		setFormData((prev) => ({
			...prev,
			size: sizes,
		}));
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(updateCloth(formData))
			.unwrap()
			.then(() => {
				onClose();
			});
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
								name="name"
								value={formData.name}
								onChange={(name, value) =>
									setFormData((prev) => ({
										...prev,
										[name]: value,
									}))
								}
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
							<h3 className="text-xl ml-1 mb-2">Price ($)</h3>
							<Input
								name="price"
								value={formData.price}
								onChange={(name, value) =>
									setFormData((prev) => ({
										...prev,
										[name]: value,
									}))
								}
								error={errors.surname}
								style="SMALL"
								setError={setErrors}
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
								select={formatGenderName(formData.gender)}
								optionsRenderer={() =>
									clothesGender.map(
										(option: GenderType, key: number) => (
											<div
												onClick={() =>
													handleChangeSelect("gender", option)
												}
												key={key}
												className={`selectMenuItem 	${
													option === formData.gender
														? "active"
														: ""
												}`}
											>
												{formatGenderName(option)}
											</div>
										)
									)
								}
							/>
						</label>
						<label className="w-full">
							<h3 className="text-xl ml-1 mb-2">Colour</h3>
							<SimpleSelect
								title="Colour"
								select={formData.colour.name}
								optionsRenderer={() =>
									colours.data.map(
										(option: FiltersTypeData, key: number) => (
											<div
												onClick={() =>
													handleChangeSelect("colour", option)
												}
												key={key}
												className={`selectMenuItem 	${
													option.id === formData.colour.id
														? "active"
														: ""
												}`}
											>
												{option.name}
											</div>
										)
									)
								}
							/>
						</label>
					</div>

					<div className="flex gap-8 mb-5">
						<label className="w-full">
							<h3 className="text-xl ml-1 mb-2">Brand</h3>
							<SimpleSelect
								title="Brand"
								select={formData.brand}
								optionsRenderer={() =>
									brands.data.map(
										(option: FiltersTypeData, key: number) => (
											<div
												onClick={() =>
													handleChangeSelect("brand", option.name)
												}
												key={key}
												className={`selectMenuItem 	${
													option.name === formData.brand
														? "active"
														: ""
												}`}
											>
												{option.name}
											</div>
										)
									)
								}
							/>
						</label>
						<label className="w-full">
							<h3 className="text-xl ml-1 mb-2">Category</h3>
							<SimpleSelect
								title="Categories"
								select={formData.category}
								optionsRenderer={() =>
									categories.data.map(
										(option: FiltersTypeData, key: number) => (
											<div
												onClick={() =>
													handleChangeSelect(
														"category",
														option.name
													)
												}
												key={key}
												className={`selectMenuItem 	${
													option.name === formData.category
														? "active"
														: ""
												}`}
											>
												{option.name}
											</div>
										)
									)
								}
							/>
						</label>
					</div>
					<div className="flex gap-8 mb-5">
						<label className="w-full">
							<h3 className="text-xl ml-1 mb-2">Sizes</h3>
							<ChooseSize
								onChange={(value) => handleChangSize(value)}
								selectedSizes={formData.size}
							/>
						</label>
						<label className="w-full">
							<h3 className="text-xl ml-1 mb-2">Sale(%)</h3>
							<Input
								name="sale"
								value={formData.sale}
								onChange={(name, value) =>
									setFormData((prev) => ({
										...prev,
										[name]: value,
									}))
								}
								error={errors.surname}
								style="SMALL"
								setError={setErrors}
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
							name="description"
							value={formData.description}
							onChange={(name, value) =>
								setFormData((prev) => ({
									...prev,
									[name]: value,
								}))
							}
							error={errors.surname}
							style="SMALL"
							setError={setErrors}
							className="w-full"
							type={"DESCRIPTION"}
							placeholder={"Description..."}
							disabled={false}
						/>
					</label>
					<div className="w-full flex gap-6 mt-5">
						<h3 className="text-xl ml-1 ">Aviable:</h3>
						<CountEdit
							min={0}
							setCount={(count) =>
								setFormData((prev) => ({ ...prev, aviable: count }))
							}
							count={formData.aviable}
						/>
					</div>
					<div className="mt-10 w-60 mx-auto">
						<Button
							type={"submit"}
							style="SMALL"
							title={"Save"}
							disabled={updateClothState.status === HTTP_STATUS.PENDING}
						/>
					</div>
				</form>
			</Modal>
		)
	);
};

export default AddEditModal;
