import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'components/Modal'
import SearchForm from 'components/SearchForm'
import { useUsers } from 'hooks/useUsers'
import { ReactComponent as SearchIcon } from 'assets/icons/search-icon.svg'
import './SearchIcon.scss'

export default function SearchButton() {
	const [showSearchModal, setShowSearchModal] = useState(false)
	const { loggedIn } = useUsers()

	let navigate = useNavigate()

	function openSearchModal() {
		if (!loggedIn) return navigate('/login')
		setShowSearchModal(true)
	}

	const handleCloseForm = () => setShowSearchModal(false)

	return (
		<>
			<button className="search-icon-btn" onClick={openSearchModal}>
				<SearchIcon className="search-icon-svg" />
			</button>
			{showSearchModal && (
				<Modal handleCloseForm={handleCloseForm}>
					<SearchForm handleCloseForm={handleCloseForm} />
				</Modal>
			)}
		</>
	)
}
