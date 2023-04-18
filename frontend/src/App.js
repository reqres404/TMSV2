import {BrowserRouter,Routes,Route} from 'react-router-dom'
//components
import Home from './pages/Home';
import Admin from './pages/Admin';
import Navbar from './components/Navbar/Navbar';
import Book from './pages/Book';
import Register from './pages/Register';
import Test from './pages/Test/Test'
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className='pages'>
          <Routes>
            <Route
            path="/"
            element={<Home/>}
            />
          </Routes>
          <Routes>
            <Route
            path="/admin"
            element={<Admin/>}
            />
          </Routes>
          <Routes>
            <Route
            path="/book"
            element={<Book/>}
            />
          </Routes>
          <Routes>
            <Route
            path="/register"
            element={<Register/>}
            />
          </Routes>          <Routes>
            <Route
            path="/test"
            element={<Test/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
