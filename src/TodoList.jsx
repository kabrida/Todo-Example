import { AgGridReact } from "ag-grid-react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


import { useState, useRef } from "react";


import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

/*Lähteenä: 
https://www.w3schools.com/tags/att_input_type_date.asp, 
https://www.w3schools.com/jsref/jsref_tolocaledatestring.asp, 
https://www.shecodes.io/athena/1930-passing-data-from-a-child-component-to-parent
https://www.ag-grid.com/javascript-data-grid/floating-filters/
https://www.ag-grid.com/javascript-data-grid/filter-date/
https://www.ag-grid.com/javascript-data-grid/column-properties
https://blog.ag-grid.com/formatting-numbers-strings-currency-in-ag-grid/
https://mui.com/x/react-date-pickers
https://mui.com/material-ui/react-autocomplete/
https://mui.com/material-ui/react-tabs/ */
export default function TodoList() {

  const gridRef = useRef();

    const [columnDefs] = useState([
      {field: 'description', filter: true, floatingFilter: true, sortingOrder:["asc", "desc"]},
      {field: 'priority', filter: true,
          cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}, floatingFilter: true, sortingOrder:["asc", "desc"]
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
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
      };


    const handleDateChange = (date) => {
      setFormData({...formData, date: date});
    }


      const addTodo = () => {
        const {desc, prio, date} = formData;
        if (!desc || !date || !prio) {
            alert('Please insert description, priority and date');
        } else {
          const formattedDate = date ? date.format('MM/DD/YYYY') : null;
        setTodos([...todos, {description: desc, priority: prio, date: formattedDate}]);
        setFormData({desc:"", prio:"", date: null});
        }
      };

      const handleDelete = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
          setTodos(todos.filter((todo, index) => 
            index != gridRef.current.getSelectedNodes()[0].id))
        }
        else {
          alert('Select a row first!');
        }
      };

    return(
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
      <TextField label="Priority" name="prio" placeholder="Priority" onChange={handleChange} value={formData.prio} />
      <DatePicker label="Date" type="date" name="date" placeholder="Date" onChange={handleDateChange} value={formData.date} renderInput={(params) => <TextField {...params} />} />
      <Button variant="contained" className="add-todo-button" onClick={addTodo}>Add</Button>
      <Button color="error" className="delete-todo-button" onClick={handleDelete}>Done</Button>
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
