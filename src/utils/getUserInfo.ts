import { UserType } from "@/types/types";
export default function getUserInfo(): UserType | null {
	return JSON.parse(localStorage.getItem("auth")!) || null;
}
