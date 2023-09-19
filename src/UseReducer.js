import React, { useState, useReducer } from 'react'

import { v4 as uuidv4 } from 'uuid'

//dummy data
const booksData = [
    { id: 1, name: 'Pather Panchal' },
    { id: 2, name: 'Padma Nodir Majhi' },
    { id: 3, name: 'Srikanta' }
]

//initial state
const initialState = {
    books: booksData,
    isModalOpen: false,
    modalText: ''
};

//modal
const Modal = ({ modalText }) => {
    return <p>{modalText}</p>
}

//reducer function
const reducer = (state, action) => {
    //action.type, action.payload
    if (action.type === 'ADD') {
        const allBooks = [...state.books, action.payload];
        return {
            ...state,
            books: allBooks,
            isModalOpen: true,
            modalText: 'book is added'
        }
    }
    if (action.type === 'REMOVE') {
        const filteredBooks = [...state.books].filter(book => book.id !== action.payload)
        return {
            ...state,
            books: filteredBooks,
            isModalOpen: true,
            modalText: 'book is removed'
        }
    }
    return state;
}

const UseReducer = () => {

    //use Reducer
    const [bookState, dispatch] = useReducer(reducer, initialState)

    const [bookName, setBookName] = useState('');

    //submit handler
    const handleSubmit = e => {
        e.preventDefault();
        const newBook = { id: uuidv4(), name: bookName };
        dispatch({ type: 'ADD', payload: newBook });
        setBookName('')
    };

    const removeBook = (id) => {

        dispatch({ type: 'REMOVE', payload: id });
    }

    //return function
    return (
        <div>
            <h3>Book List</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={bookName}
                    onChange={e => setBookName(e.target.value)}
                />
                <button type='submit'>Add Book</button>
            </form>

            {bookState.isModalOpen && <Modal modalText={bookState.modalText} />}

            {bookState.books.map(book => {
                return <li key={book.id}>
                    {book.name} <button onClick={() => removeBook(book.id)}>remove</button>
                </li>
            })}
        </div>
    )

}

export default UseReducer
