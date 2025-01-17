import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { HTTP_STATUS } from "@/redux/constant";
import { getUserState } from "@/redux/slices/auth/auth.store";
import { getBasketItems } from "@/redux/slices/auth/auth.thunk";
import { useEffect, useState } from "react";

export const useBasket = () => {
	const dispatch = useAppDispatch();
	const { user, basket } = useAppSelector(getUserState);
	const { status } = basket;
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (user.id && status === HTTP_STATUS.IDLE) {
			setIsLoading(true);
			dispatch(getBasketItems({ id: user.id }));
		}

		if (status === HTTP_STATUS.PENDING || status === HTTP_STATUS.FULFILLED) {
			setIsLoading(false);
		}
	}, [dispatch, status, user.id]);

	return { isLoading };
};
