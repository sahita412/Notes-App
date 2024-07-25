import React from 'react'

const Card = (props) => {
  function handleClick() {
    props.onDelete(props.id);
  }
  function handleEdit() {
    props.onEdit(props.id);
  }
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>DELETE</button>
      <button onClick={handleEdit}>EDIT</button>
    </div>
  )
}

export default Card