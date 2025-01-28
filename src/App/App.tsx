import Load from "@/components/shared/Load/Load";
import React, { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const Layouts = lazy(() => import("@/components/Layouts/Layouts"));
const Register = lazy(() => import("@/pages/auth/Register/Register"));
const Login = lazy(() => import("@/pages/auth/Login/Login"));
const Welcome = lazy(() => import("@/pages/profile/public/Welcome/Welcome"));
const ClothesAsync = lazy(
	() => import("@/pages/profile/public/Clothes/Clothes.async")
);
const FavoritesAsync = lazy(
	() => import("@/pages/profile/public/Favorites/Favorites.async")
);
const ClothAsync = lazy(
	() => import("@/pages/profile/public/Cloth/Cloth.async")
);
const BasketAsync = lazy(
	() => import("@/pages/profile/public/Basket/Basket.async")
);
const Profile = lazy(() => import("@/pages/profile/public/Profile/Profile"));

const UsersAsync = lazy(
	() => import("@/pages/profile/private/Users/Users.async")
);

const ClothesAsyncAdmin = lazy(
	() => import("@/pages/profile/private/Clothes/Clothes.async")
);

const App: React.FC = () => {
	return (
		<Router>
			<Suspense fallback={<Load />}>
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route element={<Layouts />}>
						<Route path="/" element={<Welcome />} />
						<Route
							path="/admin/clothes"
							element={<ClothesAsyncAdmin />}
						/>
						<Route path="/admin/users" element={<UsersAsync />} />
						<Route path="/clothes" element={<ClothesAsync />} />
						<Route path="/clothes/:id" element={<ClothAsync />} />
						<Route path="/favorites" element={<FavoritesAsync />} />
						<Route path="/basket" element={<BasketAsync />} />
						<Route path="/profile" element={<Profile />} />
					</Route>
				</Routes>
			</Suspense>
		</Router>
	);
};

export default App;
