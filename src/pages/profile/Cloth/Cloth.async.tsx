import Load from "@/components/shared/Load/Load";
import Cloth from "@/pages/profile/Cloth/Cloth";
import { useCloth } from "@/pages/profile/Cloth/useCloth";

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
