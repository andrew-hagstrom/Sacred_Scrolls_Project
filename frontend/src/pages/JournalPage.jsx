import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { api } from "../utilities/ApiUtilities";
import { JournalEntry } from "../components/JournalEntry";
import { useOutletContext } from "react-router";

function JournalPage() {
  const [isViewingEntry, setIsViewingEntry] = useState(false);
  const [entrySelected, setEntrySelected] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);

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
        setJournalData([...journalData, response.data]);
        console.log(journalData);
        setEntrySelected(response.data)
        setIsViewingEntry(true)

        // reset title and text 
        // for reuse.
        setTitle("");
        setText("");
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
      // delete from database
      const response = await api.delete(`user/journal/${entrySelected.id}`);
      // if successfull deletion from backend
      if (response.status === 204) {
        // delete from frontend useState obj
        setJournalData((journalData) =>
          journalData.filter((entry) => entry.id !== entrySelected.id)
        );
        setEntrySelected(null);
        setIsViewingEntry(false);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  const putJournalEntry = async () => {
    event.preventDefault();

    try {
      const response = await api.put(`user/journal/${entrySelected.id}`, {
        title: title,
        text: text,
      });
      if (response.status === 200) {
        if (response.status === 200) {
        console.log(response.data);
        // filter and delete journal entry with response id
        console.log("before edit", journalData);
          
        const newJournalData = journalData.map((entry) => 
          entry.id == response.data.id ? response.data : entry
        );
        
        setJournalData(newJournalData);
        setIsEditMode(false)
        setEntrySelected(response.data)
        setIsViewingEntry(true)

        setText("")
        setTitle("")
        console.log("edit:",isEditMode, "viewing",isViewingEntry)
      }
      }
    } catch (error) {
      console.error("Error editing data:", error);
    }
  };
  const handleEditButton = () => {
    setIsViewingEntry(false);
    setIsEditMode(true);

    setTitle(entrySelected.title);
    setText(entrySelected.text);
    console.log(`editmode:${isEditMode} viewmode:${isViewingEntry}`);
  };
  const handleCreateButton = () => {
    setIsViewingEntry(false)
    setIsEditMode(false)
  };
  const undoEditMode = () => {
    setIsViewingEntry(true);
    setIsEditMode(false);
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
            {
            journalData !== null &&
            journalData !== undefined &&
            journalData.length > 0
            ? (
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
              <h1>empty</h1>
            )}
          </div>
          <div className="col-7">
            <Container>
              <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={6}>
                  {isViewingEntry || isEditMode ? (
                    isViewingEntry ? (
                      <>
                        <div>
                          <h1>{entrySelected.title}</h1>
                          <p>{entrySelected.text}</p>
                        </div>
                        <div>
                          <Button
                            variant="secondary"
                            onClick={handleEditButton}
                          >
                            edit
                          </Button>
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
                      // render editmode
                      <>
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
                          <Button
                            variant="primary"
                            type="submit"
                            onClick={putJournalEntry}
                          >
                            Submit Edit
                          </Button>
                          <Button varient="secondary" onClick={undoEditMode}>
                            undo
                          </Button>
                        </Form>
                      </>
                    )
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
