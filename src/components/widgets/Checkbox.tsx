import { FaRegCheckCircle } from "react-icons/fa";

type Props = {
	title: string;
	isChecked: boolean;
	onChange: (val: boolean) => void;
	className?: string;
};

const Checkbox = ({ title, isChecked, onChange, className }: Props) => {
	const handleClick = () => {
		onChange(!isChecked);
	};
	return (
		<div
			onClick={handleClick}
			className={`flex items-center text-base gap-2 cursor-pointer group ${
				className ? className : ""
			}`}
		>
			<FaRegCheckCircle
				className={`text-xl transition-all ${
					isChecked ? "text-orange" : ""
				}`}
			/>
			<span className="transition-all group-hover:text-orange">{title}</span>
		</div>
	);
};

export default Checkbox;
