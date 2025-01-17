import Image from "@/components/shared/Image/Image";
import EmptyState from "@/components/widgets/EmptyState";
import Stars from "@/components/widgets/Stars";
import { CommentType } from "@/types/types";
import { PiEmpty } from "react-icons/pi";
type CommentsListType = {
	comments: CommentType[];
};
const CommentsList = ({ comments }: CommentsListType) => {
	return (
		<div className="flex flex-col gap-7 max-h-[50rem] overflow-auto rounded-xl">
			{comments.length ? (
				comments.map((comment: CommentType) => (
					<div
						key={comment.id}
						className="bg-appLightBlack p-7 rounded-xl"
					>
						<div className="flex justify-between ">
							<div className="flex gap-3 items-center">
								<div className="w-20 h-20 rounded-full bg-appBlack flex justify-center items-center">
									<Image
										className="w-1/3 h-auto"
										url={comment.user.image}
										alt={"Logo"}
									/>
								</div>
								<h3 className="text-white text-xl">
									{comment.user.fullName}
								</h3>
							</div>
							<Stars
								className="mb-5"
								editable={false}
								count={comment.rating}
							/>
						</div>
						<p className="text-2xl mt-8">{comment.comment}</p>
					</div>
				))
			) : (
				<EmptyState
					className="my-28"
					message={`There are no comments`}
					icon={<PiEmpty />}
				/>
			)}
		</div>
	);
};

export default CommentsList;
