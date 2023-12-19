import React, { useState } from 'react'
import Card from '../Card/card-component';
import itemData from '../../assets/dummydata.json';
import Preview from '../Preview/preview-component';



function Main() {

    const [show, setShow] = React.useState(false);
    const [search, setSearch] = useState("");
    const [addedItemData, setAddedItemData] = useState(localStorage.getItem('itemListData') ? JSON.parse(localStorage.getItem('itemListData')) : itemData.products);





    const onclickOnAdd = () => {
        setShow(true)
    }
    const getaddedItemsInList = (addedList) => {
        let data = [...addedItemData, addedList]
        setAddedItemData([...addedItemData, addedList])
        localStorage.setItem("itemListData", JSON.stringify(data))
    }

    const updateItemsInList = (updatedList) => {

        const index = addedItemData.findIndex((item) => item.id === updatedList.id);

        if (index !== -1) {
            addedItemData[index] = updatedList;
        }
        let data = [...addedItemData]
        setAddedItemData([...addedItemData])
        localStorage.setItem("itemListData", JSON.stringify(data))
    }

    const deleteItemFromTheList = (deleteItem) => {
        const index = addedItemData.findIndex((item) => item.id === deleteItem.id);

        if (index !== -1) {
            addedItemData.splice(addedItemData.indexOf(deleteItem), 1);
        }
        let data = [...addedItemData]
        setAddedItemData([...addedItemData])
        localStorage.setItem("itemListData", JSON.stringify(data))
    }
    const searchBook = async (evt) => {
        if (evt.key === "Enter") {
            if (search) {
                setAddedItemData(addedItemData.filter(obj => obj.category.toLowerCase() === search.toLowerCase()))
            }
            else {
                setAddedItemData(localStorage.getItem('itemListData') ? JSON.parse(localStorage.getItem('itemListData')) : itemData.products)
            }

        }
    }
    return (
        <>
            <div className="container-fluid">

                <div className="row justify-content-between">
                    <h2 style={{ color: "white" }}>Find Your Product</h2>
                    <div className="search">
                        <input type="text" placeholder="Enter Your Category Name"
                            value={search} onChange={e => setSearch(e.target.value)}
                            onKeyDown={searchBook} />

                    </div>

                </div>

            </div>
            <div className='container-fluid'>
                <div className="row justify-content-end" style={{ padding: "18px" }}>
                    <button data-testid="button" className='btn btn-primary col-1' onClick={onclickOnAdd}>Add Product</button>
                </div>
            </div>
            <div className="container">
                <Card book={addedItemData} updateItemsInList={updateItemsInList} deleteItemFromTheList={deleteItemFromTheList} />

            </div>


            <div className="container">
                {
                    <Preview show={show} addedItemsInList={getaddedItemsInList} onClose={() => setShow(false)} />
                }
            </div>
        </>
    )
}

export default Main