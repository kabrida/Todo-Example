import { AgGridReact } from "ag-grid-react";

import { useState, useRef } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function TodoTable(props) {

    const gridRef = useRef();

    const [columnDefs] = useState([
        {field: 'description', sortable: false, filter: true},
        {field: 'priority', filter: true,
            cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}
        },
        {field: 'date', filter: true}
      ]);

    return (
        <div className="ag-theme-material" style={{width: 700, height: 500}}>
      <AgGridReact 
        ref={gridRef}
        onGridReady={ params => gridRef.current = params.api }
        rowData={props.todos} 
        columnDefs={columnDefs}
        selection={{mode: "singleRow"}} 
      />
    </div> 
    );
}

export default TodoTable;