import React from "react";
import Image from "@/components/shared/Image/Image";
import Button from "@/components/ui/Button";
import CountEdit from "@/components/widgets/CountEdit";
import EmptyState from "@/components/widgets/EmptyState";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { getUserState } from "@/redux/slices/auth/auth.store";
import { countEdit, removeBasketItem } from "@/redux/slices/auth/auth.thunk";
import { ClothesTypesForBasket } from "@/types/types";
import { SlBasket } from "react-icons/sl";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
type TableProps = {
	basketItems: ClothesTypesForBasket[];
	className?: string;
};

const BasketTable: React.FC<TableProps> = ({ basketItems, className }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { user } = useAppSelector(getUserState);
	const mainPrice = basketItems.reduce((acc, item) => {
		const price = parseFloat(item.price);
		const count = item.count;
		return acc + price * count;
	}, 0);

	const handleClick = (e: React.MouseEvent, item: ClothesTypesForBasket) => {
		e.stopPropagation();
		dispatch(
			removeBasketItem({
				basketId: item.basketId,
				userId: user.id,
			})
		);
	};
	return (
		<div
			className={`bg-appBlack rounded-[2.4rem] h-[84vh] flex flex-col overflow-hidden  ${className}`}
		>
			<div className="flex justify-between bg-appLightBlack border-[.2rem] border-solid border-appBlack p-12 rounded-t-[2.4rem] text-white text-base">
				<p className="w-[18%] text-left pr-8">Cloth</p>
				<p className="w-[18%] text-left pr-8">Price</p>
				<p className="w-[18%] text-left pr-8">Brand</p>
				<p className="w-[18%] text-left pr-8">Size</p>
				<p className="w-[18%] text-left pr-8">Count</p>
				<p className="w-[10%] text-right">Action</p>
			</div>
			<div className="h-full overflow-auto">
				{basketItems.length ? (
					basketItems.map((item, index) => (
						<div
							key={index}
							onClick={() => navigate(`/clothes/${item.id}`)}
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
								<CountEdit
									max={item.aviable}
									count={item.count}
									setCount={(count) => {
										dispatch(
											countEdit({
												basketId: item.basketId,
												count: count,
												userId: user.id,
											})
										);
									}}
								/>
							</div>
							<div className="w-[10%] text-center">
								<Button
									reverse={true}
									style="SMALLER"
									type={"button"}
									onClick={(e) => handleClick(e, item)}
									title={"Delete"}
									disabled={false}
								/>
							</div>
						</div>
					))
				) : (
					<EmptyState
						className="h-full"
						icon={<SlBasket />}
						message="Basket is empty"
					/>
				)}
			</div>

			<div className="flex justify-between items-center bg-appLightBlack border-[.2rem] border-solid border-appBlack p-6 rounded-b-[2.4rem] text-white text-base">
				<p>Basket length : {basketItems.length}</p>
				<p>Main Price : {mainPrice} $</p>
				<div className="w-44">
					<Button
						reverse={true}
						style="SMALL"
						type={"button"}
						onClick={() => toast.success("sss")}
						title={"Buy all"}
						disabled={!basketItems.length}
					/>
				</div>
			</div>
		</div>
	);
};

export default BasketTable;
