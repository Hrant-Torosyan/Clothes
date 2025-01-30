import axiosClient from "@/redux/axiosClient";
import { AppDispatch } from "@/redux/store";
import {
	ClothesTypes,
	CommentType,
	FiltersTypeData,
	RequestErrorType,
} from "@/types/types";
import { generateUniqueId } from "@/utils/generateUniqueId";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const getClothes = createAsyncThunk<
	ClothesTypes[],
	null,
	{ rejectValue: RequestErrorType }
>("clothes/getClothes", async (_, { rejectWithValue }) => {
	try {
		const { data } = await axiosClient.get(`/clothes`);
		return data;
	} catch (error: unknown) {
		const axiosError = error as RequestErrorType;
		const errorMessage = {
			message: axiosError.message || "Failed to get clothes",
		};
		return rejectWithValue(errorMessage);
	}
});
/**
 * Get Clothes
 */

export const getCloth = createAsyncThunk<
	ClothesTypes,
	Pick<ClothesTypes, "id">,
	{ rejectValue: RequestErrorType }
>("clothes/getCloth", async ({ id }, { rejectWithValue }) => {
	try {
		const { data } = await axiosClient.get(`/clothes?id=${id}`);
		if (data.length > 0) {
			return data[0];
		} else {
			return rejectWithValue({ message: "Failed to get cloth" });
		}
	} catch (error: unknown) {
		const axiosError = error as RequestErrorType;
		const errorMessage = {
			message: axiosError.message || "Failed to get clothes",
		};
		return rejectWithValue(errorMessage);
	}
});
/**
 * Get Cloth
 */

export const updateCloth = createAsyncThunk<
	ClothesTypes,
	ClothesTypes,
	{ rejectValue: RequestErrorType }
>("clothes/updateCloth", async (credentials, { rejectWithValue }) => {
	try {
		const { data } = await axiosClient.put(
			`/clothes/${credentials.id}`,
			credentials
		);
		toast.success("Cloth updated successfully !");
		return data;
	} catch (error: unknown) {
		const axiosError = error as RequestErrorType;
		const errorMessage = {
			message: axiosError.message || "Failed to get clothes",
		};
		return rejectWithValue(errorMessage);
	}
});
/**
 * Update Cloth
 */
export const deleteCloth = createAsyncThunk<
	Pick<ClothesTypes, "id">,
	Pick<ClothesTypes, "id">,
	{ rejectValue: RequestErrorType }
>("clothes/deleteCloth", async (credentials, { rejectWithValue }) => {
	try {
		const { data } = await axiosClient.delete(`/clothes/${credentials.id}`);
		toast.success("Cloth deleted successfully !");
		return { id: data.id };
	} catch (error: unknown) {
		const axiosError = error as RequestErrorType;
		const errorMessage = {
			message: axiosError.message || "Failed to delete clothes",
		};
		return rejectWithValue(errorMessage);
	}
});
/**
 * Delete Cloth
 */
export const getBrands = createAsyncThunk<
	FiltersTypeData[],
	null,
	{ rejectValue: RequestErrorType }
>("clothes/getBrands", async (_, { rejectWithValue }) => {
	try {
		const { data } = await axiosClient.get(`/brands`);
		return data;
	} catch (error: unknown) {
		const axiosError = error as RequestErrorType;
		const errorMessage = {
			message: axiosError.message || "Failed to get clothes",
		};
		return rejectWithValue(errorMessage);
	}
});
/**
 * Get Brands
 */

export const getColours = createAsyncThunk<
	FiltersTypeData[],
	null,
	{ rejectValue: RequestErrorType }
>("clothes/getColours", async (_, { rejectWithValue }) => {
	try {
		const { data } = await axiosClient.get(`/colours`);
		return data;
	} catch (error: unknown) {
		const axiosError = error as RequestErrorType;
		const errorMessage = {
			message: axiosError.message || "Failed to get clothes",
		};
		return rejectWithValue(errorMessage);
	}
});
/**
 * Get Colours
 */
export const getCategories = createAsyncThunk<
	FiltersTypeData[],
	null,
	{ rejectValue: RequestErrorType }
>("clothes/getCategories", async (_, { rejectWithValue }) => {
	try {
		const { data } = await axiosClient.get(`/categories`);
		return data;
	} catch (error: unknown) {
		const axiosError = error as RequestErrorType;
		const errorMessage = {
			message: axiosError.message || "Failed to get clothes",
		};
		return rejectWithValue(errorMessage);
	}
});
/**
 * Get Categories
 */

export const getComments = createAsyncThunk<
	ClothesTypes,
	Pick<ClothesTypes, "id">,
	{ rejectValue: RequestErrorType }
>("clothes/getComments", async ({ id }, { rejectWithValue }) => {
	try {
		const { data } = await axiosClient.get(`/clothes`);
		const cloth = data.find((item: ClothesTypes) => item.id === id);

		return cloth;
	} catch (error: unknown) {
		const axiosError = error as RequestErrorType;
		const errorMessage = {
			message: axiosError.message || "Failed to get comments",
		};
		return rejectWithValue(errorMessage);
	}
});
/**
 * Get Comments
 */

type addCommentType = {
	clotId: string;
	comment: Omit<CommentType, "id">;
};
export const addComment = createAsyncThunk<
	CommentType[],
	addCommentType,
	{ rejectValue: RequestErrorType; dispatch: AppDispatch }
>("clothes/addComment", async (credentials, { rejectWithValue, dispatch }) => {
	try {
		const { data: clothes } = await axiosClient.get(`/clothes`);
		const cloth: ClothesTypes = clothes.find(
			(item: ClothesTypes) => item.id === credentials.clotId
		);
		cloth.comments = [
			...cloth.comments,
			{ ...credentials.comment, id: generateUniqueId() },
		] as CommentType[];

		const { data } = await axiosClient.put(
			`/clothes/${credentials.clotId}`,
			cloth
		);

		dispatch(getComments({ id: credentials.clotId }));
		toast.success("Your comment added successfully");

		return data;
	} catch (error: unknown) {
		const axiosError = error as RequestErrorType;
		const errorMessage = {
			message: axiosError.message || "Failed to add comment",
		};
		toast.error("Failed to add comment");
		return rejectWithValue(errorMessage);
	}
});
/**
 * Get Comments
 */
