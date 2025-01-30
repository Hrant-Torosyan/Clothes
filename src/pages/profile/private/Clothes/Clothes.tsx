import Title from "@/components/widgets/Title";
import { useAppSelector } from "@/hooks/reduxHooks";
import AddEditModal from "@/pages/profile/private/Clothes/_components/AddEditModal";
import ClothesTable from "@/pages/profile/private/Clothes/_components/ClothesTable";
import { getClothesState } from "@/redux/slices/clothes/clothes.store";
import { AddEditClothType } from "@/types/types";
import { useState } from "react";

const Clothes = () => {
	const [addEditInfo, setAddEditInfo] = useState<AddEditClothType>({
		isOpen: false,
	});
	const { clothesData } = useAppSelector(getClothesState);
	return (
		<div>
			<Title title="Clothes" />
			<ClothesTable basketItems={clothesData} addOrEdit={setAddEditInfo} />
			{addEditInfo.isOpen && (
				<AddEditModal
					info={addEditInfo}
					onClose={() =>
						setAddEditInfo({
							isOpen: false,
						})
					}
				/>
			)}
		</div>
	);
};

export default Clothes;
