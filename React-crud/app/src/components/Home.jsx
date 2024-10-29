import React, { useEffect, useState } from "react";
import BooksList from "./BooksList";
import AddOrEditBook from "./AddOrEditBook";

const Home = () => {

    const [books, setBooks] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/readBooks', { method: 'GET' });
            if (!response.ok) {
                throw new Error("תגובת הרשת לא הייתה תקינה");

            }
            const books = await response.json();
            console.log(books);
            setBooks(books);
        } catch (error) {
            console.log('שגיאה:', error);
        }
        console.log("fetch");

    };

    useEffect(() => {
        fetchData();

    }, []);

    const addBook = async (book) => {
        try {
            console.log("addBook");

            const response = await fetch('http://127.0.0.1:5000/addBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });

            if (!response.ok) {
                console.log("ERROR: Failed to add book");
            }

            fetchData();
        }
        catch {
            console.error('Failed to add book');
        }
    };


    const updateBook = async (book) => {
        try {
            console.log("update client");

            const response = await fetch(`http://127.0.0.1:5000/updateBook/${book.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });

            if (!response.ok) {
                // אם התגובה לא בסדר, זרוק שגיאה עם הסטטוס והטקסט
                const errorText = await response.text();
                console.error(`Failed to update book: ${response.status} - ${errorText}`);
            }
            fetchData();
            console.log("uuuuuuu");
        }
        catch {
            console.error('Failed to update book');
        }

    };

    const deleteBook = async (bookId) => {
        console.log("deleteBook:  ", bookId);

        await fetch(`http://127.0.0.1:5000/deleteBook/${bookId}`, { method: 'DELETE', })
        fetchData();

    };

    const toggleForm = () => {
        setShowForm(!showForm);
    }


    return (
        <>
            <h1>book list</h1>
            <button onClick={toggleForm}>Add Book</button>
            {showForm && <AddOrEditBook state={"Add"} func={addBook} onClose={toggleForm} />}
            <BooksList books={books} onEdit={updateBook} onDelete={deleteBook} />
        </>
    )
};

export default Home;