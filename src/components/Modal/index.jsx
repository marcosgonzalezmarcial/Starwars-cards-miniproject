import { useEffect, useRef, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom'
import './Modal.scss'

function Modal({ children, handleCloseForm }) {
	const modalRef = useRef()

	let navigate = useNavigate()

	const handleCloseModal = useCallback(() => {
		if (handleCloseForm) {
			handleCloseForm()
		} else {
			navigate('/')
		}
	}, [navigate, handleCloseForm])

	useEffect(() => {
		console.log('running Modal Effect')
		const checkIfClickedOutside = e => {
			if (modalRef.current && !modalRef.current.contains(e.target)) {
				handleCloseModal()
			}
		}

		document.addEventListener('mousedown', checkIfClickedOutside)

		return () => {
			// Cleanup the event listener
			document.removeEventListener('mousedown', checkIfClickedOutside)
		}
	}, [modalRef, handleCloseModal])

	return (
		<div className={`modal`}>
			<div ref={modalRef} className={`modal-content`}>
				<button className="modal__close-btn" onClick={handleCloseModal}>
					X
				</button>
				{children}
			</div>
		</div>
	)
}

export default function ModalPortal({ children, handleCloseForm }) {
	return ReactDOM.createPortal(
		<Modal handleCloseForm={handleCloseForm}>{children}</Modal>,
		document.getElementById('modal-portal')
	)
}
