import Load from "@/components/shared/Load/Load";
import Clothes from "@/pages/profile/private/Clothes/Clothes";
import { useClothes } from "@/pages/profile/private/Clothes/useClothes";

const ClothesAsyncAdmin = () => {
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

export default ClothesAsyncAdmin;
