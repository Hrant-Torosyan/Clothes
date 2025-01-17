import { GenderType } from "@/types/types";

export const formatGenderName = (value: GenderType): string => {
	switch (value) {
		case "MALE":
			return "Men";
		case "FEMALE":
			return "Women";
		case "CHILDREN":
			return "Children";
		case "UNISEX":
			return "Unisex";
		default:
			return "All";
	}
};
