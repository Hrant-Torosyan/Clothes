import { FaStar } from "react-icons/fa6";

type Props = {
	count: number;
	editable: boolean;
	setCount?: (value: number) => void;
	className?: string;
};

const Stars = ({ className, count, setCount, editable }: Props) => {
	const totalStars = 7;
	const stars = Array.from(
		{ length: totalStars },
		(_, index) => index < count
	);

	return (
		<div className={`flex gap-3 ${className}`}>
			{stars.map((isFilled, index) => (
				<div
					key={index}
					className={`text-2xl
                        ${editable ? "cursor-pointer transition-all" : ""}
                        ${isFilled ? "text-orange" : "text-gray"}`}
					onClick={() => editable && setCount(index + 1)}
				>
					<FaStar />
				</div>
			))}
		</div>
	);
};

export default Stars;
