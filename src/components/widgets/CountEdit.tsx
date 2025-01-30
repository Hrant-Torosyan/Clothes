import { FaMinus, FaPlus } from "react-icons/fa";

type Props = {
	count: number;
	setCount: (count: number) => void;
	min?: number;
	max?: number;
	className?: string;
};

const CountEdit = ({
	count,
	setCount,
	min = 1,
	max = 10000,
	className,
}: Props) => {
	const handleIncrement = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (count < max) {
			setCount(count + 1);
		}
	};

	const handleDecrement = (e: React.MouseEvent) => {
		e.stopPropagation();

		if (count > min) {
			setCount(count - 1);
		}
	};
	return (
		<div className={`flex items-center gap-6 ${className ? className : ""}`}>
			<button
				type="button"
				className={`transition-all hover:text-orange active:scale-90 ${
					count === min ? "opacity-40 pointer-events-none" : ""
				}`}
				onClick={handleDecrement}
			>
				<FaMinus />
			</button>
			<span className="w-8 text-center text-sm">{count}</span>
			<button
				type="button"
				onClick={handleIncrement}
				className={`transition-all hover:text-orange active:scale-90 ${
					count === max ? "opacity-40 pointer-events-none" : ""
				}`}
			>
				<FaPlus />
			</button>
		</div>
	);
};

export default CountEdit;
