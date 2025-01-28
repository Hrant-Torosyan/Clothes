import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { HTTP_STATUS } from "@/redux/constant";
import { getUserState } from "@/redux/slices/auth/auth.store";
import { getFavorites, getBasketItems } from "@/redux/slices/auth/auth.thunk";
import { getClothesState } from "@/redux/slices/clothes/clothes.store";
import { getCloth } from "@/redux/slices/clothes/clothes.thunk";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const useCloth = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();
	const { cloth } = useAppSelector(getClothesState);
	const { user } = useAppSelector(getUserState);
	useEffect(() => {
		if (id) {
			dispatch(getCloth({ id }));
		}
		if (user) {
			dispatch(getFavorites({ id: user.id }));
			dispatch(getBasketItems({ id: user.id }));
		}
	}, []);

	const isLoading =
		cloth.status === HTTP_STATUS.IDLE || cloth.status === HTTP_STATUS.PENDING;

	return { isLoading };
};
