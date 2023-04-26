import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
// import axios from 'axios';
class BookFormModal extends Component {
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
    const book = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value
    }
    console.log(book);
    this.props.addNewBook(book);
    console.log('handle submit was called');
    this.props.handleClose();
  };
  render() {
    const { title, description, status, error } = this.state;
    const { onHide, ...modalProps } = this.props;
    return (
      <Modal {...modalProps} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Book
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
                value={title}
                onChange={(event) => this.setState({ title: event.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(event) => this.setState({ description: event.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(event) => this.setState({ status: event.target.value })}
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