import "../../styles/GameAreaStructure.scss";
import React, { ReactNode } from "react";
import PropTypes from "prop-types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: "small" | "medium" | "large";
  title?: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  size = "medium",
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {title && <h2 className="modal-title">{title}</h2>}
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Modal;
