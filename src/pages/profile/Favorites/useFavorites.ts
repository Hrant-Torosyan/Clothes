import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { HTTP_STATUS } from "@/redux/constant";
import { getUserState } from "@/redux/slices/auth/auth.store";
import { getFavorites } from "@/redux/slices/auth/auth.thunk";
import { useEffect, useState } from "react";

export const useFavorites = () => {
	const dispatch = useAppDispatch();
	const { user, favorites } = useAppSelector(getUserState);
	const { status } = favorites;

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (user.id && status === HTTP_STATUS.IDLE) {
			setIsLoading(true);
			dispatch(getFavorites({ id: user.id }));
		}

		if (status === HTTP_STATUS.PENDING || status === HTTP_STATUS.FULFILLED) {
			setIsLoading(false);
		}
	}, [dispatch, status, user.id]);

	return { isLoading };
};
