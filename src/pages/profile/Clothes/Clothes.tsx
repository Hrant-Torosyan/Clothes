import ClothesCard from "@/components/shared/cards/profile/ClothesCard";
import EmptyState from "@/components/widgets/EmptyState";
import SwitchButtons from "@/components/widgets/SwitchButtons";
import Title from "@/components/widgets/Title";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { PiEmpty } from "react-icons/pi";

import FilterClothes from "@/pages/profile/Clothes/FilterClothes";
import {
	getClothesState,
	setFilters,
} from "@/redux/slices/clothes/clothes.store";

const Clothes = () => {
	const dispatch = useAppDispatch();
	const { filteredClothesData, filters } = useAppSelector(getClothesState);
	const { gender } = filters;
	return (
		<div>
			<div className="flex items-center justify-between mb-10">
				<Title className="mb-0" title="Clothes" />
				<SwitchButtons
					value={gender}
					setValue={(val) =>
						dispatch(setFilters({ type: "gender", value: val }))
					}
					className={"w-[45rem]"}
					buttons={["ALL", "MALE", "FEMALE", "UNISEX", "CHILDREN"]}
				/>
			</div>
			<FilterClothes gender={gender} />
			<div className="flex flex-wrap gap-8">
				{filteredClothesData.length ? (
					filteredClothesData.map((cloth) => (
						<ClothesCard
							key={cloth.id}
							id={cloth.id}
							img={cloth.img}
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
		</div>
	);
};

export default Clothes;
