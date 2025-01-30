import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { HTTP_STATUS } from "@/redux/constant";
import { getUserState } from "@/redux/slices/auth/auth.store";
import { getUsers } from "@/redux/slices/auth/auth.thunk";
import { useEffect, useState } from "react";

export const useUsers = () => {
	const dispatch = useAppDispatch();
	const { getUsersStatus } = useAppSelector(getUserState);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (getUsersStatus === HTTP_STATUS.IDLE) {
			setIsLoading(true);
			dispatch(getUsers());
		}

		if (
			getUsersStatus === HTTP_STATUS.PENDING ||
			getUsersStatus === HTTP_STATUS.FULFILLED
		) {
			setIsLoading(false);
		}
	}, [dispatch, getUsersStatus]);

	return { isLoading };
};
