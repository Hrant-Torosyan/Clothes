import Image from "@/components/shared/Image/Image";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { logout } from "@/redux/slices/auth/auth.store";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { navLinks } from "@/constants/navLinks";

const Nav: React.FC = () => {
	const { user } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const links = user
		? navLinks
		: navLinks.filter((link) => link.isLogined === true);

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<nav className="w-[18%] h-full py-16 bg-appBlack  overflow-auto flex flex-col justify-between">
			<div className="mb-12">
				<NavLink className="w-52 mx-auto block" to={"/"}>
					<Image url="/images/Logo.png" alt="Logo" />
				</NavLink>
				<div className="mx-auto w-4/5">
					<div className="line mt-16 mb-14"></div>
				</div>
			</div>
			<ul className="h-full">
				{links.map((link, index) => (
					<li key={index}>
						<NavLink to={link.href} className={`navItem`}>
							<div className="navItemFon"></div>
							<div className="w-12">
								<link.icon />
							</div>
							<span>{link.title}</span>
						</NavLink>
					</li>
				))}
			</ul>

			{user && (
				<div
					onClick={handleLogout}
					className="text-white text-2xl hover:text-orange transition-all cursor-pointer flex items-center pl-14 gap-4 mt-8"
				>
					<div className="w-12 ">
						<IoIosLogOut className="text-4xl" />
					</div>

					<span>Log out</span>
				</div>
			)}
		</nav>
	);
};

export default Nav;
