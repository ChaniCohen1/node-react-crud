import React from "react";
import Book from './Book';

const BooksList = ({ books, onEdit, onDelete }) => {

    return (
        <>
            <table className="members-list">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>author</th>
                        <th>price</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                    {books.map((book) => (
                        <Book book={book} onEdit={onEdit} onDelete={onDelete}/>
                    ))}
            </table>
        </>
    )
};

export default BooksList;