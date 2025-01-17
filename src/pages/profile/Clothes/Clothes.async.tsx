import Load from "@/components/shared/Load/Load";
import Clothes from "@/pages/profile/Clothes/Clothes";
import { useClothes } from "@/pages/profile/Clothes/useClothes";
const ClothesAsync = () => {
	const { isLoading } = useClothes();
	if (isLoading) {
		return (
			<div className="h-screen">
				<Load />
			</div>
		);
	}

	return <Clothes />;
};

export default ClothesAsync;
