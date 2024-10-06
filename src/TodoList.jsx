import { AgGridReact } from "ag-grid-react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState, useRef } from "react";
import FormControl from '@mui/material/FormControl';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";


/*Lähteenä:
https://mui.com/material-ui
https://www.ag-grid.com/javascript-data-grid/row-sorting/
*/

export default function TodoList() {
  const gridRef = useRef();

  const [columnDefs] = useState([
    {field: 'description', filter: true, floatingFilter: true, sortingOrder:["asc", "desc"]},
    {field: 'priority', filter: true,
        cellStyle: params => {
          switch (params.value) {
            case "High":
              return { color: 'red' };
            case "Medium":
              return { color: 'orange' };
            case "Low":
              return { color: 'green' };
            default:
              return null;
          }
        }, floatingFilter: true, sortingOrder:["asc", "desc"],
        comparator: (a, b) => {
          const priorityOrder = { "Low": 1, "Medium": 2, "High": 3 };
          return priorityOrder[a] - priorityOrder[b];
        }
    },
    {field: 'date', filter: 'agDateColumnFilter', floatingFilter: true, sortingOrder: ["asc", "desc"],
      filterParams: {browserDatePicker: true},
      valueFormatter: params => {
        return params.value ? new Date(params.value).toLocaleDateString() : '';}
    }
  ]);

  const [formData, setFormData] = useState({desc:"", prio:"", date:null});
  const [todos, setTodos] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value});
  };

  const handleDateChange = (date) => {
    setFormData({...formData, date: date});
  };

  const addTodo = () => {
    const { desc, prio, date } = formData;
    if (!desc || !date || !prio) {
      alert('Please insert description, priority and date');
    } else {
      const formattedDate = date ? date.format('MM/DD/YYYY') : null;
      setTodos([...todos, { description: desc, priority: prio, date: formattedDate }]);
      setFormData({ desc: "", prio: "", date: null });
    }
  };

  const handleDelete = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) => 
        index !== gridRef.current.getSelectedNodes()[0].id));
    } else {
      alert('Select a row first!');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <>
        <Stack 
          mt={2}
          direction="row" 
          spacing={2}
          justifyContent="center" 
          alignItems="center"
        >
          <TextField label="Description" name="desc" placeholder="Description" onChange={handleChange} value={formData.desc} />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            id="priority"
            name="prio"
            value={formData.prio}
            label="Priority"
            onChange={handleChange}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select></FormControl>
          <DatePicker label="Date" type="date" name="date" placeholder="Date" onChange={handleDateChange} value={formData.date} renderInput={(params) => <TextField {...params} />} />
          <Button variant="outlined" className="add-todo-button" onClick={addTodo}>Add</Button>
          <Button variant="outlined" color="error" className="delete-todo-button" onClick={handleDelete}>Delete <DeleteIcon /></Button>
        </Stack>
        <div className="ag-theme-material" style={{width: 1000, height: 500}}>
          <AgGridReact 
            ref={gridRef}
            onGridReady={ params => gridRef.current = params.api }
            rowData={todos} 
            columnDefs={columnDefs}
            rowSelection={{mode: "singleRow"}} 
          />
        </div> 
      </>
    </LocalizationProvider>
  );
}
