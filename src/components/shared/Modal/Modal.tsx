import useClickOutside from "@/hooks/useClickOutside";
import { ReactNode } from "react";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";

type ModalProps = {
	children: ReactNode;
	className?: string;
	title: string;
	isOpen: boolean;
	onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({
	children,
	title,
	className = "",
	isOpen,
	onClose,
}) => {
	const modalRef = useClickOutside<HTMLDivElement>(() => onClose());
	const modalRoot = document.getElementById("modalRoot");

	return (
		isOpen &&
		ReactDOM.createPortal(
			<div className={`modal ${className}`}>
				<div ref={modalRef} className="modalContent">
					<div className="modalContentTitle">
						<h3>{title}</h3>
						<button onClick={onClose}>
							<IoClose />
						</button>
					</div>
					<div className="line"></div>
					<div className="modalContentItem">{children}</div>
				</div>
			</div>,
			modalRoot
		)
	);
};

export default Modal;
