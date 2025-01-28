import React from "react";
import Image from "@/components/shared/Image/Image";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/widgets/EmptyState";
import { AddEditClothType, ClothesTypes } from "@/types/types";
import { GiClothes } from "react-icons/gi";

type TableProps = {
	basketItems: ClothesTypes[];
	className?: string;
	addOrEdit: (info: AddEditClothType) => void;
};

const ClothesTable: React.FC<TableProps> = ({
	basketItems,
	className,
	addOrEdit,
}) => {
	return (
		<div
			className={`bg-appBlack rounded-[2.4rem] h-[84vh] flex flex-col overflow-hidden  ${className}`}
		>
			<div className="flex justify-between bg-appLightBlack border-[.2rem] border-solid border-appBlack p-12 rounded-t-[2.4rem] text-white text-base">
				<p className="w-[18%] text-left pr-8">Cloth</p>
				<p className="w-[18%] text-left pr-8">Price</p>
				<p className="w-[18%] text-left pr-8">Brand</p>
				<p className="w-[18%] text-left pr-8">Size</p>
				<p className="w-[18%] text-left pr-8">Colour</p>
				<p className="w-[10%] text-right">Action</p>
			</div>
			<div className="h-full overflow-auto">
				{basketItems.length ? (
					basketItems.map((item, index) => (
						<div
							key={index}
							className={`flex justify-between items-center p-12 text-white text-base transition-all cursor-pointer hover:bg-appLightBlack ${
								index !== basketItems.length - 1
									? "border-b-2 border-solid border-appLightBlack border-t-0 border-x-0"
									: ""
							}  `}
						>
							<div className="w-[18%] text-left text-sm overflow-hidden text-ellipsis whitespace-nowrap pr-8 flex items-center gap-3 ">
								<Image
									className="w-20 h-20 rounded-full"
									url={item.img}
									alt={item.name}
								/>
								<span className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
									{item.name}
								</span>
							</div>
							<div className="w-[18%] text-left flex items-center gap-4 overflow-hidden text-ellipsis whitespace-nowrap pr-8">
								{item.price} $
							</div>
							<div className="w-[18%] text-left overflow-hidden text-ellipsis whitespace-nowrap pr-8">
								{item.brand}
							</div>
							<div className="w-[18%] text-left overflow-hidden text-ellipsis whitespace-nowrap pr-8">
								{item.size}
							</div>
							<div className="w-[18%] text-left overflow-hidden text-ellipsis whitespace-nowrap pr-8">
								{item.colour.name}
							</div>
							<div className="w-[10%] text-center">
								<Button
									style="SMALLER"
									type={"button"}
									onClick={() =>
										addOrEdit({
											isOpen: true,
											type: "EDIT",
											infoObj: item,
										})
									}
									title={"Edit"}
									disabled={false}
								/>
								<Button
									reverse={true}
									style="SMALLER"
									type={"button"}
									onClick={() => console.log("sss")}
									title={"Delete"}
									disabled={false}
								/>
							</div>
						</div>
					))
				) : (
					<EmptyState
						className="h-full"
						icon={<GiClothes />}
						message="Clothes is empty"
					/>
				)}
			</div>
		</div>
	);
};

export default ClothesTable;
