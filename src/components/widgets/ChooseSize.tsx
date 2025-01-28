import { mainSizes } from "@/constants/sizes";
import { SizeType } from "@/types/types";
import React from "react";

type ChooseSize = {
	sizes?: SizeType[];
	selectedSizes: SizeType[] | SizeType;
	onChange: (size: SizeType) => void;
};
const ChooseSize: React.FC<ChooseSize> = ({
	selectedSizes,
	onChange,
	sizes = mainSizes,
}) => {
	const isSelected = (size: SizeType) => {
		if (Array.isArray(selectedSizes)) {
			return selectedSizes.includes(size);
		}
		return selectedSizes === size;
	};
	return (
		<div className="flex justify-between gap-8">
			{sizes.map((size) => (
				<div
					key={size}
					className={`w-16 h-16 rounded-full text-white border-solid border-[0.2rem] border-gray bg-appLightBlack text-sm flex justify-center items-center cursor-pointer transition-all
                         ${
										isSelected(size)
											? "border-orange "
											: "border-gray hover:border-orange"
									}
									`}
					onClick={(e) => {
						e.preventDefault();
						onChange(size);
					}}
				>
					{size}
				</div>
			))}
		</div>
	);
};

export default ChooseSize;
