import authSlice from "./slices/auth/auth.store";
import clothesSclice from "./slices/clothes/clothes.store";

export const reducers = {
	auth: authSlice,
	clothes: clothesSclice,
};
