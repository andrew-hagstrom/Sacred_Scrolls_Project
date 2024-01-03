import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { api } from "../utilities/ApiUtilities";

function JournalPage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  // Function to handle changes in the title input
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Function to handle changes in the text input
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call API function here with the title and text data
    let response = await api.post("user/journal/")
    if (response.status == 200){
        print(response.data)
    }
    // Clear the form after submission
    setTitle("");
    setText("");
  };
  return (
    <>
      <h2>Journal</h2>
      <div className="container">
        <div className="row">
          <div className="col-2" style={{ backgroundColor: "gray" }}>
            <div></div>
          </div>
          <div className="col-7" >
          <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
            </Form.Group>

            <Form.Group controlId="text">
              <Form.Label>Text:</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={text}
                onChange={handleTextChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
          </div>
        </div>
      </div>
    </>
  );
}

export default JournalPage;
