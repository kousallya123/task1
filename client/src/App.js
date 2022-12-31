import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import HomePage from './Pages/HomePage';
import AdminLoginpage from './Pages/AdminLoginpage';
import User from './Store/userContext';
import AdminHomePage from './Pages/AdminHomePage';
import PrivateRoute from './Components/utils/PrivateRoute';
import ResetPage from './Pages/ResetPage';
import ForgotPage from './Pages/ForgotPage';
import Otp from './Components/Otp/Entermobile';
import ConfirmOtp from './Components/Otp/ConfirmOtp';

function App() {
  return (
    <div className="App">
      <User>
     <Router>
       <Routes>
         <Route path='/signup' element={<SignupPage/>}/>
         <Route path='/' element={<LoginPage/>}/>
         <Route path='/forgot' element={<ForgotPage/>}/>
         <Route path='/otp' element={<Otp/>}/>
         <Route path='/confirmOtp/:phone' element={<ConfirmOtp/>}/>

         <Route path='/reset/:id/:token' element={<ResetPage/>}/>
         <Route element={<PrivateRoute/>}>
         <Route path='/home' element={<HomePage/>}/>
         </Route>
         <Route path='/admin-login' element={<AdminLoginpage/>}/>
         <Route path='/admin-users' element={<AdminHomePage/>}/>
       </Routes>
     </Router>
     </User>
    </div>
  );
}

export default App;
