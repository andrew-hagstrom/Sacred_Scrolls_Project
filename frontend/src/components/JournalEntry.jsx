import { Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export const JournalEntry = (props) => {
  const { setEntrySelected, isViewingEntry, setIsViewingEntry } = props;
  const onClickHandler = () => {
    setEntrySelected({
      id: props.id,
      text: props.text,
      title: props.title,
    });
    setIsViewingEntry(true);
  };

  return (
    <>
      <Row className="journal-row" style={{ cursor: "pointer"}} onClick={() => onClickHandler()()}>
      <div style={{wordWrap:"break-word"}}>
        {props.title}
        
        </div>
      </Row>
      
      
    </>
  );
};
