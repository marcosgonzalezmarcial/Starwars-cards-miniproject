import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'components/Modal'
import SearchForm from 'components/SearchForm'
import { useUsers } from 'hooks/useUsers'
import { ReactComponent as SearchIcon } from 'assets/icons/search-icon.svg'
import './SearchIcon.scss'

export default function SearchButton() {
	const [showModal, setShowModal] = useState(false)
	const { loggedIn } = useUsers()

	let navigate = useNavigate()

	function handleSearchClick() {
		if (!loggedIn) return navigate('/login')
		setShowModal(true)
	}

	const handleCloseForm = () => setShowModal(false)

	return (
		<>
			<button className="search-icon-btn" onClick={handleSearchClick}>
				<SearchIcon className="search-icon-svg" />
			</button>
			{showModal && (
				<Modal handleCloseForm={handleCloseForm}>
					<SearchForm handleCloseForm={handleCloseForm} />
				</Modal>
			)}
		</>
	)
}
