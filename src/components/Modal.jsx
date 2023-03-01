// import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.scss'

function Modal({ children, handleClose }) {
  return (
    <div className={`modal`}>
      <div className={`modal-content`}>
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
