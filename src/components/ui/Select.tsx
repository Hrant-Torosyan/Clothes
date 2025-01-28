import Input from "@/components/ui/Input";
import useClickOutside from "@/hooks/useClickOutside";
import { useState } from "react";
import { FaAngleUp } from "react-icons/fa";

type Props = {
	title: string;
	selectedLength: number;
	classNames?: string;
	optionsRenderer: (search: string) => React.ReactNode;
};

const Select = ({
	title,
	classNames,
	optionsRenderer,
	selectedLength,
}: Props) => {
	const [openSelect, setOpenSelect] = useState(false);
	const [search, setSearch] = useState<string>("");
	const selectRef = useClickOutside<HTMLDivElement>(() =>
		setOpenSelect(false)
	);

	return (
		<div
			ref={selectRef}
			onClick={() => setOpenSelect(!openSelect)}
			className={`${
				openSelect ? "openSelectAnimation" : "closeSelectAnimation"
			} select ${selectedLength > 0 ? "active" : ""} ${classNames}`}
		>
			<p>{title}</p>
			<div className="angle">
				<FaAngleUp />
			</div>
			<div
				onClick={(e) => e.stopPropagation()}
				tabIndex={-1}
				className="selectMenu scroll"
			>
				<div className="p-4">
					<p className="text-xl mb-4">
						Selected {selectedLength > 0 ? selectedLength : "All"}
					</p>
					<Input
						name="search"
						value={search}
						onChange={(name, value) => setSearch(value)}
						type={"TEXT"}
						placeholder={"Search"}
						disabled={false}
						style="SMALL"
					/>
				</div>
				<div className="line"></div>
				<div className="p-4 max-h-[20rem] overflow-auto">
					{optionsRenderer(search)}
				</div>
			</div>
		</div>
	);
};

export default Select;
