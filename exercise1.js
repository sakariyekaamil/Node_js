const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});     

let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { id: 3, title: '1984', author: 'George Orwell' }
];

app.get('/books', (req, res) => {
  res.json(books);
});


app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const updatedBook = req.body;
    res.send(`Book with ID ${bookId} has been updated.`);       
} );

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    res.send(`Book with ID ${bookId} has been deleted.`);
}  );



//get one book by id
app.get('/books/:id', (req, res) => {
    const bookId = req.params.id; 
    const book = books.find(book => book.id === parseInt(bookId));
    if (!book) {
        return res.status(404).send('Book not found');
    }
    res.json(book);
});
//delete one book by id
app.delete('/books/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    res.json({ message: `Book with ID ${book.id} has been deleted.` });
});
   


 /// update books 

app.put('/books/:id', (req, res) => {
    const book = books.find(book => book.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send('Book not found');
    }
    book.name = req.body.name;
    res.json(book);
}   );
