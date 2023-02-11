import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'components/Spinner'
import { useLisOfData } from 'hooks/useListOfData'
import './ListOfItems.scss'

const ListOfItems = ({ itemType, listOfUrls }) => {
  const { loading, data } = useLisOfData({ listOfUrls })
  let navigate = useNavigate()

  const selectItem = (e) => {
    const selectedValue = e.target.textContent
    navigate(`/${itemType}/${selectedValue.replaceAll(' ', '~')}`)
  }

  return (
    <>
      {loading ? (
        <Spinner small />
      ) : (
        data.map((item) => (
          <p
            key={item.name || item.title}
            onClick={selectItem}
            className="list-item"
          >
            {item.name || item.title}
          </p>
        ))
      )}
    </>
  )
}

export default memo(ListOfItems)
