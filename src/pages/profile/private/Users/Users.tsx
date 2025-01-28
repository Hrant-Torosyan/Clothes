import Title from "@/components/widgets/Title";
import { useAppSelector } from "@/hooks/reduxHooks";
import EditUserModal from "@/pages/profile/private/Users/_components/EditUserModal";
import UsersTable from "@/pages/profile/private/Users/_components/UsersTable";
import { getUserState } from "@/redux/slices/auth/auth.store";
import { UserType } from "@/types/types";
import React, { useState } from "react";

const Users = () => {
	const { users } = useAppSelector(getUserState);
	const filteredUsers = users.filter((user) => user.role === "USER");
	const [editUserModal, setEditUserModal] = useState<UserType | null>(null);

	return (
		<div>
			<Title title="Users" />
			<UsersTable
				setEditUserModal={setEditUserModal}
				users={filteredUsers}
			/>
			{editUserModal && (
				<EditUserModal
					editUserModal={editUserModal}
					onClose={() => setEditUserModal(null)}
				/>
			)}
		</div>
	);
};

export default Users;
