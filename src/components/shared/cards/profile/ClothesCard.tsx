import Image from "@/components/shared/Image/Image";
import { ClothesTypes } from "@/types/types";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type ClothesCardProps = Pick<
	ClothesTypes,
	"id" | "img" | "description" | "sale" | "price"
> & {
	onClickFavorite: (e: React.MouseEvent<HTMLDivElement>, id: string) => void;
	isLogined: boolean;
	favorites: string[];
};

const ClothesCard: React.FC<ClothesCardProps> = ({
	id,
	img,
	description,
	sale,
	price,
	onClickFavorite,
	isLogined,
	favorites,
}) => {
	const navigate = useNavigate();

	return (
		<div
			onClick={() => navigate(`/clothes/${id}`)}
			className="w-[calc(25%-1.5rem)] mt-16 cursor-pointer flex flex-col "
		>
			<div className="relative h-full">
				{sale !== null && (
					<div className="absolute top-4 left-4 py-2 px-4 bg-orange border-solid border-gray border-[0.1rem] rounded-xl flex items-center shadow">
						<p className="text-white text-sm">{sale}%</p>
					</div>
				)}
				<Image url={img} alt={description} />
				<div
					onClick={(e) => onClickFavorite(e, id)}
					className={`absolute bottom-4 right-4 p-3 cursor-pointer border-gray border-[0.1rem] rounded-xl flex items-center shadow bg-gray hover:text-orange group ${
						isLogined ? (favorites.includes(id) ? "text-orange" : "") : ""
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
