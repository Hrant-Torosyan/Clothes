import { useAppSelector } from "@/hooks/reduxHooks";
import CommentForm from "@/pages/profile/Cloth/_components/CommentForm";
import CommentsList from "@/pages/profile/Cloth/_components/CommentsList";
import { getClothesState } from "@/redux/slices/clothes/clothes.store";
import React from "react";

const Comment = () => {
	const { cloth } = useAppSelector(getClothesState);
	return (
		<div>
			<CommentsList comments={cloth.data.comments} />
			<div className="w-11/12 mx-auto my-7">
				<div className="line"></div>
			</div>
			<CommentForm clothId={cloth.data.id} />
		</div>
	);
};

export default Comment;
