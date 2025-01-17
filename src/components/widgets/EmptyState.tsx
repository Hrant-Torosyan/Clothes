import React from "react";

type EmptyStateProps = {
	message: string;
	icon: React.ReactNode;
	className?: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({
	message,
	icon,
	className = "",
}) => {
	return (
		<div
			className={`flex w-full flex-col items-center justify-center p-6 ${className}`}
		>
			{icon && <div className="mb-4 text-orange text-5xl">{icon}</div>}
			<p className="w-full text-center text-white text-xl break-words truncate">
				{message}
			</p>
		</div>
	);
};

export default EmptyState;
