import SwitchButtons from "@/components/widgets/SwitchButtons";
import Title from "@/components/widgets/Title";
import { setFilters } from "@/redux/slices/clothes/clothes.store";
import { GenderType } from "@/types/types";
import { useDispatch } from "react-redux";

type ClothesTitleProps = {
	gender: GenderType;
};

const ClothesTitle = ({ gender }: ClothesTitleProps) => {
	const dispatch = useDispatch();
	return (
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
	);
};

export default ClothesTitle;
