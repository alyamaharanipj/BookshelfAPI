/* eslint-disable max-len */
// Import Dependencies
import {nanoid} from 'nanoid';
import books from './books.js';

export const addBookHandler = (request, h) => {
  // Declare book variables
  const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

  // Auto generate id
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  // Finished value logic
  let finished;
  if (pageCount === readPage) {
    finished = true;
  } else {
    finished = false;
  }

  // Assign new book data
  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
  };

  // Add new book to books array
  books.push(newBook);

  // Check if new book is successfully added
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  // Response if book is successfully added
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  // Response if new book doesn't have a name
  if (!newBook.hasOwnProperty('name')) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // Response if readPage > pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // Response if generic error happens
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

export const getAllBooksHandler = () => ({
  status: 'success',
  data: {
    books,
  },
});
