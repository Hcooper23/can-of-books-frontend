import React from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      error: ''
    }
  }

  // componentDidMount() {
  //   fetch('/books')
  //     .then(response => response.json())
  //     .then(data => {
  //       this.setState({ books: data });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  async componentDidMount () {
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

  render() {
    return (
      <div>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        {this.state.books.length > 0 ?
          <Carousel>
            {this.state.books.map(book => (
              <Carousel.Item key={book.id}>
                <img className="d-block w-100" src={book.image} alt={book.title} />
                <Carousel.Caption>
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
          : <h3>No books found.</h3>
        }
      </div>
    )
  }
}

export default BestBooks;