import { BrowserRouter as Router ,Routes,Route } from "react-router-dom";
import Products from "./components/Pages/Products";
import ProductDetails from "./components/Pages/ProductDetails";
import CategoryDetails from "./components/Pages/CategoryDetails";
import Search from "./components/Pages/Search";
import CartPage from "./components/Pages/CartPage";
import Navbar from "./components/Pages/Navbar";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
     <Router>
     <ToastContainer/>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Products/>}/>
        <Route path="/productsdetails/:id" element={<ProductDetails/>}/>
        <Route path="/catdetails/:category" element={<CategoryDetails/>}/>
        <Route path="/search/:searchQuery" element={<Search/>}/>
        <Route path="/cart" element={<CartPage/>}/>
      </Routes>
     </Router>
    </>
  );
}

export default App;
