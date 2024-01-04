import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { api } from "../utilities/ApiUtilities";
import { JounralEntry } from "../components/JournalEntry";
function JournalPage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [journalData, setJournalData] = useState(null);
  

  const fetchData = async () => {
    try {
      const response = await api.get("user/journal/");
      if (response.status === 200) {
        setJournalData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Journal Data:", journalData);
  }, [journalData]);


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call API function here with the title and text data
    let response = await api.post("user/journal/", {
      title: title,
      text: text,
    });
    if (response.status == 201) {
      console.log(response.data);
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
          <div className="col-2 scrollable" style={{ backgroundColor: "gray" }}>
            {journalData ? (
              journalData.map((journal) => (
                // <div key={journal.id}>{journal.title}</div>
                <JounralEntry
                key={journal.id}
                id={journal.id}
                title={journal.title}
                text={journal.text}
                /> 
              ))
            ) : (
              <></>
            )}
          </div>
          <div className="col-7">
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
