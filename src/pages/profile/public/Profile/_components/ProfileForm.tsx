import Wrapper from "@/components/shared/cards/profile/Wrapper";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SimpleSelect from "@/components/ui/SimpleSelect";
import { countries } from "@/constants/countries";
import { gender } from "@/constants/gender";
import { ErrorType, ErrorTypes, UserType } from "@/types/types";
import React from "react";

type ProfileFormProps = {
	profilePayload: UserType;
	errors: ErrorTypes;
	onInputChange: (name: string, value: string) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	isSubmitting: boolean;
	setErrors: (error: { [x: string]: ErrorType }) => void;
};

const ProfileForm = ({
	profilePayload,
	errors,
	onInputChange,
	onSubmit,
	isSubmitting,
	setErrors,
}: ProfileFormProps) => {
	return (
		<Wrapper>
			<form onSubmit={onSubmit}>
				<div className="mb-10">
					<h2 className="text-2xl opacity-70 font-bold mb-7">
						Personal info
					</h2>
					<div className="flex gap-8 mb-6">
						<label className="w-full">
							<h3 className="text-xl ml-1 mb-2">Name</h3>
							<Input
								name="name"
								value={profilePayload.fullName.split(" ")[0] || ""}
								onChange={onInputChange}
								error={errors.name}
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
								value={profilePayload.fullName.split(" ")[1] || ""}
								onChange={onInputChange}
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
							<h3 className="text-xl ml-1 mb-2">Write your age</h3>
							<Input
								name="age"
								value={profilePayload.age}
								onChange={onInputChange}
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
								value={profilePayload.email}
								onChange={onInputChange}
								error={errors.email}
								style="SMALL"
								setError={setErrors}
								className="w-full"
								type={"TEXT"}
								placeholder={"Email Address"}
								disabled={true}
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
							<h3 className="text-xl ml-1 mb-2">Choose your gender</h3>
							<SimpleSelect
								title="Gender"
								setSelect={(value) => onInputChange("gender", value)}
								select={profilePayload.gender}
								selectOptions={gender}
							/>
						</label>
						<label className="w-full">
							<h3 className="text-xl ml-1 mb-2">Choose your country</h3>
							<SimpleSelect
								title="Country"
								setSelect={(value) => onInputChange("country", value)}
								select={profilePayload.country}
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
							name="facebook"
							value={profilePayload.facebook}
							onChange={onInputChange}
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
							value={profilePayload.instagram}
							onChange={onInputChange}
							error={errors.instagram}
							style="SMALL"
							setError={setErrors}
							className="w-full"
							type={"TEXT"}
							placeholder={"instagram.com/@username"}
							disabled={false}
						/>
						<Input
							name="twitter"
							value={profilePayload.twitter}
							onChange={onInputChange}
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
				<div className="mt-10 w-60">
					<Button
						type={"submit"}
						style="SMALL"
						title={"Save"}
						disabled={isSubmitting}
					/>
				</div>
			</form>
		</Wrapper>
	);
};

export default ProfileForm;
