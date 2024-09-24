import { useState } from "react";
import TodoTable from "./TodoTable";

export default function TodoList() {

    const [desc, setDesc] = useState("");
    const [todos, setTodos] = useState([]);

    const handleChange = (event) => {
        setDesc(event.target.value);
      };
      
      // Remember to call preventDefault() if using form
      const addTodo = () => {
        if (!desc) {
            alert('Please write a description');
        } else {
        setTodos([...todos, desc]);
        setDesc("");
        }
      };

    return(
      <>
      <input placeholder="Description" onChange={handleChange} value={desc} />
      <button onClick={addTodo}>Add</button>
      <TodoTable todos={todos} />
      </>
    );
  }
