import { createPortal } from 'react-dom'

const portal = document.getElementById('modal')

const LoginModal = ({ children }) => {
  return createPortal(children, portal)
}

export default LoginModal
