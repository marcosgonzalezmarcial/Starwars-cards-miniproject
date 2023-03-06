import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import './Modal.scss'

function Modal({ children, handleClose }) {
  const modalRef = useRef()

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose()
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [modalRef, handleClose])

  return (
    <div className={`modal`}>
      <div ref={modalRef} className={`modal-content`}>
        <button className="modal__close-btn" onClick={handleClose}>
          X
        </button>
        {children}
      </div>
    </div>
  )
}

export default function ModalPortal({ children, handleClose }) {
  return ReactDOM.createPortal(
    <Modal handleClose={handleClose}>{children}</Modal>,
    document.getElementById('modal')
  )
}
