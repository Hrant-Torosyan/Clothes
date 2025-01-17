import Button from "@/components/ui/Button";
import { GenderType } from "@/types/types";
import { formatGenderName } from "@/utils/formatGenderName";

type Props = {
	buttons: GenderType[];
	value: string;
	setValue: (val: GenderType) => void;
	className?: string;
};

const SwitchButtons = ({ buttons, value, setValue, className }: Props) => {
	return (
		<div className={`flex items-center gap-4 ${className ? className : ""}`}>
			{buttons.map((button) => (
				<Button
					key={button}
					style="SMALL"
					type={"button"}
					title={formatGenderName(button)}
					onClick={() => setValue(button)}
					disabled={button === value}
				/>
			))}
		</div>
	);
};

export default SwitchButtons;
