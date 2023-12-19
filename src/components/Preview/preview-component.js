import React, { useState } from 'react'
import close from './../../assets/close.png';
import Select from 'react-select';

function Preview({ show, onClose, updateItemsInList, addedItemsInList, itemToUpdate }) {


    const [editDescription, setEditDescription] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editPrice, setEditPrice] = useState("")
    const [isExpired, setIsExpired] = useState("No");
    const [expiryDate, setExpiryDate] = useState("")
    const [checked, setChecked] = useState(false);
    const [editCalled, setEditCalled] = useState(false);
    const options = [{ value: "Yes", label: "Yes" },
    { value: "No", label: "No" },]

    const colourStyles = {
        control: () => ({
            // ...styles,
            fontSize: "0.75rem",
            marginLeft: "1rem",
            display: "flex",
            border: "1px solid black",
            height: "35px",
            width: "144px",
            borderBottom: "0.1rem solid black",
            borderRadius: "0px",
            fontWeight: "bold"
        }),
        option: styles => ({
            ...styles,
            padding: "5px",
            fontSize: "0.75rem",
            textAlign: "left",
            borderBottom: "0.1rem solid #103D56",
            ":last-of-type": {
                borderBottom: "none"
            }

        })

    };
    React.useEffect(() => {
        if (itemToUpdate) {
            setEditCalled(true)
            setEditDescription(itemToUpdate.description);
            setChecked(itemToUpdate.isSpecial === "Yes" ? true : false)
            setEditCategory(itemToUpdate.category)
            setEditPrice(itemToUpdate.price)
            setExpiryDate(itemToUpdate.expireDate.replaceAll("/", "-").toString())
            setIsExpired(itemToUpdate.canExpire === "Yes" ? { value: "Yes", label: "Yes" } : { value: "No", label: "No" })

        }

    }, [itemToUpdate])

    const cleanTheForm = () => {
        setEditDescription("");
        setChecked(false)
        setEditCategory("")
        setEditPrice("")
        setExpiryDate("")
        setIsExpired("No")
        onClose()
    }

    const handleUpdate = (event) => {
        event.preventDefault();

        let bookData = {}
        bookData = {
            "id": itemToUpdate.id,
            "description": editDescription,
            "price": editPrice,
            "category": editCategory,
            "canExpire": isExpired.value,
            "expireDate": expiryDate,
            "isSpecial": checked ? "Yes" : "No"
        }
        if(!bookData.description && !bookData.category && !bookData.price){
            return
        }
        updateItemsInList(bookData)
        cleanTheForm()

    }



    const handleSubmit = (event) => {
        event.preventDefault();

        let bookData = {}
        bookData = {
            "id": crypto.randomUUID(),
            "description": editDescription,
            "price": editPrice,
            "category": editCategory,
            "canExpire": isExpired.value,
            "expireDate": expiryDate,
            "isSpecial": checked ? "Yes" : "No"
        }
        if(!bookData.description && !bookData.category && !bookData.price){
            return
        }

        addedItemsInList(bookData)
        cleanTheForm()
    }

    return (
        <>

            {show && <div className="overlay">
                <div className="overlay-inner">
                    <button className="close" onClick={onClose}><img src={close} alt="" height={20} /></button>
                    <div className="inner-box">

                        <div className="info">
                            <form className="row">
                                <label className="col-8">Description:
                                    <input style={{ width: "30vw" }}
                                        type="text"
                                        row="3"
                                        name="description"
                                        value={editDescription}
                                        onChange={(e) => {
                                            setEditDescription(e.target.value)
                                        }}
                                    />
                                </label>
                                <label className="col-8">Category:
                                    <input style={{ width: "30vw" }}
                                        type="text"
                                        name="category"
                                        value={editCategory}
                                        onChange={(e) => {
                                            setEditCategory(e.target.value)
                                        }}
                                    />
                                </label>
                                <label className="col-8">Price:
                                    <input style={{ width: "30vw" }}
                                        type="text"
                                        name="price"
                                        value={editPrice}
                                        onChange={(e) => {
                                            setEditPrice(e.target.value)
                                        }}
                                    />
                                </label>

                                <label className='margin_left'>Is Special?
                                    <input className='checkbox_input' type="checkbox" checked={checked} onChange={(e) => {
                                        setChecked(!checked)
                                    }} />
                                </label>
                                <div className='row'>
                                    <label className="col-3">Can Expired?:
                                        <Select styles={colourStyles}
                                            options={options}
                                            value={isExpired}
                                            onChange={(e) => {
                                                setIsExpired(e)
                                            }}
                                        />
                                    </label>
                                    {isExpired.value === "Yes" && <label className="col-5">Expiry Date
                                        <input style={{ width: "21vw" }}
                                            type="date"
                                            pattern="\d{4}-\d{2}-\d{2}"
                                            name="expiryDate"
                                            value={expiryDate}
                                            onChange={(e) => {

                                                setExpiryDate(e.target.value)
                                            }}
                                        />
                                    </label>}
                                </div>




                            </form>
                            <div className="row justify-content-center margin_top">
                                {!editCalled && <button className='btn btn-primary col-4' onClick={handleSubmit}>Submit</button>}
                                {editCalled && <button className='btn btn-primary col-4' onClick={handleUpdate}>Update</button>}
                            </div>
                        </div>

                    </div>
                </div>
            </div>}
        </>
    )
}

export default Preview