import Load from "@/components/shared/Load/Load";
import Cloth from "@/pages/profile/public/Cloth/Cloth";
import { useCloth } from "@/pages/profile/public/Cloth/useCloth";

const ClothAsync = () => {
	const { isLoading } = useCloth();
	if (isLoading) {
		return (
			<div className="h-screen">
				<Load />
			</div>
		);
	}

	return <Cloth />;
};

export default ClothAsync;
