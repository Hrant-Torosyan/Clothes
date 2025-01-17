import Load from "@/components/shared/Load/Load";
import Basket from "@/pages/profile/Basket/Basket";
import { useBasket } from "@/pages/profile/Basket/useBasket";

const BasketAsync = () => {
	const { isLoading } = useBasket();

	if (isLoading) {
		return (
			<div className="h-screen">
				<Load />
			</div>
		);
	}
	return <Basket />;
};

export default BasketAsync;
