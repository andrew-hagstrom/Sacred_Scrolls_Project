import { Button } from "react-bootstrap";
export const JournalEntry = (props) => {
  const { setEntrySelected } = props;
  const onClickHandler = () => {
    setEntrySelected({
      id: props.id,
      title: props.title,
      text: props.text,
    });
  };

  return (
    <div className="journal-entry" onClick={onClickHandler}>
      <p>{props.title}</p>
      <p>{props.text}</p>
    </div>
  );
};
