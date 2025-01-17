import Wrapper from "@/components/shared/cards/profile/Wrapper";
import Image from "@/components/shared/Image/Image";
import Button from "@/components/ui/Button";
import ChooseSize from "@/components/widgets/ChooseSize";
import CountEdit from "@/components/widgets/CountEdit";
import Title from "@/components/widgets/Title";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import ClothSale from "@/pages/profile/Cloth/_components/ClothSale";
import Comment from "@/pages/profile/Cloth/_components/Comment";
import { getUserState } from "@/redux/slices/auth/auth.store";
import {
	addBasketItem,
	addRemoveFavorite,
} from "@/redux/slices/auth/auth.thunk";
import { getClothesState } from "@/redux/slices/clothes/clothes.store";
import { SizeType } from "@/types/types";
import { useState } from "react";
import { toast } from "sonner";

const Cloth = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(getUserState);

	const { cloth } = useAppSelector(getClothesState);
	const favorites = user?.favorites || null;
	const clothData = cloth.data;

	const [selectedSize, setSelectedSize] = useState<SizeType>(
		clothData.size[0]
	);
	const [count, setCount] = useState(1);

	const handleClickFavorites = () => {
		if (user) {
			dispatch(
				addRemoveFavorite({
					userId: user.id,
					clotheId: cloth.data.id,
				})
			);
		} else {
			toast.error("To add to your favorites before logging in");
		}
	};
	const handleClickBasket = () => {
		if (user) {
			dispatch(
				addBasketItem({
					userId: user.id,
					clotheId: cloth.data.id,
					count: count,
					size: selectedSize,
					aviable: cloth.data.aviable,
				})
			);
		} else {
			toast.error("To add to your basket before logging in");
		}
	};

	return (
		<div>
			<Title className="mb-0" title={clothData.name} />

			<Wrapper>
				<div className="flex">
					<div className="w-1/2">
						<Image
							zoom={true}
							className="rounded-xl"
							url={clothData.img}
							alt={clothData.name}
						/>
					</div>
					<div className="w-1/2 px-10 flex flex-col justify-between">
						<div className="flex items-center justify-between">
							<h3 className="text-5xl ">{clothData.name}</h3>
							<ClothSale sale={clothData.sale} />
						</div>
						<p className="text-sm text-gray mb-5">
							{clothData.description}
						</p>

						<p className="flex flex-col">
							<span className="text-base">{clothData.price} $</span>
							<span className="text-sm opacity-55">
								Shipping calculated at checkout.
							</span>
						</p>

						<div className="w-[90%] mx-auto my-8">
							<div className="line"></div>
						</div>

						<p className="text-xl mb-5">
							Colour : {clothData.colour.name}
						</p>
						<p className="text-xl mb-5">Brand : {clothData.brand}</p>
						<p className="text-xl mb-5">
							Category : {clothData.category}
						</p>
						<div className="flex items-center gap-2">
							<p className="text-xl">Size :</p>
							<ChooseSize
								sizes={clothData.size}
								selectedSizes={selectedSize}
								onChange={(value) => setSelectedSize(value)}
							/>
						</div>

						<p className="text-xl mb-5">
							{clothData.aviable > 0 ? (
								`Aviable : ${clothData.aviable}`
							) : (
								<span className="text-orange">
									Not available now but will be soon
								</span>
							)}
						</p>

						<CountEdit
							max={clothData.aviable}
							className="mt-6"
							setCount={setCount}
							count={count}
						/>
						<div className="w-[90%] mx-auto my-8">
							<div className="line"></div>
						</div>
						<div className="flex gap-5">
							<Button
								reverse={true}
								style="SMALL"
								type={"submit"}
								title={
									user
										? favorites.includes(clothData.id)
											? "Remove from favorites"
											: "Add to favorites"
										: "Add to favorites"
								}
								onClick={() => handleClickFavorites()}
								disabled={false}
							/>
							<Button
								style="SMALL"
								type={"submit"}
								title={"Add to basket"}
								disabled={!clothData.aviable}
								onClick={() => handleClickBasket()}
							/>
						</div>
					</div>
				</div>
			</Wrapper>

			<Wrapper className="mt-8">
				<Comment />
			</Wrapper>
		</div>
	);
};

export default Cloth;
