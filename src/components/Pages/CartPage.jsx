import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  clearCart,
  decreaseCart,
  deleteItem,
  getTotal,
  increaseCart,
} from "../../Redux/CartSlice";
const CartPage = () => {
  const { cartItems, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cartItems, dispatch]);

  const handleDelete = (cartitems) => {
    dispatch(deleteItem(cartitems));
  };

  const handleDecrease = (cartitems) => {
    dispatch(decreaseCart(cartitems));
  };

  const handleIncrease = (cartItems) => {
    dispatch(increaseCart(cartItems));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <Container>
        {cartItems?.length ? (
          <Typography variant="h6" textAlign={"center"} my={2}>
            You have <span style={{ color: "red" }}>{cartItems.length} </span>{" "}
            items in your cart
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Link to={"/"}>
                {" "}
                <Button variant="outlined" color="success">
                  Add More Products
                </Button>
              </Link>
            </Box>
          </Typography>
        ) : (
          <Typography variant="h6" textAlign={"center"}>
            Your Cart is Empty{" "}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Link to={"/"}>
                {" "}
                <Button variant="outlined" color="success">
                  Continue Shopping
                </Button>
              </Link>
            </Box>{" "}
          </Typography>
        )}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={8}>
            {cartItems?.length > 0 ? (
              <Button
                onClick={() => handleClearCart()}
                variant="outlined"
                color="error"
              >
                Clear Cart
              </Button>
            ) : null}

            {cartItems &&
              cartItems?.map((cartitems, index) => {
                return (
                  <>
                    <Paper
                      elevation={5}
                      key={cartitems._id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        margin: "5px ",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      <img
                        src={cartitems?.thumbnail}
                        width="20%"
                        height={"100px"}
                        alt=""
                      />
                      <Box>
                        <Typography>
                          <b>{cartitems?.title?.substring(0, 25)}</b>{" "}
                        </Typography>

                        <Typography>
                          {cartitems?.description?.substring(0, 40)}...
                        </Typography>

                        <Typography>Price : $ {cartitems?.price} </Typography>
                      </Box>

                     
                      <Button onClick={() => handleIncrease(cartitems)}>
                        {" "}
                        <AddIcon />{" "}
                      </Button>
                      <Typography mt={5}>{cartitems?.cartQuantity} </Typography>
                      <Button onClick={() => handleDecrease(cartitems)}>
                        <RemoveIcon />
                      </Button>
                    
                      <Typography my={5}>
                        ${cartitems?.price * cartitems?.cartQuantity}
                      </Typography>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ height: "35px", marginTop: "30px" }}
                        size="small"
                        onClick={() => handleDelete(cartitems)}
                      >
                        <DeleteIcon />
                      </Button>
                    </Paper>
                  </>
                );
              })}
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Paper
              elevation={10}
              sx={{
                padding: "30px",
                borderRadius: "15px",
                marginBottom: "20px",
              }}
            >
              <Typography
                textAlign={"center"}
                sx={{ fontSize: "25px", fontWeight: "bold" }}
              >
                Cart Summary{" "}
              </Typography>
              <Typography textAlign={"center"}>
                Total | Checkout | Payment{" "}
              </Typography>

              <hr />

              <Typography>Total Quantity : {totalQuantity}</Typography>
              <hr />

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sl No. </TableCell>
                    <TableCell>Product </TableCell>
                   
                    <TableCell>Quantity </TableCell>
               
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems?.map((item, index) => {
                    return (
                      <>
                        <TableRow key={item.id}>
                          <TableCell>{index + 1} </TableCell>
                          <TableCell>{item?.title} </TableCell>

                          <TableCell>
                          <Button onClick={() => handleIncrease(item)}>
                      
                      +
                      </Button>
                         <span style={{marginLeft:'27px'}}>{item?.cartQuantity}  </span> 
                          <Button onClick={() => handleDecrease(item)}>
                       -
                      </Button>
                          
                          </TableCell>

                          <TableCell>
                          
                            ${item?.price * item.cartQuantity}{" "}
                           
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>

              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Typography
                  sx={{ margin: "50px 5px 0px 0px", fontWeight: "bold" }}
                >
                  {" "}
                  Subtotal :$ {totalPrice}
                </Typography>
              </Box>

              <Button variant="contained" fullWidth>
                Go to checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CartPage;
