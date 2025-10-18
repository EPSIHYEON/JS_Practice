import {BrowserRouter , Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home'

import './App.css'
import NewPage from './pages/NewPage';


function App() {

  return (
    <BrowserRouter>
    <nav>
      <Link to={'/'}>Home   </Link>
      <Link to={'/newpage'}>NewPage   </Link>

    </nav>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/newpage' element={<NewPage />} />

        </Routes>
        <footer>footer입니다</footer>
        </BrowserRouter>
  
  )
}

export default App
