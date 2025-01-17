import { createRoot } from "react-dom/client";
import App from "./App/App";
import "./app/styles/main.scss";
import InitialConfigProvider from "@/providers/InitialConfigProvider";
import { Toaster } from "sonner";
createRoot(document.getElementById("root")!).render(
	<InitialConfigProvider>
		<App />
		<Toaster
			position="bottom-right"
			className="toast"
			theme="dark"
			duration={5000}
			richColors
		/>
	</InitialConfigProvider>
);
