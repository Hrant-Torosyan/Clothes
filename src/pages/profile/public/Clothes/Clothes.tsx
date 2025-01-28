import { useAppSelector } from "@/hooks/reduxHooks";
import { getClothesState } from "@/redux/slices/clothes/clothes.store";
import { getUserState } from "@/redux/slices/auth/auth.store";
import Modal from "@/components/shared/Modal/Modal";
import LoginOrReg from "@/components/shared/Modal/MainModals/LoginOrReg";
import { useState } from "react";
import FilterClothes from "@/pages/profile/public/Clothes/_components/FilterClothes";
import ClothesTitle from "@/pages/profile/public/Clothes/_components/ClothesTitle";
import ClothesList from "@/pages/profile/public/Clothes/_components/ClothesList";

const Clothes = () => {
	const { user } = useAppSelector(getUserState);
	const { filteredClothesData, filters } = useAppSelector(getClothesState);
	const { gender } = filters;
	const [openModal, setOpenModal] = useState(false);

	return (
		<div>
			<ClothesTitle gender={gender} />
			<FilterClothes gender={gender} />
			<ClothesList
				user={user}
				clothesData={filteredClothesData}
				setOpenModal={setOpenModal}
			/>
			<Modal
				isOpen={openModal}
				onClose={() => setOpenModal(false)}
				title={"To add to your favorites before logging in"}
			>
				<LoginOrReg />
			</Modal>
		</div>
	);
};

export default Clothes;
