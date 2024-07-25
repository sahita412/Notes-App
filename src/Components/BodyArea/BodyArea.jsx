import React, { useState, useEffect } from "react";

function BodyArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  useEffect(() => {
    if (props.isEditing) {
      setNote({
        title: props.currentNote.title,
        content: props.currentNote.content
      });
    }
  }, [props.isEditing, props.currentNote]);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();

    if (props.isEditing) {
      props.onUpdate({ id: props.currentNote.id, ...note });
    } else {
      props.onAdd(note);
    }

    setNote({
      title: "",
      content: ""
    });
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>{props.isEditing ? "Update" : "Add"}</button>
      </form>
    </div>
  );
}

export default BodyArea;
