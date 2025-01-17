import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Stars from "@/components/widgets/Stars";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { HTTP_STATUS } from "@/redux/constant";
import { getUserState } from "@/redux/slices/auth/auth.store";
import { getClothesState } from "@/redux/slices/clothes/clothes.store";
import { addComment } from "@/redux/slices/clothes/clothes.thunk";
import { ErrorType } from "@/types/types";
import { useState } from "react";
import { toast } from "sonner";
type CommentForm = {
	clothId: string;
};
const CommentForm = ({ clothId }: CommentForm) => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(getUserState);
	const { comments } = useAppSelector(getClothesState);
	const [comment, setComment] = useState<string>("");
	const [stars, setStars] = useState<number>(1);
	const [commentErr, setCommentErr] = useState<ErrorType>({
		active: false,
		message: null,
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (user) {
			dispatch(
				addComment({
					clotId: clothId,
					comment: {
						comment: comment,
						rating: stars,
						user: {
							id: user.id,
							fullName: user.fullName,
							image: user.image,
						},
					},
				})
			);
			setComment("");
			setStars(1);
		} else {
			setCommentErr({
				active: true,
				message: "Please log in to add a comment!",
			});

			toast.error("Please log in to add a comment!");
		}
	};
	return (
		<form onSubmit={handleSubmit} className="flex items-end gap-5">
			<div className="w-4/5 flex flex-col items-center">
				<Stars
					className="mb-5"
					editable={true}
					count={stars}
					setCount={setStars}
				/>
				<Input
					value={comment}
					setValue={setComment}
					error={commentErr}
					setError={setCommentErr}
					className="w-full"
					type={"TEXT"}
					placeholder={"Comment"}
					style="SMALL"
					disabled={false}
				/>
			</div>
			<div className="w-1/5">
				<Button
					style="SMALL"
					type={"submit"}
					title={"Add comment"}
					disabled={comments.status === HTTP_STATUS.PENDING}
				/>
			</div>
		</form>
	);
};

export default CommentForm;
