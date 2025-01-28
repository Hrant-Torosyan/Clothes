import React from "react";

type Props = {
	sale: null | string;
};

const ClothSale = ({ sale }: Props) => {
	return (
		sale && (
			<div className="py-2 px-4 bg-orange border-solid border-gray border-[0.1rem] rounded-xl flex items-center shadow">
				<p className="text-white text-sm">{sale}</p>
			</div>
		)
	);
};

export default ClothSale;
