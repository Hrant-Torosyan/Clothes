import Wrapper from "@/components/shared/cards/profile/Wrapper";
import { useAppSelector } from "@/hooks/reduxHooks";
import CommentForm from "@/pages/profile/public/Cloth/_components/CommentForm";
import CommentsList from "@/pages/profile/public/Cloth/_components/CommentsList";
import { getClothesState } from "@/redux/slices/clothes/clothes.store";

const Comment = () => {
	const { cloth } = useAppSelector(getClothesState);
	return (
		<Wrapper className="mt-8">
			<CommentsList comments={cloth.data.comments} />
			<div className="w-11/12 mx-auto my-7">
				<div className="line"></div>
			</div>
			<CommentForm clothId={cloth.data.id} />
		</Wrapper>
	);
};

export default Comment;
