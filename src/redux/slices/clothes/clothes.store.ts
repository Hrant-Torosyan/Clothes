import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HTTP_STATUS } from "@/redux/constant";
import {
	ClothesTypes,
	FilterKeysTypeData,
	FiltersType,
	FiltersTypeData,
	GenderType,
	HTTPStatus,
	RequestErrorType,
	SizeType,
} from "@/types/types";
import {
	getBrands,
	getCategories,
	getCloth,
	getClothes,
	getColours,
	getComments,
} from "@/redux/slices/clothes/clothes.thunk";
import { RootState } from "@/redux/store";

interface ClothesState {
	clothesData: ClothesTypes[] | [];
	status: HTTPStatus;
	error: RequestErrorType;
	cloth: FiltersType<ClothesTypes>;
	brands: FiltersType<FiltersTypeData[]>;
	colours: FiltersType<FiltersTypeData[]>;
	categories: FiltersType<FiltersTypeData[]>;
	comments: FiltersType<null>;
	filters: {
		gender: GenderType;
		colour: FiltersTypeData[];
		category: FiltersTypeData[];
		brand: FiltersTypeData[];
		onSale: boolean;
		minPrice: string | null;
		maxPrice: string | null;
		search: string | null;
		size: SizeType[] | null;
	};
	filteredClothesData: ClothesTypes[];
}

const initialState: ClothesState = {
	clothesData: [],
	status: HTTP_STATUS.IDLE,
	error: null,
	cloth: {
		data: null,
		status: HTTP_STATUS.IDLE,
		error: null,
	},
	brands: {
		data: [],
		status: HTTP_STATUS.IDLE,
		error: null,
	},
	colours: {
		data: [],
		status: HTTP_STATUS.IDLE,
		error: null,
	},
	categories: {
		data: [],
		status: HTTP_STATUS.IDLE,
		error: null,
	},
	comments: {
		data: null,
		status: HTTP_STATUS.IDLE,
		error: null,
	},
	filters: {
		gender: "ALL",
		colour: [],
		category: [],
		brand: [],
		onSale: false,
		minPrice: null,
		maxPrice: null,
		search: null,
		size: null,
	},
	filteredClothesData: [],
};

const ClothesSlice = createSlice({
	name: "Clothes",
	initialState,
	reducers: {
		setFilters(
			state,
			action: PayloadAction<{
				type: FilterKeysTypeData;
				value: FiltersTypeData | GenderType | SizeType | string | boolean;
			}>
		) {
			const { type, value } = action.payload;
			const filterArray = state.filters[type];

			switch (type) {
				case "search":
				case "maxPrice":
				case "minPrice":
					{
						state.filters[type] = value as string;
					}
					break;
				case "onSale":
					{
						state.filters[type] = value as boolean;
					}
					break;

				case "size":
					{
						const sizeValue = value as SizeType;
						state.filters[type] = filterArray
							? (filterArray as SizeType[]).includes(sizeValue)
								? (filterArray as SizeType[]).filter(
										(item) => item !== sizeValue
								  )
								: [...(filterArray as SizeType[]), sizeValue]
							: [sizeValue];
					}

					break;

				case "gender":
					{
						const genderValue = value as GenderType;
						state.filters[type] = genderValue;
						ClothesSlice.caseReducers.setFilterData(state);
					}
					break;

				default:
					{
						const filterValue = value as FiltersTypeData;
						state.filters[type] = (filterArray as FiltersTypeData[]).some(
							(item: FiltersTypeData) => item.id === filterValue.id
						)
							? (filterArray as FiltersTypeData[]).filter(
									(item: FiltersTypeData) => item.id !== filterValue.id
							  )
							: [...(filterArray as FiltersTypeData[]), filterValue];
					}
					break;
			}
		},
		/**
		 * Set Filters Value
		 */
		setFilterData(state) {
			const { filters, clothesData } = state;
			state.filteredClothesData = clothesData.filter(
				(cloth: ClothesTypes) => {
					const matchesSearch = filters.search
						? cloth.name
								.toLowerCase()
								.includes(filters.search.toLowerCase())
						: true;

					const matchesMinPrice = filters.minPrice
						? cloth.price >= filters.minPrice
						: true;
					const matchesMaxPrice = filters.maxPrice
						? cloth.price <= filters.maxPrice
						: true;

					const matchesSize = filters.size?.length
						? filters.size.some((size) => cloth.size.includes(size))
						: true;

					const matchesGender =
						filters.gender === "ALL" || cloth.gender === filters.gender;

					const matchesColour = filters.colour.length
						? filters.colour.some(
								(colour) => colour.id === cloth.colour.id
						  )
						: true;

					const matchesCategory = filters.category.length
						? filters.category.some(
								(category) => category.id === cloth.category
						  )
						: true;

					const matchesBrand = filters.brand.length
						? filters.brand.some((brand) => brand.id === cloth.brand)
						: true;

					const matchesSales = filters.onSale ? cloth.sale !== null : true;

					return (
						matchesSearch &&
						matchesMinPrice &&
						matchesMaxPrice &&
						matchesSize &&
						matchesGender &&
						matchesColour &&
						matchesCategory &&
						matchesSales &&
						matchesBrand
					);
				}
			);
		},
		/**
		 * Set Filter Data
		 */
	},
	extraReducers: (builder) => {
		builder
			.addCase(getClothes.pending, (state) => {
				state.status = HTTP_STATUS.PENDING;
				state.error = null;
			})
			.addCase(
				getClothes.fulfilled,
				(state, action: PayloadAction<ClothesTypes[]>) => {
					state.clothesData = action.payload;
					state.filteredClothesData =
						state.filters.gender === "ALL"
							? action.payload
							: action.payload.filter(
									(cloth: ClothesTypes) =>
										cloth.gender === state.filters.gender ||
										cloth.gender === "UNISEX"
							  );
					state.status = HTTP_STATUS.FULFILLED;
				}
			)
			.addCase(
				getClothes.rejected,
				(state, action: PayloadAction<RequestErrorType>) => {
					state.status = HTTP_STATUS.REJECTED;
					state.error = action.payload;
				}
			)
			/**
			 * Get Clothes
			 */
			.addCase(getCloth.pending, (state) => {
				state.cloth.status = HTTP_STATUS.PENDING;
				state.cloth.error = null;
			})
			.addCase(
				getCloth.fulfilled,
				(state, action: PayloadAction<ClothesTypes>) => {
					state.cloth.data = action.payload;
					state.cloth.status = HTTP_STATUS.FULFILLED;
				}
			)
			.addCase(
				getCloth.rejected,
				(state, action: PayloadAction<RequestErrorType>) => {
					state.cloth.status = HTTP_STATUS.REJECTED;
					state.cloth.error = action.payload;
				}
			)
			/**
			 * Get Cloth
			 */

			.addCase(getBrands.pending, (state) => {
				state.brands.status = HTTP_STATUS.PENDING;
				state.brands.error = null;
			})
			.addCase(
				getBrands.fulfilled,
				(state, action: PayloadAction<FiltersTypeData[]>) => {
					state.brands.data = action.payload;
					state.brands.status = HTTP_STATUS.FULFILLED;
				}
			)
			.addCase(
				getBrands.rejected,
				(state, action: PayloadAction<RequestErrorType>) => {
					state.brands.status = HTTP_STATUS.REJECTED;
					state.brands.error = action.payload;
				}
			)
			/**
			 * Get Brands
			 */
			.addCase(getColours.pending, (state) => {
				state.colours.status = HTTP_STATUS.PENDING;
				state.colours.error = null;
			})
			.addCase(
				getColours.fulfilled,
				(state, action: PayloadAction<FiltersTypeData[]>) => {
					state.colours.data = action.payload;
					state.colours.status = HTTP_STATUS.FULFILLED;
				}
			)
			.addCase(
				getColours.rejected,
				(state, action: PayloadAction<RequestErrorType>) => {
					state.colours.status = HTTP_STATUS.REJECTED;
					state.colours.error = action.payload;
				}
			)
			/**
			 * Get Colours
			 */
			.addCase(getCategories.pending, (state) => {
				state.categories.status = HTTP_STATUS.PENDING;
				state.categories.error = null;
			})
			.addCase(
				getCategories.fulfilled,
				(state, action: PayloadAction<FiltersTypeData[]>) => {
					state.categories.data = action.payload;
					state.categories.status = HTTP_STATUS.FULFILLED;
				}
			)
			.addCase(
				getCategories.rejected,
				(state, action: PayloadAction<RequestErrorType>) => {
					state.categories.status = HTTP_STATUS.REJECTED;
					state.categories.error = action.payload;
				}
			)
			/**
			 * Get Categories
			 */
			.addCase(getComments.pending, (state) => {
				state.comments.status = HTTP_STATUS.PENDING;
				state.comments.error = null;
			})
			.addCase(
				getComments.fulfilled,
				(state, action: PayloadAction<ClothesTypes>) => {
					state.cloth.data = action.payload;
					state.comments.status = HTTP_STATUS.FULFILLED;
				}
			)
			.addCase(
				getComments.rejected,
				(state, action: PayloadAction<RequestErrorType>) => {
					state.comments.status = HTTP_STATUS.REJECTED;
					state.comments.error = action.payload;
				}
			);
		/**
		 * Get Categories
		 */
	},
});

export const { setFilters, setFilterData } = ClothesSlice.actions;

export const getClothesState = (state: RootState) => state.clothes;
export default ClothesSlice.reducer;
