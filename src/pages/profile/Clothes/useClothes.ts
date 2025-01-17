import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { HTTP_STATUS } from "@/redux/constant";
import { getClothesState } from "@/redux/slices/clothes/clothes.store";
import {
	getClothes,
	getBrands,
	getColours,
	getCategories,
} from "@/redux/slices/clothes/clothes.thunk";
import { useEffect } from "react";

export const useClothes = () => {
	const dispatch = useAppDispatch();
	const {
		status: clothesStatus,
		brands,
		colours,
		categories,
	} = useAppSelector(getClothesState);

	const isLoading =
		clothesStatus === HTTP_STATUS.IDLE ||
		clothesStatus === HTTP_STATUS.PENDING ||
		brands.status === HTTP_STATUS.IDLE ||
		brands.status === HTTP_STATUS.PENDING ||
		colours.status === HTTP_STATUS.IDLE ||
		colours.status === HTTP_STATUS.PENDING ||
		categories.status === HTTP_STATUS.IDLE ||
		categories.status === HTTP_STATUS.PENDING;

	useEffect(() => {
		if (clothesStatus === HTTP_STATUS.IDLE) {
			dispatch(getClothes());
		}
		if (brands.status === HTTP_STATUS.IDLE) {
			dispatch(getBrands());
		}
		if (colours.status === HTTP_STATUS.IDLE) {
			dispatch(getColours());
		}
		if (categories.status === HTTP_STATUS.IDLE) {
			dispatch(getCategories());
		}
	}, [
		clothesStatus,
		brands.status,
		dispatch,
		colours.status,
		categories.status,
	]);

	return { isLoading };
};
