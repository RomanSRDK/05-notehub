import { useEffect } from "react";
import { createPortal } from "react-dom";
import NoteForm from "../NoteForm/NoteForm";
import css from "./Modal.module.css";
interface ModalProps {
  onClose: () => void;
}

function Modal({ onClose }: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>{<NoteForm onClose={onClose} />}</div>
    </div>,
    document.body,
  );
}

export default Modal;
