import React, { useState } from "react";
import AddOrEditBook from "./AddOrEditBook";

const Book = ({ book, onEdit, onDelete }) => {

    const [showForm, setShowForm] = useState(false);

    const toggleForm = () =>{
        setShowForm(!showForm);
    }
    return (
        <>
            <tr>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.price}</td>
                <td><button onClick={toggleForm}>EDIT</button></td>
                <td><button onClick={() => onDelete(book.id)}>DELETE</button></td>

            </tr>
            <div>{showForm && <AddOrEditBook state={"Edit"} book={book} func={onEdit} onClose={toggleForm}/>}
            </div>
        </>

    )
};

export default Book;