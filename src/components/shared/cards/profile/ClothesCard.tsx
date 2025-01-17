import Image from "@/components/shared/Image/Image";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { getUserState } from "@/redux/slices/auth/auth.store";
import { addRemoveFavorite } from "@/redux/slices/auth/auth.thunk";
import { ClothesTypes } from "@/types/types";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type ClothesCardProps = Pick<
	ClothesTypes,
	"id" | "img" | "description" | "sale" | "price"
>;

const ClothesCard: React.FC<ClothesCardProps> = ({
	id,
	img,
	description,
	sale,
	price,
}) => {
	const navigate = useNavigate();
	const { user } = useAppSelector(getUserState);
	const favorites = user?.favorites || null;
	const dispatch = useAppDispatch();

	const handleClickFavorites = (e: React.MouseEvent) => {
		e.stopPropagation();

		if (user) {
			dispatch(
				addRemoveFavorite({
					userId: user.id,
					clotheId: id,
				})
			);
		} else {
			toast.error("To add to your favorites before logging in");
		}
	};

	return (
		<div
			onClick={() => navigate(`/clothes/${id}`)}
			className="w-[calc(25%-1.5rem)] mt-16 cursor-pointer flex flex-col "
		>
			<div className="relative h-full">
				{sale !== null && (
					<div className="absolute top-4 left-4 py-2 px-4 bg-orange border-solid border-gray border-[0.1rem] rounded-xl flex items-center shadow">
						<p className="text-white text-sm">{sale}</p>
					</div>
				)}
				<Image url={img} alt={description} />
				<div
					onClick={handleClickFavorites}
					className={`absolute bottom-4 right-4 p-3 cursor-pointer border-gray border-[0.1rem] rounded-xl flex items-center shadow bg-gray hover:text-orange group ${
						user ? (favorites.includes(id) ? "text-orange" : "") : ""
					}`}
				>
					<FaHeart className="text-3xl transition-all transform group-active:scale-150" />
				</div>
			</div>
			<p className="text-sm text-white mt-3">{description}</p>
			<p className="text-sm text-white mt-4 font-bold">{price} $</p>
		</div>
	);
};

export default ClothesCard;
