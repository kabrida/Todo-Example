import * as React from 'react';
 // import './App.css'
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TodoList from './TodoList'
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

function App() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <CssBaseline />
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Home" value="1" />
            <Tab label="Todos" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">Welcome to Home page!</TabPanel>
        <TabPanel value="2"><TodoList /></TabPanel>
      </TabContext>
    </Box>
    </>
  );
}

export default App;