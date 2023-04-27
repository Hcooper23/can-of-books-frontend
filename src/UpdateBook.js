import { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
// import axios from 'axios';

class UpdateBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: true,
      title: this.props.bookToBeUpdated?.title,
      description: this.props.bookToBeUpdated?.description,
      status: this.props.bookToBeUpdated?.status,
      _id: this.props.bookToBeUpdated?._id,
      __v: this.props.bookToBeUpdated?.__v
    };
  }

  handleBookSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    const book = {
      title: this.state.title,
      description: this.state.description,
      status: this.state.status,
      _id: this.props.bookToBeUpdated?._id,
      __v: this.props.bookToBeUpdated?.__v
    }
    this.props.updateBook(book);
  }

  setTitle = (event) => {
    this.setState({
      title: event.target.value,
    })
  }

  setDesc = (event) => {
    this.setState({
      description: event.target.value,
    })
  }

  setStatus = (event) => {
    this.setState({
      status: event.target.value,
    })
  }

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
          <Form onSubmit={this.handleBookSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={this.setTitle}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={this.setDesc}
              />
            </Form.Group>  
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={this.setStatus}
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


export default UpdateBook;