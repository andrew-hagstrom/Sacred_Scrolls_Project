import { Button } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export const JournalEntry = (props) => {
  const { setEntrySelected, isViewingEntry, setIsViewingEntry } = props;
  const onClickHandler = () => {
    setEntrySelected({
      id: props.id,
      text: props.text,
      title: props.title,
    });
    setIsViewingEntry(true)
  };

  return (

    <Container style={{overflowY:'auto', width:'11vw', position:'absolute'}}>
      <Col style={{position:'relative', height:'70vh', paddingLeft:'15px', display:'flex', flexDirection:'column', alignItems:'center'}}>
      <Row style={{fontSize: '34px'}}>Journal</Row>
      <Row>
      
      </Row>
      <Row style={{cursor: 'pointer'}} onClick={()=> onClickHandler()}>
            {props.title}
        </Row>
        <Row>
        <Button
                                variant="outline-light"
                                // onClick={handleCreateButton}
                              >
                                create
                              </Button>
        </Row>
      </Col>
      
    </Container>

  );
};
