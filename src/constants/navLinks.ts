import { GiClothes } from "react-icons/gi";
import { CiHome } from "react-icons/ci";
import { IconType } from "react-icons";
import { SlBasket } from "react-icons/sl";
import { FaHeart } from "react-icons/fa";

export type NavButton = {
	title: string;
	href: string;
	icon: IconType;
	isLogined: boolean;
};

export const navLinks: NavButton[] = [
	{ title: "Welcome", href: "/", icon: CiHome, isLogined: true },
	{ title: "Basket", href: "/basket", icon: SlBasket, isLogined: false },
	{ title: "Clothes", href: "/clothes", icon: GiClothes, isLogined: true },
	{ title: "Favorites", href: "/favorites", icon: FaHeart, isLogined: false },
];
