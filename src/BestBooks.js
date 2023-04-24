import React from 'react';
import { Carousel } from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    fetch('/api/books')
      .then(response => response.json())
      .then(data => {
        this.setState({ books: data });
      })
      .catch(error => {
        console.error(error);
      });
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
                  <p>{book.author}</p>
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