import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { api } from "../utilities/ApiUtilities";
import { JournalEntry } from "../components/JournalEntry";
import { useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faRotateLeft,
  faSquarePlus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
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

    try {
      const response = await api.post("user/journal/", {
        title: title,
        text: text,
      });

      if (response.status === 201) {
        setJournalData([...journalData, response.data]);
        console.log(journalData);
        setEntrySelected(response.data);
        setIsViewingEntry(true);

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
    const isConfirmed = window.confirm("Delete journal entry forever?");
    if (isConfirmed) {
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
          setIsEditMode(false);
          setEntrySelected(response.data);
          setIsViewingEntry(true);

          setText("");
          setTitle("");
          console.log("edit:", isEditMode, "viewing", isViewingEntry);
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
    setIsViewingEntry(false);
    setIsEditMode(false);
  };
  const undoEditMode = () => {
    setIsViewingEntry(true);
    setIsEditMode(false);
  };

  return (
    <>
      <div className={`fade-in-out ${isVisible ? "" : "fade-out"}`}>
        <div className="row">
          <div
            style={{ border: "none" }}
            className={`col-2 scrollable fade-in-out ${
              isVisible ? "" : "fade-out"
            }`}
          >
            <Container>
              <div style={{textAlign:"center"}}>
              <h1 style={{display:"inline"}}>Entries</h1><FontAwesomeIcon icon={faPlus} className="plus-icon" onClick={handleCreateButton}/>
              </div>
              <div style={{textAlign:"center"}}>
              
              </div>
              <div
                style={{
                  overflowY: "auto",
                  width: "11vw",
                  position: "absolute",
                  height: "250px",
                }}
              >
                <Col
                  style={{
                    position: "relative",
                    height: "70vh",
                    paddingLeft: "15px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {/* <Row style={{ fontSize: "34px" }}>Journal</Row> */}
                  {journalData.length > 0 ? (
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
                    <>
                      <h1>empty</h1>
                    </>
                  )}
                </Col>
              </div>
            </Container>
          </div>

          <div className="col-7 md-12">
            <Container>
              <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={6}>
                  {isViewingEntry || isEditMode ? (
                    isViewingEntry ? (
                      <>
                        <div className="entry">
                          <Row>
                            <Col
                              md={{ span: 6, offset: 0 }}
                              className="text-left"
                            ></Col>
                            <Col
                              md={{ span: 6, offset: 0 }}
                              className="text-right"
                            ></Col>
                          </Row>

                          <h1>{entrySelected.title}</h1>
                          <p>{entrySelected.text}</p>
                          <Row>
                            <Col md={6}>
                              {/* <Button
                                variant="outline-light"
                                onClick={handleCreateButton}
                              >
                                create new
                              </Button> */}
                            </Col>
                            <Col md={6}>
                              <FontAwesomeIcon
                                icon={faTrash}
                                onClick={handleDeleteJournal}
                                className="journal-icon delete-icon"
                              />
                              <FontAwesomeIcon
                                icon={faPenToSquare}
                                onClick={handleEditButton}
                                className="journal-icon edit-icon"
                              />
                            </Col>
                          </Row>
                        </div>
                      </>
                    ) : (
                      // render editmode
                      <>
                       
                        <Form onSubmit={handleSubmit} className="journal-form">
                          <Form.Group controlId="title">
                            <Form.Control
                              type="text"
                              value={title}
                              onChange={handleTitleChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="text">
                            <Form.Label></Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={4}
                              value={text}
                              onChange={handleTextChange}
                            />
                          </Form.Group>

                          <div className="d-flex justify-content-between">
                            <Button
                              variant="outline-light"
                              type="submit"
                              onClick={putJournalEntry}
                            >
                              save
                            </Button>

                            <FontAwesomeIcon
                              icon={faRotateLeft}
                              onClick={undoEditMode}
                            />
                          </div>
                        </Form>
                      </>
                    )
                  ) : (
                    <Form
                      onSubmit={handleSubmit}
                      className="journal-form"
                      autoComplete="off"
                    >
                      <Form.Group controlId="title">
                        <Form.Control
                          type="text"
                          value={title}
                          onChange={handleTitleChange}
                          placeholder="Journal Title"
                        />
                      </Form.Group>

                      <Form.Group controlId="text">
                        <Form.Label></Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          value={text}
                          onChange={handleTextChange}
                          placeholder="Write your journal entry"
                        />
                      </Form.Group>
                      <div style={{textAlign:"center"}}>
                      <button className="journal-button"  type="submit">
                        Submit
                      </button>
                      </div>
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
