import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_product_data } from "../../Redux/ProductSlice";
import { Box, Grid, Pagination, Paper, Typography } from "@mui/material";
import { Button } from "@mui/base";
import { Link } from "react-router-dom";
import Catgeories from "./Catgeories";
import { addToCart, getTotal } from "../../Redux/CartSlice";
import SearchInput from "./SearchInput";

const prodPerPage = 6;
const Products = () => {
  const { prod_data } = useSelector((state) => state?.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_product_data());
  }, []);
  const paperStyle = {
    width: "300px",
    backgroundColor: "#e1ede4",
    color: "black",
    padding: "10px",
    borderRadius: "10px",
  };
  const handleAddToCart = (items) => {
    dispatch(addToCart(items));
    dispatch(getTotal());
  };
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastProduct = currentPage * prodPerPage;
  const indexOfFirstProduct = indexOfLastProduct - prodPerPage;
  const currentPost = prod_data?.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
  };
  return (
    <>
      <Grid container spacing={2} p={5}>
        <Grid item xs={12} sm={6} md={2}>
          <Catgeories />
        </Grid>
        <Grid item xs={12} sm={6} md={10} justifyContent={"center"}>
          {/* <Typography variant='h4' align='center' my={2}> All Products </Typography> */}
          {/* <Grid container sx={{ justifyContent: "space-between" }}>
            <Grid item my={2}>
              
            </Grid>
          </Grid> */}

          <Box>
            <Box mb={2} display={"flex"} justifyContent={"end"}>
              <SearchInput />
            </Box>
            <Grid container spacing={4}>
              {currentPost?.map((items, index) => {
                return (
                  <>
                    <Grid item md={4}>
                      <Paper elevation={10} align="center" style={paperStyle}>
                        <Box>
                          <Typography variant="h6"> {items.title} </Typography>
                        </Box>
                        <img
                          src={items.thumbnail}
                          style={{ height: "200px", width: "300px" }}
                          alt=""
                        />
                        <Box>
                          <Typography>Brand : {items.brand} </Typography>
                          <Typography>Price : ${items.price} </Typography>

                          <Link to={`/productsdetails/${items.id}`}>
                            {" "}
                            <Button
                              sx={{ margin: "15px 5px" }}
                              variant="contained"
                              color="success"
                            >
                              Details
                            </Button>{" "}
                          </Link>

                          <Button
                            variant="contained"
                            onClick={() => handleAddToCart(items)}
                            color="success"
                          >
                            Add to Cart
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </Box>
          <Box sx={{display:'flex',justifyContent:'center'}}>
       <Pagination
            count={Math.ceil(prod_data?.length / prodPerPage)}
            page={currentPage}
            onChange={(e, value) => paginate(value)}
            variant="outlined"
            color="secondary"
            sx={{ margin: "20px auto" }}
          />
       </Box>
         
        </Grid>
       
    
       
      </Grid>
    </>
  );
};

export default Products;
