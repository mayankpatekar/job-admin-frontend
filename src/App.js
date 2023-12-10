import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ListingsPage from './pages/ListingsPage';
import AddCategoryPage from './pages/AddCategoryPage';
import AddTypePage from './pages/AddTypePage';
import NavBar from './components/NavBar';
import JobAddPage from './pages/JobAddPage';
import ViewListingsPage from './pages/ViewListingsPage';
import ForgotPassPage from './pages/ForgotPassPage';
import ResetPassPage from './pages/ResetPassPage';

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route path="/" exact element={<NavBar />} >
            <Route path='/' element={<HomePage />} />
            <Route path='listingspage' element={<ListingsPage />} />
            <Route path='addlistings' element={<JobAddPage/>}/>
            <Route path='viewlisting/:id' element={<ViewListingsPage/>}/>
            <Route path='categorie' element={<AddCategoryPage />} />
            <Route path='type' element={<AddTypePage />} />
          </Route>

          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgetpassword' element={<ForgotPassPage/>}/>
          <Route path='/resetpass/:resettoken' element={<ResetPassPage />} /> 
        </Routes>
      </Router>

    </div>
  );
}

export default App;
