import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import ForgotPass from './pages/ForgotPass';

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
            
          </Routes>
      </Router>
  </div>
  )
}

export default App;
