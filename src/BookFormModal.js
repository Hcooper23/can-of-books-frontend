import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class BookFormModal extends Component {
  state = {
    title: '',
    description: '',
    status: '',
    error: ''
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { bookId, updateBook, handleClose } = this.props;
    const { title, description, status } = this.state;
    const updatedBook = { title, description, status };

    try {
      const response = await fetch(`/books/${bookId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook)
      });

      if (!response.ok) {
        throw new Error('Failed to update book.');
      }

      const updatedBookData = await response.json();
      updateBook(updatedBookData);
      handleClose();
    } catch (error) {
      console.error(error);
      this.setState({ error: 'Failed to update book. Please try again.' });
    }
  };

  render() {
    const { title, description, status, error } = this.state;
    const { onHide, ...modalProps } = this.props;

    return (
      <Modal {...modalProps} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Book
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="text-danger">{error}</p>}
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={title}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
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
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default BookFormModal;