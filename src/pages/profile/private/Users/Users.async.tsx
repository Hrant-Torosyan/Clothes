import Load from "@/components/shared/Load/Load";
import Users from "@/pages/profile/private/Users/Users";
import { useUsers } from "@/pages/profile/private/Users/useUsers";

const UsersAsync = () => {
	const { isLoading } = useUsers();


	if (isLoading) {
		return (
			<div className="h-screen">
				<Load />
			</div>
		);
	}
	return <Users />;
};

export default UsersAsync;
