import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import HomePage from './Pages/HomePage';
import AdminLoginpage from './Pages/AdminLoginpage';
import User from './Store/userContext';
import AdminHomePage from './Pages/AdminHomePage';

function App() {
  return (
    <div className="App">
      <User>
     <Router>
       <Routes>
         <Route path='/signup' element={<SignupPage/>}/>
         <Route path='/' element={<LoginPage/>}/>
         <Route path='/home' element={<HomePage/>}/>
         <Route path='/admin-login' element={<AdminLoginpage/>}/>
         <Route path='/admin-users' element={<AdminHomePage/>}/>
       </Routes>
     </Router>
     </User>
    </div>
  );
}

export default App;
