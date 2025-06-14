import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import ForgotPass from './pages/ForgotPass';
import AdminPage from './pages/AdminPage';

function App() {

     
  return (
  <div>
      <Router basename='/'>
          <Routes>
             <Route path='/' element = {<SignUp />} />
             
            <Route path='/SignUp' element = {<SignUp />} />
            <Route path='/Login' element = {<Login />} />
            <Route path='/Home' element = {<Home />} />
            <Route path='/ForgotPass' element = {<ForgotPass />} />
            <Route path='/AdminPage' element = {<AdminPage />} />
            
          </Routes>
      </Router>
  </div>
  )
}

export default App;
