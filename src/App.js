import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes, useLocation, Outlet } from "react-router-dom";
import Layout from './components/Layout';
import DishList from './components/DishList';
import DishDetails from './components/DishDetails';
import DishSuggester from './components/DishSuggest';

const theme = createTheme();

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Routes>
          <Route path = '/' element = {<Login />} />
          <Route element={<Layout />}>
          <Route path="/dish_list" element={<DishList />} />
            <Route path="/dish_details/:name" element={<DishDetails />} />
            <Route path="/dish_suggester" element={<DishSuggester />} />
          
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
