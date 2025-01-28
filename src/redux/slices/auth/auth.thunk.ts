import { RoleType } from "./../../../types/types";
import axiosClient from "@/redux/axiosClient";
import { AppDispatch } from "@/redux/store";
import {
	BasketItemType,
	ClothesTypes,
	ClothesTypesForBasket,
	AddRemoveActionType,
	FavoritePayload,
	RequestErrorType,
	UserType,
	BasketRemovePayload,
	BasketAddPayload,
} from "@/types/types";
import { generateUniqueId } from "@/utils/generateUniqueId";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const register = createAsyncThunk<
	UserType,
	Omit<UserType, "id">,
	{ rejectValue: RequestErrorType }
>("auth/register", async (credentials, { rejectWithValue }) => {
	try {
		const { data: existingUsers } = await axiosClient.get(
			`/users?email=${credentials.email}`
		);
		if (existingUsers.length > 0) {
			toast.error("Email already exists");
			return rejectWithValue({ message: "Email already exists" });
		}
		const { data } = await axiosClient.post("/users", credentials);
		toast.success("Register successfully");
		return data;
	} catch (error: unknown) {
		const axiosError = error as RequestErrorType;
		const errorMessage = {
			message: axiosError.message || "Failed to register",
		};
		return rejectWithValue(errorMessage);
	}
});
/**
 * Register
 */
export const login = createAsyncThunk<
	UserType,
	Pick<UserType, "email" | "password">,
	{ rejectValue: RequestErrorType }
>("auth/login", async (credentials, { rejectWithValue }) => {
	try {
		const { data } = await axiosClient.get(
			`/users?email=${credentials.email}&password=${credentials.password}`
		);
		if (data.length > 0) {
			const user: UserType = data[0];
			localStorage.setItem("auth", JSON.stringify(user));
			return user;
		} else {
			toast.error("Login or password wrong !");
			return rejectWithValue({ message: "Login or password wrong !" });
		}
	} catch (error: unknown) {
		const axiosError = error as RequestErrorType;
		const errorMessage = {
			message: axiosError.message || "Failed to log in",
		};
		return rejectWithValue(errorMessage);
	}
});
/**
 * Login
 */

export const updateUserInfo = createAsyncThunk<
	{
		type: RoleType;
		user: UserType;
	},
	{
		type: RoleType;
		user: UserType;
	},
	{ rejectValue: RequestErrorType }
>("auth/update", async (credentials, { rejectWithValue }) => {
	try {
		const { data: existingUsers } = await axiosClient.get(
			`/users?email=${credentials.user.email}`
		);
		const isThisUser = existingUsers.find(
			(user: UserType) => user.id !== credentials.user.id
		);
		if (existingUsers.length > 0 && isThisUser) {
			toast.error(`Email already exists`);
			return rejectWithValue({ message: "Email already exists" });
		}
		const { data: user } = await axiosClient.put(
			`/users/${credentials.user.id}`,
			credentials.user
		);
		if (credentials.type === "USER") {
			localStorage.setItem("auth", JSON.stringify(user));
			toast.success("Your personal is updated successfully");
		} else {
			toast.success(
				`${credentials.user.fullName} personal is updated successfully`
			);
		}

		return { type: credentials.type, user: user as UserType };
	} catch (error: unknown) {
		const axiosError = error as RequestErrorType;
		const errorMessage = {
			message: axiosError.message || "Failed to log in",
		};
		toast.success(`Failed to log in updated ${credentials.user.fullName}`);
		return rejectWithValue(errorMessage);
	}
});
/**
 * Update the user
 */

export const getUsers = createAsyncThunk<
	UserType[],
	void,
	{ rejectValue: RequestErrorType }
>("auth/get", async (_, { rejectWithValue }) => {
	try {
		const { data: users } = await axiosClient.get(`/users`);
		return users;
	} catch (error: unknown) {
		const axiosError = error as RequestErrorType;
		const errorMessage = {
			message: axiosError.message || "Failed to log in",
		};
		return rejectWithValue(errorMessage);
	}
});
/**
 * Update the user
 */

export const addRemoveFavorite = createAsyncThunk<
	AddRemoveActionType,
	FavoritePayload,
	{ rejectValue: RequestErrorType; dispatch: AppDispatch }
>(
	"auth/addRemovFavorite",
	async (credentials, { rejectWithValue, dispatch }) => {
		try {
			const { data: user } = await axiosClient.get(
				`/users/${credentials.userId}`
			);

			const isFavorite = user.favorites.includes(credentials.clotheId);
			if (isFavorite) {
				user.favorites = user.favorites.filter(
					(item: string) => item !== credentials.clotheId
				);
			} else {
				user.favorites = [...user.favorites, credentials.clotheId];
			}
			await axiosClient.put(`/users/${credentials.userId}/`, user);
			localStorage.setItem("auth", JSON.stringify(user));

			toast.success(
				isFavorite
					? "Favorite removed successfully"
					: "Favorite added successfully"
			);
			dispatch(getFavorites({ id: user.id }));
			return {
				user: user,
			};
		} catch (error: unknown) {
			const axiosError = error as RequestErrorType;
			const errorMessage = {
				message: axiosError.message || "Failed to add remove favorite",
			};
			return rejectWithValue(errorMessage);
		}
	}
);
/**
 * Add Remove Favorite
 */

export const getFavorites = createAsyncThunk<
	ClothesTypes[],
	Pick<UserType, "id">,
	{ rejectValue: RequestErrorType }
>("auth/getFavorite", async (credentials, { rejectWithValue }) => {
	try {
		const { data: user } = await axiosClient.get(`/users/${credentials.id}`);
		const { data: clothes } = await axiosClient.get(`/clothes`);
		const favorites = user.favorites.map((item: string) =>
			clothes.find((cloth: ClothesTypes) => cloth.id === item)
		);
		return favorites;
	} catch (error: unknown) {
		const axiosError = error as RequestErrorType;
		const errorMessage = {
			message: axiosError.message || "Failed to get favorites",
		};
		return rejectWithValue(errorMessage);
	}
});
/**
 * Get Favorites
 */

export const addBasketItem = createAsyncThunk<
	AddRemoveActionType,
	BasketAddPayload,
	{ rejectValue: RequestErrorType; dispatch: AppDispatch }
>("auth/addBasketItem", async (credentials, { rejectWithValue, dispatch }) => {
	try {
		const { data: user } = await axiosClient.get(
			`/users/${credentials.userId}`
		);

		const thereIs = user.basket.find(
			(item: BasketItemType) =>
				item.clotheId === credentials.clotheId &&
				item.size === credentials.size
		);

		if (thereIs) {
			if (thereIs.count + credentials.count > thereIs.aviable) {
				toast.error(`Maximum count is ${thereIs.aviable}`);
				return rejectWithValue({
					message: `Maximum count is ${thereIs.aviable}`,
				});
			}
			user.basket = user.basket.map((item: BasketItemType) => {
				if (
					item.clotheId === credentials.clotheId &&
					item.size === credentials.size
				) {
					return { ...item, count: item.count + credentials.count };
				}
				return item;
			});
		} else {
			const basketItem = {
				id: generateUniqueId(),
				clotheId: credentials.clotheId,
				count: credentials.count,
				size: credentials.size,
				aviable: credentials.aviable,
			};
			user.basket = [...user.basket, basketItem];
		}
		await axiosClient.put(`/users/${credentials.userId}/`, user);
		localStorage.setItem("auth", JSON.stringify(user));

		dispatch(getBasketItems({ id: user.id }));
		toast.success("Cloth added to basket successfully");

		return {
			user: user,
		};
	} catch (error: unknown) {
		const axiosError = error as RequestErrorType;
		const errorMessage = {
			message: axiosError.message || "Failed to add basket item",
		};
		toast.error("Failed to add basket item");

		return rejectWithValue(errorMessage);
	}
});
/**
 * Add basket item
 */

export const removeBasketItem = createAsyncThunk<
	AddRemoveActionType,
	BasketRemovePayload,
	{ rejectValue: RequestErrorType; dispatch: AppDispatch }
>(
	"auth/removeBasketItem",
	async (credentials, { rejectWithValue, dispatch }) => {
		try {
			const { data: user } = await axiosClient.get(
				`/users/${credentials.userId}`
			);
			user.basket = user.basket.filter(
				(item: BasketItemType) => item.id !== credentials.basketId
			);

			await axiosClient.put(`/users/${credentials.userId}/`, user);
			localStorage.setItem("auth", JSON.stringify(user));
			dispatch(getBasketItems({ id: user.id }));
			toast.success("Cloth removed from basket successfully");

			return {
				user: user,
			};
		} catch (error: unknown) {
			const axiosError = error as RequestErrorType;
			const errorMessage = {
				message: axiosError.message || "Failed to remove basket item",
			};
			toast.error("Failed to remove basket item");
			return rejectWithValue(errorMessage);
		}
	}
);
/**
 * Remove basket item
 */

export const getBasketItems = createAsyncThunk<
	ClothesTypesForBasket[],
	Pick<UserType, "id">,
	{ rejectValue: RequestErrorType }
>("auth/getBasketItems", async (credentials, { rejectWithValue }) => {
	try {
		const { data: user } = await axiosClient.get(`/users/${credentials.id}`);
		const { data: clothes } = await axiosClient.get(`/clothes`);
		const basketItems = user.basket.map((item: BasketItemType) => {
			const cloth = clothes.find(
				(cloth: ClothesTypes) => cloth.id === item.clotheId
			);
			if (cloth) {
				return {
					...cloth,
					size: item.size,
					count: item.count,
					basketId: item.id,
				};
			} else {
				return null;
			}
		});

		return basketItems;
	} catch (error: unknown) {
		const axiosError = error as RequestErrorType;
		const errorMessage = {
			message: axiosError.message || "Failed to get basket items",
		};
		return rejectWithValue(errorMessage);
	}
});
/**
 * Get Basket items
 */
interface countEditorType
	extends Pick<ClothesTypesForBasket, "basketId" | "count"> {
	userId: string;
}

export const countEdit = createAsyncThunk<
	AddRemoveActionType,
	countEditorType,
	{ rejectValue: RequestErrorType; dispatch: AppDispatch }
>("auth/countEdit", async (credentials, { rejectWithValue, dispatch }) => {
	try {
		const { data: user } = await axiosClient.get(
			`/users/${credentials.userId}`
		);
		user.basket = user.basket.map((item: BasketItemType) => {
			if (item.id === credentials.basketId) {
				return { ...item, count: credentials.count };
			}
			return item;
		});

		await axiosClient.put(`/users/${credentials.userId}/`, user);
		localStorage.setItem("auth", JSON.stringify(user));
		dispatch(getBasketItems({ id: user.id }));

		return {
			user: user,
		};
	} catch (error: unknown) {
		const axiosError = error as RequestErrorType;
		const errorMessage = {
			message: axiosError.message || "Failed to get basket items",
		};
		return rejectWithValue(errorMessage);
	}
});
/**
 * Edit count in basket items
 */
