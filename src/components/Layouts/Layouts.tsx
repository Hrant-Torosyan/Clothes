import { Outlet } from "react-router";
import Nav from "@/components/Layouts/Nav/Nav";
import Footer from "@/components/Layouts/Footer/Footer";
import Header from "@/components/Layouts/Header/Header";

const Layouts = () => {
	return (
		<>
			<Nav />
			<div className="w-[82%] h-full overflow-auto">
				<Header />
				<main className="w-full p-8 ">
					<Outlet />
				</main>
				<Footer />
			</div>
		</>
	);
};

export default Layouts;
