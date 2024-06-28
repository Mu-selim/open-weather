import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import propTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";

export const Modal = ({ isOpen, onClose, children }) => {
  const ref = useRef(null);
  const { t } = useTranslation("global");

  useEffect(() => {
    // Close the modal when the user clicks outside of it or presses the Escape key
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose, isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex w-full bg-slate-800/10 filter backdrop-blur-md dark:bg-slate-300/10 dark:backdrop-blur-sm">
      <div className="container flex h-screen w-full items-center justify-center">
        <div ref={ref} className="relative rounded-md bg-gray-100 p-4 pt-8 shadow-lg">
          <button
            type="button"
            onClick={onClose}
            className="absolute end-2 top-2"
            aria-label={t("language.modal.close")}
            title={t("language.modal.close")}
          >
            <X className="size-6 text-gray-500" />
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("portal-root") // Place to mount the portal container
  );
};

Modal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  children: propTypes.node.isRequired,
};
