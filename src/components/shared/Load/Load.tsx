import style from "./Load.module.scss";

const Load = ({ type = "MAIN" }: { type?: "MAIN" | "IMAGE" }) => {
	return (
		<div className={style.loader}>
			{type === "MAIN" ? (
				<div className={style.loader_main}></div>
			) : (
				<div className={style.loader_image}>
					<img src="/icons/noImage.svg" alt="Load" />
				</div>
			)}
		</div>
	);
};

export default Load;
