


// Products.js
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../Redux/cartSlice";

// ... (other imports)

// const Products = () => {
//   const dispatch = useDispatch();

//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));
//   };

//   // ... (other component code)

//   {status === "success" && (
//     <div>
//       <h2>Search Results</h2>
//       <ul>
//         {search_data.map((result) => (
//           <li key={result.id}>
//             <Typography variant="h6">{result.title}</Typography>
//             {/* ... (other product details) */}
            // <Button variant="contained" onClick={() => handleAddToCart(result)}>
            //   Add to Cart
            // </Button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )}
// };

// export default Products;

// CartInfo.js
// import { useSelector } from "react-redux";

// const CartInfo = () => {
//   const cartItems = useSelector((state) => state.cart.items);

//   return (
//     <div>
//       <h2>Cart Information</h2>
//       <ul>
//         {cartItems.map((item) => (
//           <li key={item.id}>{item.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CartInfo;