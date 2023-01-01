import { useHeightObserver } from "hooks/useHeightObserver";
import ListOfItems from "components/ListOfItems";

const ListOfItemsWrapper = ({ itemType, elementData, itemSubType }) => {
    const { dynamicSize, fromRef } = useHeightObserver({ isLoading: false });

    return (
        <>
            <div ref={fromRef} className="flex-column cutoff-text">
                {itemType === "films" && (
                    <>
                        <h3 className="my-2">Appearances</h3>
                        <ListOfItems itemType={itemType} listOfUrls={elementData.films} />
                    </>
                )
                }
                {itemType === "starships" && (
                    <>
                        <h3 className="my-2">Starships</h3>
                        <ListOfItems itemType={itemType} listOfUrls={elementData.starships} />
                    </>
                )
                }
                {itemType === "characters" && itemSubType === "pilots" && (
                    <>
                        <h3 className="my-2">Starships</h3>
                        <ListOfItems itemType={itemType} listOfUrls={elementData.starships} />
                    </>
                )
                }
                {itemType === "characters" && itemSubType === "residents" && (
                    <>
                        <h3 className="my-2">Residents</h3>
                        <ListOfItems itemType={itemType} listOfUrls={elementData.residents} />
                    </>
                )
                }
            </div>
            {dynamicSize.height > 130 && window.innerWidth < 576 && (
                <input type="checkbox" className="expand-btn" />
            )}
        </>
    );
};

export default ListOfItemsWrapper;
