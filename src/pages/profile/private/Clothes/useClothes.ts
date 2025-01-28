import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { HTTP_STATUS } from "@/redux/constant";
import { getUserState } from "@/redux/slices/auth/auth.store";
import { getClothesState } from "@/redux/slices/clothes/clothes.store";
import { getClothes } from "@/redux/slices/clothes/clothes.thunk";
import { useEffect, useState } from "react";

export const useClothes = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(getUserState);
	const { status } = useAppSelector(getClothesState);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		if (user.id && status === HTTP_STATUS.IDLE) {
			setIsLoading(true);
			dispatch(getClothes());
		}

		if (status === HTTP_STATUS.REJECTED || status === HTTP_STATUS.FULFILLED) {
			setIsLoading(false);
		}
	}, [dispatch, status, user.id]);

	return { isLoading };
};
