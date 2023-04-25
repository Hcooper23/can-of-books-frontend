import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function BookFormModal(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const config = {
        method: 'post',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books',
        data: {
          title: title,
          description: description,
          status: status
        },
      };
      const response = await axios(config);
      props.onNewBook(response.data);
      setTitle('');
      setDescription('');
      setStatus('');
      setError('');
      props.onHide();
    } catch (error) {
      console.error('Error with request', error);
      setError(`Status Code:${error.response.status}, ${error.response.data}`);
    }
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="">Choose...</option>
              <option value="unread">Unread</option>
              <option value="reading">Reading</option>
              <option value="read">Read</option>
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

export default BookFormModal;