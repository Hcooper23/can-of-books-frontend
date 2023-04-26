import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class UpdateBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      status: '',
      error: ''
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { title, description, status } = this.state;
    const book = { title, description, status };

    try {
      const response = await fetch(`/books/${this.props.bookId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
      });

      if (!response.ok) {
        throw new Error('Failed to update book');
      }

      const updatedBook = await response.json();

      // Call the parent component's callback to update the book list
      this.props.onUpdateBook(updatedBook);

      // Close the modal
      this.props.onHide();

    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { title, description, status, error } = this.state;
    const { onHide, ...modalProps } = this.props;

    return (
      <Modal {...modalProps} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Book
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="text-danger">{error}</p>}
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter title"
                value={title}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter description"
                value={description}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={status}
                onChange={this.handleInputChange}
              >
                <option value="">Choose...</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Book
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default UpdateBook;