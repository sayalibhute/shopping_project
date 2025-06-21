import { Routes, Route } from 'react-router-dom';
import NavbarScreen from './components/NavbarScreen';
import Homepage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import RegisterPage from './pages/RegistersPages'
import LoginPage from './pages/LoginPage';
import LogOut from './pages/LogOut'
import NoteScreen from './noteTable/NoteScreen';

function App() {
  return (
    <>
      {/* <NavbarScreen />
      <main className='py-4 container'>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </main> */}
          <Routes>
      <Route path="/" element={<NavbarScreen />}>
        <Route index element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/logout' element={<LogOut/>}/>
        <Route path="/notescreen" element={<NoteScreen />} />

        <Route path="cart" element={<CartPage />} />
      </Route>
    </Routes>

    </>
  );
}

export default App;
