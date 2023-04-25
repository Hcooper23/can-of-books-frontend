import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import axios from 'axios';
import bookImg from './img/book.jpg';
import BookFormModal from './BookFormModal';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      error: '',
      showBookFormModal: false // Track if the modal is visible or hidden
    }
  }

  async componentDidMount() {
    try {
      const config = {
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books'
      }
      const response = await axios(config);
      console.log('this is response', response);
      this.setState({
        books: response.data,
        error: '',
      })
    } catch (error) {
      console.error('Error with request', error);
      this.setState({
        error: `Status Code:${error.response.status}, ${error.response.data}`
      })
    }
  }

  // Method to add a new book to the list of books
  addNewBook = async (newBookData) => {
    try {
      const config = {
        method: 'post',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books',
        data: newBookData
      }
      const response = await axios(config);
      console.log('this is response', response);
      // Add the new book to the list of books in state
      this.setState((prevState) => ({
        books: [...prevState.books, response.data],
        error: ''
      }));
    } catch (error) {
      console.error('Error with request', error);
      this.setState({
        error: `Status Code:${error.response.status}, ${error.response.data}`
      })
    }
  }


  deleteBook = async (bookID) => {
    try {
      //TODO: BUILD OUT THE URL FOR AXIOS
      let url = `${process.env.REACT_APP_SERVER}/books/${bookID._id}`
      // console.log(bookID);
  
      console.log('url in delete', url)
      //TODO: PASS THAT URL INTO AXIOS ON A DELETE
      await axios.delete(url);
      //TODO: UPDATE STATE
      let updatedBooks = this.state.books.filter(book => book._id !== bookID._id);
      // console.log(updatedBooks);
  
      this.setState({
        books: updatedBooks,
      })
  
  
    } catch(error) {
      console.log(error)
    }
  }

  // Method to toggle the visibility of the "Add Book" modal
  toggleBookFormModal = () => {
    this.setState((prevState) => ({
      showBookFormModal: !prevState.showBookFormModal
    }));
  }

  render() {
    // console.log(this.state.books);
    return (
      <div>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Button onClick={this.toggleBookFormModal}>Add Book</Button>
        <Carousel>
          {this.state.books.length > 0 ?
            this.state.books.map(book => (
              <Carousel.Item key={book._id}>
                <img className="d-block w-100" src={bookImg} alt={book.title} />
                <Carousel.Caption>
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                  <Button onClick={() => this.deleteBook(book)}>Delete Book</Button>
                </Carousel.Caption>
              </Carousel.Item>
            ))
            : <h3>No books found.</h3>
          }
        </Carousel>
        <BookFormModal
          show={this.state.showBookFormModal}
          handleClose={this.toggleBookFormModal}
          addNewBook={this.addNewBook}
        />
      </div>
    )
  }
}

export default BestBooks;