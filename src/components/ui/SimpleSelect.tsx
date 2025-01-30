import useClickOutside from "@/hooks/useClickOutside";
import { useState } from "react";
import { FaAngleUp } from "react-icons/fa";

type Props = {
	title: string;
	classNames?: string;
	select: string;
	optionsRenderer: () => React.ReactNode;
};

const SimpleSelect = ({
	title,
	classNames,
	select,
	optionsRenderer,
}: Props) => {
	const [openSelect, setOpenSelect] = useState(false);
	const selectRef = useClickOutside<HTMLDivElement>(() =>
		setOpenSelect(false)
	);

	return (
		<div
			ref={selectRef}
			onClick={() => setOpenSelect(!openSelect)}
			className={`${
				openSelect ? "openSelectAnimation" : "closeSelectAnimation"
			} select ${classNames}`}
		>
			<p>{select ? select : title}</p>
			<div className="angle">
				<FaAngleUp />
			</div>
			<div tabIndex={-1} className="selectMenu scroll">
				<div className="p-4 max-h-[20rem] overflow-auto">
					{optionsRenderer()}
				</div>
			</div>
		</div>
	);
};

export default SimpleSelect;
