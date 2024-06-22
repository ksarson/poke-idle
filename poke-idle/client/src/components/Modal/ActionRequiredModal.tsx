import "../../styles/GameAreaStructure.scss";
import React from "react";
import PropTypes from "prop-types";

interface ActionRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: "small" | "medium" | "large";
  title?: string;
  children: React.ReactNode;
  disableOutsideClick?: boolean;
}

const ActionRequiredModal: React.FC<ActionRequiredModalProps> = ({
  isOpen,
  onClose,
  size = "medium",
  title,
  children,
  disableOutsideClick = false,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (!disableOutsideClick) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className={`modal-content ${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h3 className="modal-title">{title}</h3>}
        {children}
      </div>
    </div>
  );
};

ActionRequiredModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  disableOutsideClick: PropTypes.bool,
};

export default ActionRequiredModal;
