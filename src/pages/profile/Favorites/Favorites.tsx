import ClothesCard from "@/components/shared/cards/profile/ClothesCard";
import EmptyState from "@/components/widgets/EmptyState";
import Title from "@/components/widgets/Title";
import { useAppSelector } from "@/hooks/reduxHooks";
import { getUserState } from "@/redux/slices/auth/auth.store";
import { CiHeart } from "react-icons/ci";

const Favorites = () => {
	const { favorites } = useAppSelector(getUserState);
	return (
		<div>
			<Title title="Favorites" />
			<div className="flex flex-wrap gap-8">
				{favorites.data.length ? (
					favorites.data.map((cloth) => (
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
						message={`You have no favorite clothes yet.`}
						icon={<CiHeart />}
					/>
				)}
			</div>
		</div>
	);
};

export default Favorites;
