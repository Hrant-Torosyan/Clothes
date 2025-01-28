import useClickOutside from "@/hooks/useClickOutside";
import { useState } from "react";
import { FaAngleUp } from "react-icons/fa";

type Props = {
	title: string;
	classNames?: string;
	select: string;
	setSelect: (value: string) => void;
	selectOptions?: string[];
};

const SimpleSelect = ({
	title,
	classNames,
	select,
	setSelect,
	selectOptions,
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
					{selectOptions.map((option: string, key: number) => (
						<div
							onClick={() => setSelect(option)}
							key={key}
							className={`selectMenuItem 	${
								option === select ? "active" : ""
							}`}
						>
							{option}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SimpleSelect;
