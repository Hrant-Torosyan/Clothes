import React, { useState } from "react";
import Load from "@/components/shared/Load/Load";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
const defaultImageUrl = "/icons/noImage.svg";

interface ImageProps {
	url: string;
	alt: string;
	className?: string;
	zoom?: boolean;
}

const Image: React.FC<ImageProps> = ({ url, alt, className, zoom }) => {
	const [loading, setLoading] = useState(true);

	const handleLoad = () => {
		setLoading(false);
	};

	const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		e.currentTarget.onerror = null;
		setLoading(false);
		e.currentTarget.src = defaultImageUrl;
	};

	return (
		<>
			{loading && <Load type="IMAGE" />}
			{zoom ? (
				<Zoom>
					<img
						src={url}
						alt={alt}
						className={`${loading ? "hidden" : ""} ${
							className ? className : ""
						}`}
						onLoad={handleLoad}
						onError={handleError}
					/>
				</Zoom>
			) : (
				<img
					src={url}
					alt={alt}
					className={`${loading ? "hidden" : ""} ${
						className ? className : ""
					}`}
					onLoad={handleLoad}
					onError={handleError}
				/>
			)}
		</>
	);
};

export default Image;
