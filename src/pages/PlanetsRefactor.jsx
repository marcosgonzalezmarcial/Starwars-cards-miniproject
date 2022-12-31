import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "hooks/useSearch.js";
import useIsNearScreen from "hooks/useIsNearScreen.js";
import { Spinner } from "components/Spinner";
import SearchResults from "components/SearchResults";
import "../styles.scss";
import { getTransformedDataArray } from "services/getTransformedDataArray";
import { TYPE_OF_DATA } from "../constants";
// import { sortObjItems } from "../utils/sortItems.js";

const Planets = () => {
    const [page, setPage] = useState(0);
    const [planets, setPlanets] = useState([]);
    const { searchResultsItems } = useSearch();
    const [isLoading, setIsLoading] = useState(false)
    console.log(planets.length)

    const { isNearScreen, fromRef } = useIsNearScreen({ once: false })

    useEffect(() => {
        if (isLoading) return
        if (isNearScreen) {
            // if (page === 1) return
            setPage((prev) => prev + 1)
        }
    }, [isNearScreen])

    useEffect(() => {
        if (page >= 8) return
        if (page === 0) return
        setIsLoading(true)

        getTransformedDataArray({ page, typeOfData: TYPE_OF_DATA.PLANETS })
            .then((data) => {
                //checking data is not null
                data && setPlanets((prev) => [...prev, ...data]);
                // sorting items may be applied in future iterations
                // data && setPlanets((prev) => sortObjItems([...prev, ...data]));
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [page]);



    return (
        <>
            {searchResultsItems.length > 0 ? (
                <SearchResults searchResultsItems={searchResultsItems} />
            ) :
                (
                    <div
                        className={`my-3 my-md-4 ${planets.length > 0 ? "grid-container" : ""
                            }`}
                    >
                        {planets.map((planet) => (
                            <Link
                                className="grid-element-card"
                                key={planet.name}
                                to={planet.name.replaceAll(" ", "~")}
                            >
                                <div className="grid-card-hero">
                                    <img
                                        className="grid-card-hero-img"
                                        src={planet.imgUrl}
                                        alt={planet.name}
                                    />
                                </div>
                                <div className="text-secondary bg-dark p-3 grid-card-info">
                                    <h4>{planet.name}</h4>
                                    <p>{planet.climate}</p>
                                </div>
                            </Link>
                        ))}
                        {isLoading && <Spinner />}
                    </div>
                )

            }
            <div ref={fromRef}></div>
        </>
    );
};

export default Planets;
