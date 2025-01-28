import { MdAddShoppingCart } from "react-icons/md";
import { CiHeart, CiHome, CiUser } from "react-icons/ci";
import { IconType } from "react-icons";
import { SlBasket } from "react-icons/sl";
import { RoleType } from "@/types/types";
import { TiPlusOutline } from "react-icons/ti";
import { HiOutlineUsers } from "react-icons/hi";

export type NavButton = {
	title: string;
	href: string;
	icon: IconType;
	isLogined: boolean;
	role: RoleType;
};

export const navLinks: NavButton[] = [
	{
		title: "Users",
		href: "admin/users",
		icon: HiOutlineUsers,
		role: "ADMIN",
		isLogined: true,
	},
	{
		title: "Clothes",
		href: "admin/clothes",
		icon: TiPlusOutline,
		role: "ADMIN",
		isLogined: true,
	},
	{
		title: "Welcome",
		href: "/",
		icon: CiHome,
		role: "USER",
		isLogined: true,
	},
	{
		title: "Basket",
		href: "/basket",
		icon: SlBasket,
		role: "USER",
		isLogined: false,
	},
	{
		title: "Clothes",
		href: "/clothes",
		icon: MdAddShoppingCart,
		role: "USER",
		isLogined: true,
	},
	{
		title: "Favorites",
		href: "/favorites",
		icon: CiHeart,
		role: "USER",
		isLogined: false,
	},
	{
		title: "My profile",
		href: "/profile",
		icon: CiUser,
		role: "USER",
		isLogined: false,
	},
];
