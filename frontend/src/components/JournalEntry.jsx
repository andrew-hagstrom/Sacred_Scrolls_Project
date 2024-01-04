// import {} from "react-bootstrap"
export const JounralEntry = 
(props) => {
    const onClickHandler = () =>{
        alert("you clicked a journal")
    }
    return (
        <div className="journal-entry" onClick={onClickHandler}>
            <p>{props.title}</p>
            <p>{props.text}</p>
            
        </div>
        
    )
}