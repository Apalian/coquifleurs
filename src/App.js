import './App.css';
import ProductList from "./components/productList";
import Register from "./components/Register";
import AddProduct from "./components/AddProduct";
function App() {
  return (
    <div className="App">
      <ProductList/>
      <Register/>
      <AddProduct/>
    </div>
  );
}

export default App;
