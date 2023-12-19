import React, { useState } from 'react'
import edit from './../../assets/edit.png';
import deleteicon from './../../assets/delete2.png';
import Preview from '../Preview/preview-component';

function Card({ book, updateItemsInList, deleteItemFromTheList }) {
    const [show, setShow] = useState(false);
    const [itemToUpdate, setItemToUpdate] = useState();

    const onClickOnDelete = (val, i) => {
        deleteItemFromTheList(val);
    }
    const updatedItemsInList = (addedList) => {
        updateItemsInList(addedList)
    }
    return (
        <>
            {
                book.map((item, idx) => {

                    return (
                        <>
                            <div className={"card " + (item.isSpecial === "Yes" ? 'card_bg_change' : '')} key={idx}>
                                <div className="bottom">

                                    <div className="title">{item.description}</div>
                                    <div className="title">Category: {item.category}</div>
                                    <p className="amount">&#8377;{item.price}</p>
                                    {item.canExpire === "Yes" && <div className="title">Expiry Date: {item.expireDate}</div>}
                                    {item.isSpecial === "Yes" && <p className="ptag">*Special</p>}


                                </div>
                                <div className='row' style={{
                                    bottom: "8px",
                                    position: "absolute"
                                }}>¸
                                    <span className=" col-4" onClick={(e) => { setShow(true); setItemToUpdate(item) }}><img src={edit} alt="" height={20} /></span>
                                    <span className=" col-4" onClick={(e) => onClickOnDelete(item, idx)}><img src={deleteicon} alt="" height={20} /></span>

                                </div>

                            </div>

                        </>
                    )


                })
            }

            <div className="container">
                {
                    <Preview show={show} updateItemsInList={updatedItemsInList} onClose={() => setShow(false)} itemToUpdate={itemToUpdate} />
                }
            </div>



        </>


    )
}

export default Card