import { useSearch } from 'hooks/useSearch'
import { Link, useSearchParams } from 'react-router-dom'

export default function SearchResults() {
  const [searchParams] = useSearchParams()
  const searchCategory = searchParams.get('category')
  const searchTerm = searchParams.get('searchTerm')
  const { searchResultsItems } = useSearch({ searchCategory, searchTerm })

  return searchResultsItems ? (
    searchResultsItems.map((item) => (
      <div className="grid-items">
        <Link
          className="grid-item"
          key={item.model ?? item.name}
          to={`/${searchCategory}/${item.name.replaceAll(' ', '~')}`}
        >
          <div className="grid-item__hero">
            <img
              className="grid-item__img"
              src={item.imgUrl || item.image}
              alt={item.name}
            />
          </div>
          <div className="grid-item__info">
            <h4>{item.name}</h4>
            <p>{item.model ?? item.species}</p>
          </div>
        </Link>
      </div>
    ))
  ) : (
    <div
      style={{
        marginTop: '5vh',
        textAlign: 'center',
        color: 'var(--primary-white)'
      }}
    >
      <h1>No results found</h1>
    </div>
  )

  // return (
  //   <div className="grid-items">
  //     {searchResultsItems ? (
  //       // <div className="grid-items">
  //       searchResultsItems.map((item) => (
  //         <Link
  //           className="grid-item"
  //           key={item.model ?? item.name}
  //           to={`/${searchCategory}/${item.name.replaceAll(' ', '~')}`}
  //         >
  //           <div className="grid-item__hero">
  //             <img
  //               className="grid-item__img"
  //               src={item.imgUrl || item.image}
  //               alt={item.name}
  //             />
  //           </div>
  //           <div className="grid-item__info">
  //             <h4>{item.name}</h4>
  //             <p>{item.model ?? item.species}</p>
  //           </div>
  //         </Link>
  //       ))
  //     ) : (
  //       // </div>
  //       <div
  //         style={{
  //           marginTop: '5vh',
  //           textAlign: 'center',
  //           color: 'var(--primary-white)'
  //         }}
  //       >
  //         <h1>No results found</h1>
  //       </div>
  //     )}
  //   </div>
  // )
}
