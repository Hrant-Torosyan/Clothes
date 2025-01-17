import Load from "@/components/shared/Load/Load";
import Register from "@/pages/auth/Register/Register";
import React, { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
const Layouts = lazy(() => import("@/components/Layouts/Layouts"));

const Login = lazy(() => import("@/pages/auth/Login/Login"));
const Welcome = lazy(() => import("@/pages/profile/Welcome/Welcome"));
const ClothesAsync = lazy(
	() => import("@/pages/profile/Clothes/Clothes.async")
);
const FavoritesAsync = lazy(
	() => import("@/pages/profile/Favorites/Favorites.async")
);
const ClothAsync = lazy(() => import("@/pages/profile/Cloth/Cloth.async"));
const BasketAsync = lazy(() => import("@/pages/profile/Basket/Basket.async"));

const App: React.FC = () => {
	return (
		<Router>
			<Suspense fallback={<Load />}>
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route element={<Layouts />}>
						<Route path="/" element={<Welcome />} />
						<Route path="/clothes" element={<ClothesAsync />} />
						<Route path="/clothes/:id" element={<ClothAsync />} />
						<Route path="/favorites" element={<FavoritesAsync />} />
						<Route path="/basket" element={<BasketAsync />} />
					</Route>
				</Routes>
			</Suspense>
		</Router>
	);
};

export default App;
