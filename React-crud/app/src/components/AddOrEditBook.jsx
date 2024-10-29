import React, { useState } from "react";

const AddOrEditBook = ({ state, book = {}, func , onClose}) => {
    // הגדרת מצבים מקומיים עבור השדות, כך שניתן יהיה לשלוט על הערכים
    const [bookId, setBookId] = useState(book.id || "");
    const [title, setTitle] = useState(book.title || "");
    const [author, setAuthor] = useState(book.author || "");
    const [price, setPrice] = useState(book.price || "");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newBook = {
            id: bookId,
            title,
            author,
            price: parseFloat(price),
        };

        func(newBook);
        onClose();
    }

return (
    <>
        <br /><br />
        <h2>{state === "Add" ? "Add New Book" : "Update Book Details"}</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br /><br />

            <label htmlFor="author">Author:</label>
            <input
                type="text"
                id="author"
                name="author"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <br /><br />

            <label htmlFor="price">Price:</label>
            <input
                type="number"
                id="price"
                name="price"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <br /><br />

            <button type="submit">{state === "Add" ? "Add Book" : "Update Book"}</button>
        </form>
    </>
)
};

export default AddOrEditBook;
