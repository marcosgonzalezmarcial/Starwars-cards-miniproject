import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'components/Modal'
import SearchForm from 'components/SearchForm'
import { useUsers } from 'hooks/useUsers'
import searchIconSvg from 'assets/icons/search-icon.svg'
import './SearchIcon.scss'

export default function SearchButton() {
  const [showModal, setShowModal] = useState(false)
  const { loggedIn } = useUsers()

  let navigate = useNavigate()

  function handleSearchClick() {
    if (!loggedIn) return navigate('/login')
    setShowModal(true)
  }

  const handleClose = useCallback(() => {
    setShowModal(false)
  }, [])

  return (
    <>
      <button className="search-icon-btn" onClick={handleSearchClick}>
        <img src={searchIconSvg} alt="search icon" />
      </button>
      {showModal && (
        <Modal handleClose={handleClose}>
          <SearchForm handleClose={handleClose} />
        </Modal>
      )}
    </>
  )
}
