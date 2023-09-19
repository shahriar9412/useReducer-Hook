import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    books: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_BOOK':
            return {
                ...state,
                books: [...state.books, action.payload]
            };
        case 'REMOVE_BOOK':
            return {
                ...state,
                books: state.books.filter(book => book.id !== action.payload)
            };
        default:
            return state;
    }
};

const App1 = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Function to handle adding a book
    const addBook = (title, author) => {
        const newBook = {
            id: uuidv4(), // A simple way to generate a unique ID for each book
            title,
            author
        };
        dispatch({ type: 'ADD_BOOK', payload: newBook });
    };

    // Function to handle removing a book
    const removeBook = (id) => {
        dispatch({ type: 'REMOVE_BOOK', payload: id });
    };

    return (
        <div>
            <h1>Book List</h1>
            <ul>
                {state.books.map(book => (
                    <li key={book.id}>
                        {book.title} by {book.author}{' '}
                        <button onClick={() => removeBook(book.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={(e) => {
                e.preventDefault();
                const title = e.target.title.value;
                const author = e.target.author.value;
                addBook(title, author);
                e.target.reset();
            }}>
                <input type="text" name="title" placeholder="Title" />
                <input type="text" name="author" placeholder="Author" />
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default App1;
