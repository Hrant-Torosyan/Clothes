import Load from "@/components/shared/Load/Load";
import Favorites from "@/pages/profile/Favorites/Favorites";
import { useFavorites } from "@/pages/profile/Favorites/useFavorites";

const FavoritesAsync = () => {
	const { isLoading } = useFavorites();

	console.log(isLoading);
	if (isLoading) {
		return (
			<div className="h-screen">
				<Load />
			</div>
		);
	}
	return <Favorites />;
};

export default FavoritesAsync;
