import LoginOrReg from "@/components/shared/Modal/MainModals/LoginOrReg";
import Modal from "@/components/shared/Modal/Modal";
import Title from "@/components/widgets/Title";
import { useAppSelector } from "@/hooks/reduxHooks";
import ClothContent from "@/pages/profile/public/Cloth/_components/ClothContent";
import Comment from "@/pages/profile/public/Cloth/_components/Comment";
import { getClothesState } from "@/redux/slices/clothes/clothes.store";
import { useState } from "react";

const Cloth = () => {
	const [openModal, setOpenModal] = useState({ active: false, message: null });
	const { cloth } = useAppSelector(getClothesState);
	const clothData = cloth.data;
	return (
		<div>
			<Title className="mb-0" title={clothData.name} />
			<ClothContent clothData={clothData} setOpenModal={setOpenModal} />
			<Comment />
			<Modal
				isOpen={openModal.active}
				onClose={() => setOpenModal({ active: false, message: null })}
				title={openModal.message}
			>
				<LoginOrReg />
			</Modal>
		</div>
	);
};

export default Cloth;
