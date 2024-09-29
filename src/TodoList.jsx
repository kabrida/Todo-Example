import { useState } from "react";
import TodoTable from "./TodoTable";
//Lähteenä: https://www.w3schools.com/tags/att_input_type_date.asp, https://www.w3schools.com/jsref/jsref_tolocaledatestring.asp, https://www.shecodes.io/athena/1930-passing-data-from-a-child-component-to-parent
export default function TodoList() {

    const [formData, setFormData] = useState({desc:"", date:""});
    const [todos, setTodos] = useState([]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
      };
      
      const formatDate = (dString) => {
        const d = new Date(dString);
        return d.toLocaleDateString();
      }

      // Remember to call preventDefault() if using form
      const addTodo = () => {
        const {desc, date} = formData;
        if (!desc || !date) {
            alert('Please insert description and date');
        } else {
        setTodos([...todos, {description: desc, date: formatDate(date)}]);
        setFormData({desc:"", date: ""});
        }
      };

      const deleteTodo = (index) => {
        setTodos(todos.filter((todo, i) => i !== index));
      }

    return(
      <>
      <h1>My Todolist</h1>
      <div className="container">
        <div className="add-title">Add todo</div>
      <input name="desc" placeholder="Description" onChange={handleChange} value={formData.desc} />
      <input type="date" name="date" placeholder="Date" onChange={handleChange} value={formData.date} />
      <button className="add-todo-button" onClick={addTodo}>Add</button>
      </div>
      <TodoTable todos={todos} deleteTodo={deleteTodo} />
      </>
    );
  }
