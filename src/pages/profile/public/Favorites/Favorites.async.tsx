import Load from "@/components/shared/Load/Load";
import Favorites from "@/pages/profile/public/Favorites/Favorites";
import { useFavorites } from "@/pages/profile/public/Favorites/useFavorites";

const FavoritesAsync = () => {
	const { isLoading } = useFavorites();

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
