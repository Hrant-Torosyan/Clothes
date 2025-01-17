import { HTTP_STATUS } from "@/redux/constant";
export type HTTPStatus = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
export interface ErrorResponse {
	message: string;
}
/**
 * Type for HTTPStatus
 */
export interface FiltersType<T> {
	data: T;
	status: HTTPStatus;
	error: RequestErrorType;
}
export interface ErrorType {
	active: boolean;
	message: null | string;
}
/**
 * Type for input error state
 */
export type RequestErrorType = {
	message: string;
};
/**
 * Type for Recuest Error
 */

export type FavoritePayload = { userId: string; clotheId: string };
/**
 * Type for Recuest Error
 */

export type AddRemoveActionType = { user: UserType };
/**
 * Type for Recuest Error
 */

export type BasketAddPayload = {
	userId: string;
	clotheId: string;
	size: SizeType;
	count: number;
	aviable: number;
};
/**
 * Type for Recuest Error
 */
export type BasketRemovePayload = {
	userId: string;
	basketId: string;
};
/**
 * Type for Recuest Error
 */

export type UserType = {
	id: string;
	image: string;
	fullName: string;
	email: string;
	password: string;
	favorites: string[];
	basket: BasketItemType[];
};
/**
 * Type for User
 */

export type BasketItemType = {
	id: string;
	clotheId: string;
	count: number;
	size: SizeType;
};
/**
 * Type for User
 */
export interface ClothesTypes {
	id: string;
	img: string;
	name: string;
	price: string;
	description: string;
	sale: string | null;
	brand: string;
	category: string;
	colour: FiltersTypeData;
	size: SizeType[];
	gender: GenderType;
	aviable: number;
	comments: CommentType[];
}
/**
 * Type for Clothes
 */
export interface CommentType {
	id: string;
	user: Pick<UserType, "fullName" | "image" | "id">;
	rating: number;
	comment: string;
}
/**
 * Type for Clothes
 */
export interface ClothesTypesForBasket extends Omit<ClothesTypes, "size"> {
	count: number;
	size: SizeType;
	basketId: string;
}
/**
 * Type for Clothes in basket
 */

export type GenderType = "ALL" | "MALE" | "FEMALE" | "CHILDREN" | "UNISEX";
/**
 * Type for Brands & Categories
 */
export type SizeType = "S" | "M" | "L" | "XL" | "XXL";
/**
 * Type for Brands & Categories
 */

export type FilterKeysTypeData =
	| "gender"
	| "colour"
	| "category"
	| "brand"
	| "onSale"
	| "minPrice"
	| "maxPrice"
	| "search"
	| "size";
/**
 * Type for Brands & Categories
 */
export type FiltersTypeData = {
	id: string;
	name: string;
	hexColour?: string;
};
/**
 * Type for Colours
 */
