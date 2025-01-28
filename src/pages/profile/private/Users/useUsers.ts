import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { HTTP_STATUS } from "@/redux/constant";
import { getUserState } from "@/redux/slices/auth/auth.store";
import { getUsers } from "@/redux/slices/auth/auth.thunk";
import { useEffect, useState } from "react";

export const useUsers = () => {
	const dispatch = useAppDispatch();
	const { status } = useAppSelector(getUserState);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (status === HTTP_STATUS.IDLE) {
			setIsLoading(true);
			dispatch(getUsers());
		}

		if (status === HTTP_STATUS.PENDING || status === HTTP_STATUS.FULFILLED) {
			setIsLoading(false);
		}
	}, [dispatch, status]);

	return { isLoading };
};
