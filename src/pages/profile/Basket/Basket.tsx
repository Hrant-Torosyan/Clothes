import Title from "@/components/widgets/Title";
import { useAppSelector } from "@/hooks/reduxHooks";
import BasketTable from "@/pages/profile/Basket/BasketTable";
import { getUserState } from "@/redux/slices/auth/auth.store";

const Basket = () => {
	const { basket } = useAppSelector(getUserState);
	return (
		<div>
			<Title title="Basket" />
			<BasketTable basketItems={basket.data} />
		</div>
	);
};

export default Basket;
