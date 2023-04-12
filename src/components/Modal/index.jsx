import { useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import "./Modal.scss";

function Modal({ children }) {
  const modalRef = useRef();

  let navigate = useNavigate();

  const handleClose = useCallback(() => navigate("/"), [navigate]);

  useEffect(() => {
    console.log("running Modal Effect");
    const checkIfClickedOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [modalRef, handleClose]);

  return (
    <div className={`modal`}>
      <div ref={modalRef} className={`modal-content`}>
        <button className="modal__close-btn" onClick={handleClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default function ModalPortal({ children }) {
  return ReactDOM.createPortal(
    <Modal>{children}</Modal>,
    document.getElementById("modal-portal")
  );
}
