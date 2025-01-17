import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";

interface InitialConfigProviderProps {
	children: ReactNode;
}

const InitialConfigProvider: React.FC<InitialConfigProviderProps> = ({
	children,
}) => {
	return <Provider store={store}>{children}</Provider>;
};

export default InitialConfigProvider;
