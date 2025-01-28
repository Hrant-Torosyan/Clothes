import ClothesCard from "@/components/shared/cards/profile/ClothesCard";
import EmptyState from "@/components/widgets/EmptyState";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { addRemoveFavorite } from "@/redux/slices/auth/auth.thunk";
import { ClothesTypes, UserType } from "@/types/types";
import React from "react";
import { PiEmpty } from "react-icons/pi";

type ClothesListProps = {
	user: UserType;
	clothesData: ClothesTypes[];
	setOpenModal: (arg: boolean) => void;
};

const ClothesList = ({ clothesData, user, setOpenModal }: ClothesListProps) => {
	const dispatch = useAppDispatch();
	const handleClickFavorites = (e: React.MouseEvent, id: string) => {
		e.stopPropagation();
		if (user) {
			dispatch(
				addRemoveFavorite({
					userId: user.id,
					clotheId: id,
				})
			);
		} else {
			setOpenModal(true);
		}
	};

	return (
		<div className="flex flex-wrap gap-8">
			{clothesData.length ? (
				clothesData.map((cloth) => (
					<ClothesCard
						key={cloth.id}
						id={cloth.id}
						img={cloth.img}
						isLogined={!!user}
						favorites={user?.favorites}
						onClickFavorite={handleClickFavorites}
						description={cloth.description}
						sale={cloth.sale}
						price={cloth.price}
					/>
				))
			) : (
				<EmptyState
					className="mt-28"
					message={`No clothes found matching your filters.`}
					icon={<PiEmpty />}
				/>
			)}
		</div>
	);
};

export default ClothesList;
