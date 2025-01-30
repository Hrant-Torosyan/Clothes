import Title from "@/components/widgets/Title";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import ProfileForm from "@/pages/profile/public/Profile/_components/ProfileForm";
import { HTTP_STATUS } from "@/redux/constant";
import { getUserState } from "@/redux/slices/auth/auth.store";
import { updateUserInfo } from "@/redux/slices/auth/auth.thunk";
import { ErrorTypes, UserType } from "@/types/types";
import { useState } from "react";

const Profile = () => {
	const dispatch = useAppDispatch();
	const { user, updateUserInfo: updateState } = useAppSelector(getUserState);
	const [profilePayload, setProfilePayload] = useState<UserType>({
		id: user.id,
		email: user.email,
		password: user.password,
		image: user.image,
		favorites: user.favorites,
		basket: user.basket,
		role: user.role,
		fullName: user.fullName || "",
		age: user.age || "",
		gender: user.gender || "",
		country: user.country || "",
		facebook: user.facebook || "",
		instagram: user.instagram || "",
		twitter: user.twitter || "",
	});
	const [errors, setErrors] = useState<ErrorTypes>({});

	const handleChange = (name: string, value: string) => {
		const [currentName, currentSurname] = profilePayload.fullName.split(" ");
		if (name === "name" || name === "surname") {
			const updatedFullName =
				name === "name"
					? `${value} ${currentSurname || ""}`.trim()
					: `${currentName || ""} ${value}`.trim();

			setProfilePayload((prevState) => ({
				...prevState,
				fullName: updatedFullName,
			}));
		} else {
			setProfilePayload((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(updateUserInfo({ type: "USER", user: profilePayload }));
	};

	return (
		<div>
			<Title title="Profile" />
			<ProfileForm
				profilePayload={profilePayload}
				errors={errors}
				setErrors={setErrors}
				onInputChange={(name, value) => handleChange(name, value)}
				onSubmit={handleSubmit}
				isSubmitting={updateState.status === HTTP_STATUS.PENDING}
			/>
		</div>
	);
};

export default Profile;
