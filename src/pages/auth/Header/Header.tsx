import Image from "@/components/shared/Image/Image";
import { NavLink } from "react-router-dom";

const Header = () => {
	return (
		<header className="p-4 bg-appLightBlack flex justify-between items-center">
			<NavLink className="w-24" to="/">
				<Image url="/images/Logo.png" alt="Logo" />
			</NavLink>
			<NavLink
				to={"/"}
				className={`px-5 py-3 text-base bg-gray border-solid rounded-xl border-appLightBlack transition-all hover:bg-orange`}
			>
				<span>Main Page</span>
			</NavLink>
		</header>
	);
};

export default Header;
