
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;

// app.use(express.json());

let booksData = [
    {
        "id": 1,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "price": 18.99
    },
    {
        "id": 2,
        "title": "1984",
        "author": "George Orwell",
        "price": 15.50
    },
    {
        "id": 3,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "price": 10.99
    },
    {
        "id": 4,
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "price": 12.49
    },
    {
        "id": 5,
        "title": "The Catcher in the Rye",
        "author": "J.D. Salinger",
        "price": 14.95
    }
];


app.get('/readBooks', (req, res) =>{
    res.status(200).json(booksData); 
});

//יצירת ספר חדש
app.post('/addBook', (req, res) => {
    console.log("server: addbook");
    
    const { title, author, price } = req.body;

    if ( !title || !author || price === undefined) {
        return res.status(400).send("Missing required fields: title, author, and price.");
    }

    const id = booksData[booksData.length-1].id + 1 || 1;
    console.log(id);
    

    booksData.push({id, title, author,price});
    res.status(201).send("Book added successfully!");

});

//עדכון ספר
app.put('/updateBook/:id', (req, res) => {
    const id = req.params.id;
    const { title, author, price } = req.body;

    if (!id || !title || !author || price === undefined) {
        return res.status(400).send("Missing required fields: title, author, and price.");
    }

    const index = booksData.findIndex(book => book.id == id); // השתמש ב-== כדי לבדוק אם זה תואם לסוג הנתונים
    if (index !== -1) {
        booksData[index] = { id, title, author, price };
        return res.status(200).send("Book updated successfully!");
    } else {
        return res.status(404).send("Book not found");
    }
});

 
// קבלת פרטי ספר
app.get('/getBook/:id', (req, res) => {
    const id = req.params.id;
    const getBook = booksData.find(book => booksData.id === id);

    if (getBook) {
        res.status(200).json(book); 
    } else {
        res.status(404).json({ message: "Book not found!" }); 
    }
});
  
//מחיקת ספר
app.delete('/deleteBook/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); 
    booksData = booksData.filter(book => book.id !== id);
    res.status(200).send({ message: 'Book deleted successfully' });
});

app.listen(port, () => {
console.log(`Example app listening on port ${port}`);
});