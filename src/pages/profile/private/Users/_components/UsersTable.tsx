import React from "react";
import Image from "@/components/shared/Image/Image";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/widgets/EmptyState";
import { SlBasket } from "react-icons/sl";
import { UserType } from "@/types/types";
type TableProps = {
	users: UserType[];
	className?: string;
	setEditUserModal: (user: UserType) => void;
};

const UsersTable: React.FC<TableProps> = ({
	users,
	className,
	setEditUserModal,
}) => {
	return (
		<div
			className={`bg-appBlack rounded-[2.4rem] h-[84vh] flex flex-col overflow-hidden  ${className}`}
		>
			<div className="flex justify-between bg-appLightBlack border-[.2rem] border-solid border-appBlack p-12 rounded-t-[2.4rem] text-white text-base">
				<p className="w-[18%] text-left pr-8">User</p>
				<p className="w-[18%] text-left pr-8">Email</p>
				<p className="w-[18%] text-left pr-8">Age</p>
				<p className="w-[18%] text-left pr-8">Country</p>
				<p className="w-[18%] text-left pr-8">ROLE</p>
				<p className="w-[10%] text-right">Action</p>
			</div>
			<div className="h-full overflow-auto">
				{users.length ? (
					users.map((item, index) => (
						<div
							key={index}
							className={`flex justify-between items-center p-12 text-white text-base transition-all cursor-pointer hover:bg-appLightBlack ${
								index !== users.length - 1
									? "border-b-2 border-solid border-appLightBlack border-t-0 border-x-0"
									: ""
							}  `}
						>
							<div className="w-[18%] text-left text-sm overflow-hidden text-ellipsis whitespace-nowrap pr-8 flex items-center gap-3 ">
								<div className="rounded-full">
									<Image url={item.image} alt={item.fullName} />
								</div>
								<span className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
									{item.fullName}
								</span>
							</div>
							<div className="w-[18%] text-left flex items-center gap-4 overflow-hidden text-ellipsis whitespace-nowrap pr-8">
								{item.email}
							</div>
							<div className="w-[18%] text-left overflow-hidden text-ellipsis whitespace-nowrap pr-8">
								{item.age}
							</div>
							<div className="w-[18%] text-left overflow-hidden text-ellipsis whitespace-nowrap pr-8">
								{item.country}
							</div>
							<div className="w-[18%] text-left overflow-hidden text-ellipsis whitespace-nowrap pr-8">
								{item.role}
							</div>
							<div className="w-[10%] text-center">
								<Button
									style="SMALLER"
									type={"button"}
									onClick={() => setEditUserModal(item)}
									title={"Edite"}
									disabled={false}
								/>
								<Button
									reverse={true}
									style="SMALLER"
									type={"button"}
									onClick={() => console.log("")}
									title={"Delete"}
									disabled={false}
								/>
							</div>
						</div>
					))
				) : (
					<EmptyState
						className="h-full"
						icon={<SlBasket />}
						message="Basket is empty"
					/>
				)}
			</div>
		</div>
	);
};

export default UsersTable;
