import Wrapper from "@/components/shared/cards/profile/Wrapper";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import ChooseSize from "@/components/widgets/ChooseSize";
import EmptyState from "@/components/widgets/EmptyState";
import { PiEmpty } from "react-icons/pi";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
	getClothesState,
	setFilterData,
	setFilters,
} from "@/redux/slices/clothes/clothes.store";
import { FilterKeysTypeData, FiltersTypeData, GenderType } from "@/types/types";
import Checkbox from "@/components/widgets/Checkbox";
type FilterClothesProps = {
	gender: string;
};
const FilterClothes: React.FC<FilterClothesProps> = ({ gender }) => {
	const { brands, categories, colours, filters } =
		useAppSelector(getClothesState);
	const dispatch = useAppDispatch();

	const {
		size: selectedSizes,
		brand: brandsFilter,
		onSale: onSaleFilter,
		category: categoryFilter,
		colour: colourFilter,
		maxPrice,
		minPrice,
		search,
	} = filters;

	const handleToggleFilter = (
		type: FilterKeysTypeData,
		value: FiltersTypeData | GenderType | string | boolean
	) => {
		dispatch(setFilters({ type, value }));
	};

	const handleSubmitFilter = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(setFilterData());
	};
	return (
		<Wrapper>
			<form onSubmit={handleSubmitFilter}>
				<div className="flex gap-5 mb-5">
					<Select
						title={"Brand"}
						selectedLength={brandsFilter.length}
						optionsRenderer={(search: string) => {
							let searchedBrands = brands.data.filter(
								(item) =>
									item.name
										.toLocaleLowerCase()
										.indexOf(search.toLocaleLowerCase()) > -1
							);

							return searchedBrands.length > 0 ? (
								searchedBrands.map(
									(brand: FiltersTypeData, key: number) => (
										<div
											onClick={() =>
												handleToggleFilter("brand", brand)
											}
											key={key}
											className={`selectMenuItem 	${
												brandsFilter.some(
													(item) => item.id === brand.id
												)
													? "active"
													: ""
											}`}
										>
											{brand.name}
										</div>
									)
								)
							) : (
								<EmptyState
									message={`No brands found matching "${search}".`}
									icon={<PiEmpty />}
								/>
							);
						}}
					/>
					<Select
						title={"Category"}
						selectedLength={categoryFilter.length}
						optionsRenderer={(search: string) => {
							let searchedCategories = categories.data.filter(
								(item) =>
									item.name
										.toLocaleLowerCase()
										.indexOf(search.toLocaleLowerCase()) > -1
							);
							return searchedCategories.length > 0 ? (
								searchedCategories.map(
									(category: FiltersTypeData, key: number) => (
										<div
											onClick={() =>
												handleToggleFilter("category", category)
											}
											key={key}
											className={`selectMenuItem 	${
												categoryFilter.some(
													(item) => item.id === category.id
												)
													? "active"
													: ""
											}`}
										>
											{category.name}
										</div>
									)
								)
							) : (
								<EmptyState
									message={`No categories found matching "${search}".`}
									icon={<PiEmpty />}
								/>
							);
						}}
					/>
					<Select
						title={"Colours"}
						selectedLength={colourFilter.length}
						optionsRenderer={(search: string) => {
							let searchedColours = colours.data.filter(
								(item) =>
									item.name
										.toLocaleLowerCase()
										.indexOf(search.toLocaleLowerCase()) > -1
							);
							return searchedColours.length ? (
								searchedColours.map(
									(colour: FiltersTypeData, key: number) => (
										<div
											onClick={() =>
												handleToggleFilter("colour", colour)
											}
											key={key}
											className={`selectMenuItem 	${
												colourFilter.some(
													(item) => item.id === colour.id
												)
													? "active"
													: ""
											}`}
										>
											<div
												style={{ background: colour.hexColour }}
												className={`w-10 h-10 rounded-lg`}
											></div>
											{colour.name}
										</div>
									)
								)
							) : (
								<EmptyState
									message={`No colours found matching "${search}".`}
									icon={<PiEmpty />}
								/>
							);
						}}
					/>
				</div>
				<div className="flex gap-5 mb-5">
					<Input
						value={minPrice || ""}
						setValue={(val) => handleToggleFilter("minPrice", val)}
						className=" w-full"
						type={"NUM"}
						placeholder={"Minimum price"}
						disabled={false}
						style="SMALL"
					/>
					<Input
						value={maxPrice || ""}
						setValue={(val) => handleToggleFilter("maxPrice", val)}
						className=" w-full"
						type={"NUM"}
						placeholder={"Maximum price"}
						disabled={false}
						style="SMALL"
					/>
				</div>
				<Input
					value={search || ""}
					setValue={(val) => handleToggleFilter("search", val)}
					type={"TEXT"}
					placeholder={"Search for clothes (name)"}
					disabled={false}
					style="SMALL"
				/>

				<div className="flex justify-between items-center mt-10">
					<ChooseSize
						selectedSizes={selectedSizes}
						onChange={(value) => handleToggleFilter("size", value)}
					/>
					<Checkbox
						title={"On sale"}
						isChecked={onSaleFilter}
						onChange={(value) => handleToggleFilter("onSale", value)}
					/>
					<div className="w-[20rem]">
						<Button
							reverse={true}
							style="SMALL"
							type={"submit"}
							title={"Show"}
							disabled={false}
						/>
					</div>
				</div>
			</form>
		</Wrapper>
	);
};

export default FilterClothes;
