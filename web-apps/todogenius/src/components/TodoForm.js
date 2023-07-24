import { useState, useEffect, useRef } from 'react'
import React from 'react'

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '')

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    })

    setInput('')
  }

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit}>
        {props.edit ? (
          <>
            <input
              type="text"
              name="text"
              className="todo-input edit"
              placeholder="Update your item"
              value={input}
              onChange={handleChange}
              ref={inputRef}
            />
            <button className="todo-button edit">Edit</button>
          </>
        ) : (
          <>
            <input
              type="text"
              name="text"
              className="todo-input"
              placeholder="Add a todo"
              value={input}
              onChange={handleChange}
              ref={inputRef}
            />
            <button className="todo-button">Add todo</button>
          </>
        )}
      </form>
    </>
  )
}

export default TodoForm
