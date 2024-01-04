import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { api } from "../utilities/ApiUtilities";
import { JournalEntry } from "../components/JournalEntry";
import { useOutletContext } from "react-router";


function JournalPage() {
  const [isViewingEntry, setIsViewingEntry] = useState(false);
  const [entrySelected, setEntrySelected] = useState(null);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const { journalData, setJournalData } = useOutletContext();

  const [updateEntriesTrigger, setUpdateEntriesTrigger] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    
  }, []);

  useEffect(() => {
    if (!loading) {
      // Once data is loaded, trigger fade-in effect
      setIsVisible(true);
    }
  }, [loading]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call API function here with the title and text data
    try {
      const response = await api.post("user/journal/", {
        title: title,
        text: text,
      });

      if (response.status === 201) {
        
        setJournalData([...journalData, response.data])
        console.log(journalData)
        // Trigger updateEntries
        // setUpdateEntriesTrigger(!updateEntriesTrigger);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }

    // Clear the form after submission
    setTitle("");
    setText("");
  };

  const handleDeleteJournal = async () => {
    try {
      const response = await api.delete(`user/journal/${entrySelected.id}`);
      if (response.status === 204) {
        setJournalData((journalData) =>
        journalData.filter((entry) => entry.id !== entrySelected.id)
        
        
      );
      setEntrySelected(null)
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleCreateButton = () => {
    setEntrySelected(null);
  };

  return (
    <>
      <h2>Journal</h2>
      <div className={`container fade-in-out ${isVisible ? "" : "fade-out"}`}>
        <div className="row">
          <div
            className={`col-2 scrollable fade-in-out ${
              isVisible ? "" : "fade-out"
            }`}
            style={{ backgroundColor: "gray" }}
          >
            {journalData ? (
              journalData.map((journal) => (
                <JournalEntry
                  key={journal.id}
                  id={journal.id}
                  title={journal.title}
                  text={journal.text}
                  isViewingEntry={isViewingEntry}
                  entrySelected={entrySelected}
                  setIsViewingEntry={setIsViewingEntry}
                  setEntrySelected={setEntrySelected}
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
                  {entrySelected ? (
                    <>
                      <div>
                        <h1>{entrySelected.title}</h1>
                        <p>{entrySelected.text}</p>
                      </div>
                      <div>
                        <Button variant="secondary">edit</Button>
                        <Button
                          variant="danger"
                          onClick={handleDeleteJournal}
                        >
                          delete
                        </Button>
                        <Button
                          variant="success"
                          onClick={handleCreateButton}
                        >
                          create new
                        </Button>
                      </div>
                    </>
                  ) : (
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
                  )}
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
