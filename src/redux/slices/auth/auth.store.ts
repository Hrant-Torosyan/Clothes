import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "@/redux/constant";
import {
	AddRemoveActionType,
	ClothesTypes,
	ClothesTypesForBasket,
	FiltersType,
	HTTPStatus,
	RequestErrorType,
	RoleType,
	StaticType,
	UserType,
} from "@/types/types";
import getUserInfo from "@/utils/getUserInfo";
import {
	addBasketItem,
	addRemoveFavorite,
	countEdit,
	deleteUser,
	getBasketItems,
	getFavorites,
	getUsers,
	login,
	register,
	removeBasketItem,
	updateUserInfo,
} from "@/redux/slices/auth/auth.thunk";
import { RootState } from "@/redux/store";

interface AuthState {
	user: UserType | null;

	status: HTTPStatus;
	error: RequestErrorType;
	users: UserType[];
	getUsersStatus: HTTPStatus;
	getUserserror: RequestErrorType;
	register: StaticType;
	updateUserInfo: StaticType;
	deleteUser: StaticType;

	addRemoveFavorite: StaticType;
	addBasket: StaticType;
	removeBasket: StaticType;
	countEdit: StaticType;
	favorites: FiltersType<ClothesTypes[]>;
	basket: FiltersType<ClothesTypesForBasket[]>;
}

const initialState: AuthState = {
	user: getUserInfo(),
	users: [],
	getUsersStatus: HTTP_STATUS.IDLE,
	error: null,
	status: HTTP_STATUS.IDLE,
	getUserserror: null,
	register: {
		status: HTTP_STATUS.IDLE,
		error: null,
	},
	updateUserInfo: {
		status: HTTP_STATUS.IDLE,
		error: null,
	},

	deleteUser: {
		status: HTTP_STATUS.IDLE,
		error: null,
	},
	addRemoveFavorite: {
		status: HTTP_STATUS.IDLE,
		error: null,
	},
	favorites: {
		data: [],
		status: HTTP_STATUS.IDLE,
		error: null,
	},
	addBasket: {
		status: HTTP_STATUS.IDLE,
		error: null,
	},
	removeBasket: {
		status: HTTP_STATUS.IDLE,
		error: null,
	},
	countEdit: {
		status: HTTP_STATUS.IDLE,
		error: null,
	},
	basket: {
		data: [],
		status: HTTP_STATUS.IDLE,
		error: null,
	},
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			localStorage.removeItem("auth");
			Object.assign(state, initialState);
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.register.status = HTTP_STATUS.PENDING;
				state.register.error = null;
			})
			.addCase(register.fulfilled, (state) => {
				state.register.status = HTTP_STATUS.FULFILLED;
			})
			.addCase(
				register.rejected,
				(state, action: PayloadAction<RequestErrorType>) => {
					state.register.status = HTTP_STATUS.REJECTED;
					state.register.error = action.payload;
				}
			)
			/**
			 * Register
			 */

			.addCase(login.pending, (state) => {
				state.status = HTTP_STATUS.PENDING;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action: PayloadAction<UserType>) => {
				state.user = action.payload;
				state.status = HTTP_STATUS.FULFILLED;
			})
			.addCase(
				login.rejected,
				(state, action: PayloadAction<RequestErrorType>) => {
					state.status = HTTP_STATUS.REJECTED;
					state.error = action.payload;
				}
			)
			/**
			 * Login
			 */

			.addCase(updateUserInfo.pending, (state) => {
				state.updateUserInfo.status = HTTP_STATUS.PENDING;
				state.updateUserInfo.error = null;
			})
			.addCase(
				updateUserInfo.fulfilled,
				(
					state,
					action: PayloadAction<{
						type: RoleType;
						user: UserType;
					}>
				) => {
					const { type, user } = action.payload;
					if (type === "USER") {
						state.user = user;
					} else {
						state.users = state.users.map((u) =>
							u.id === user.id ? user : u
						);
					}
					state.updateUserInfo.status = HTTP_STATUS.FULFILLED;
				}
			)
			.addCase(
				updateUserInfo.rejected,
				(state, action: PayloadAction<RequestErrorType>) => {
					state.updateUserInfo.status = HTTP_STATUS.REJECTED;
					state.updateUserInfo.error = action.payload;
				}
			)
			/**
			 * Update the user
			 */

			.addCase(deleteUser.pending, (state) => {
				state.deleteUser.status = HTTP_STATUS.PENDING;
				state.deleteUser.error = null;
			})
			.addCase(
				deleteUser.fulfilled,
				(state, action: PayloadAction<Pick<UserType, "id">>) => {
					state.users = state.users.filter(
						(u: UserType) => u.id !== action.payload.id
					);
					state.deleteUser.status = HTTP_STATUS.FULFILLED;
				}
			)
			.addCase(
				deleteUser.rejected,
				(state, action: PayloadAction<RequestErrorType>) => {
					state.deleteUser.status = HTTP_STATUS.REJECTED;
					state.deleteUser.error = action.payload;
				}
			)
			/**
			 * Delete user
			 */

			.addCase(getUsers.pending, (state) => {
				state.getUsersStatus = HTTP_STATUS.PENDING;
				state.getUserserror = null;
			})
			.addCase(
				getUsers.fulfilled,
				(state, action: PayloadAction<UserType[]>) => {
					state.users = action.payload;
					state.getUsersStatus = HTTP_STATUS.FULFILLED;
				}
			)
			.addCase(
				getUsers.rejected,
				(state, action: PayloadAction<RequestErrorType>) => {
					state.getUsersStatus = HTTP_STATUS.REJECTED;
					state.getUserserror = action.payload;
				}
			)
			/**
			 * Update the user
			 */
			.addCase(addRemoveFavorite.pending, (state) => {
				state.addRemoveFavorite.status = HTTP_STATUS.PENDING;
				state.addRemoveFavorite.error = null;
			})
			.addCase(
				addRemoveFavorite.fulfilled,
				(state, action: PayloadAction<AddRemoveActionType>) => {
					state.user = action.payload.user;
					state.addRemoveFavorite.status = HTTP_STATUS.FULFILLED;
				}
			)
			.addCase(
				addRemoveFavorite.rejected,
				(state, action: PayloadAction<RequestErrorType>) => {
					state.addRemoveFavorite.status = HTTP_STATUS.REJECTED;
					state.addRemoveFavorite.error = action.payload;
				}
			)
			/**
			 * Add Remove Favorite
			 */

			.addCase(getFavorites.pending, (state) => {
				state.favorites.status = HTTP_STATUS.PENDING;
				state.favorites.error = null;
			})
			.addCase(
				getFavorites.fulfilled,
				(state, action: PayloadAction<ClothesTypes[]>) => {
					state.favorites.data = action.payload;
					state.favorites.status = HTTP_STATUS.FULFILLED;
				}
			)
			.addCase(
				getFavorites.rejected,
				(state, action: PayloadAction<RequestErrorType>) => {
					state.favorites.status = HTTP_STATUS.REJECTED;
					state.favorites.error = action.payload;
				}
			)
			/**
			 * Get Favorites
			 */

			.addCase(addBasketItem.pending, (state) => {
				state.addBasket.status = HTTP_STATUS.PENDING;
				state.addBasket.error = null;
			})
			.addCase(
				addBasketItem.fulfilled,
				(state, action: PayloadAction<AddRemoveActionType>) => {
					state.user = action.payload.user;
					state.addBasket.status = HTTP_STATUS.FULFILLED;
				}
			)
			.addCase(
				addBasketItem.rejected,
				(state, action: PayloadAction<RequestErrorType>) => {
					state.addBasket.status = HTTP_STATUS.REJECTED;
					state.addBasket.error = action.payload;
				}
			)
			/**
			 * Add Basket Item
			 */
			.addCase(removeBasketItem.pending, (state) => {
				state.removeBasket.status = HTTP_STATUS.PENDING;
				state.removeBasket.error = null;
			})
			.addCase(
				removeBasketItem.fulfilled,
				(state, action: PayloadAction<AddRemoveActionType>) => {
					state.user = action.payload.user;
					state.removeBasket.status = HTTP_STATUS.FULFILLED;
				}
			)
			.addCase(
				removeBasketItem.rejected,
				(state, action: PayloadAction<RequestErrorType>) => {
					state.removeBasket.status = HTTP_STATUS.REJECTED;
					state.removeBasket.error = action.payload;
				}
			)
			/**
			 * Remove Basket Item
			 */

			.addCase(getBasketItems.pending, (state) => {
				state.basket.status = HTTP_STATUS.PENDING;
				state.basket.error = null;
			})
			.addCase(
				getBasketItems.fulfilled,
				(state, action: PayloadAction<ClothesTypesForBasket[]>) => {
					state.basket.data = action.payload;
					state.basket.status = HTTP_STATUS.FULFILLED;
				}
			)
			.addCase(
				getBasketItems.rejected,
				(state, action: PayloadAction<RequestErrorType>) => {
					state.basket.status = HTTP_STATUS.REJECTED;
					state.basket.error = action.payload;
				}
			)
			/**
			 * Get Favorites
			 */

			.addCase(countEdit.pending, (state) => {
				state.countEdit.status = HTTP_STATUS.PENDING;
				state.countEdit.error = null;
			})
			.addCase(
				countEdit.fulfilled,
				(state, action: PayloadAction<AddRemoveActionType>) => {
					state.user = action.payload.user;
					state.countEdit.status = HTTP_STATUS.FULFILLED;
				}
			)
			.addCase(
				countEdit.rejected,
				(state, action: PayloadAction<RequestErrorType>) => {
					state.countEdit.status = HTTP_STATUS.REJECTED;
					state.countEdit.error = action.payload;
				}
			);
		/**
		 * Get Favorites
		 */
	},
});
export const getUserState = (state: RootState) => state.auth;

export const { logout } = authSlice.actions;
export default authSlice.reducer;
