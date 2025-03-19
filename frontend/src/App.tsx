import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';

// Pages
import Home from './pages/Home';
import UtilitySearch from './pages/UtilitySearch';
import MapView from './pages/MapView';

// Create theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: '20px', color: 'white' }}>
        <h1>测试文本 - 如果你能看到这个，说明渲染正常</h1>
      </div>
      <Router>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<UtilitySearch />} />
            <Route path="/map" element={<MapView />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
