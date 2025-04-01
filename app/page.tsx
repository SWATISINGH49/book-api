'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [books, setBooks] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async (page: number) => {
    setIsLoading(true);
    setError(null);

    const options = {
      method: 'GET',
      url: 'https://api.freeapi.app/api/v1/public/books',
      params: {
        page: page.toString(),
        limit: '10',
        inc: 'kind,id,etag,volumeInfo',
        query: 'tech',
      },
      headers: { accept: 'application/json' },
    };

    try {
      const { data } = await axios.request(options);
      setBooks(data.data.data); 
      console.log("dataa",books);
        } catch (err: any) {
      setError(err.message || 'Failed to fetch books');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch books on page load and when `currentPage` changes
  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="container mx-auto p-4 bg-blue-600">
      <h1 className="text-4xl font-bold text-center mb-6 ">Books Library</h1>

      {isLoading ? (
        <p className="text-center text-blue-500">Loading books...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          {books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 border border-blue-900 shadow-2xl">
              {books.map((book: any) => (
                <div
                  key={book.id}
                  className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <h2 className="font-semibold text-lg text-gray-800 mb-2">
                    {book.volumeInfo.title}
                  </h2>
                  {book.volumeInfo.imageLinks?.thumbnail && (
                    <img
                      src={book.volumeInfo.imageLinks.thumbnail}
                      alt={book.volumeInfo.title}
                      className="w-full h-40 object-cover rounded-md mb-2"
                    />
                  )}
                  <p className="text-sm text-gray-600">
                    {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No books found.</p>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 mr-2 rounded-md ${
                currentPage === 1
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
