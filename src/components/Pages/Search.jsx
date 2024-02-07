import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, Grid, Paper, Rating, Typography } from "@mui/material";
import Slider from "react-slick";
import { addToCart, getTotal } from "../../Redux/CartSlice";
const Search = () => {
  const { search_data, status } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleAddToCart = (items) => {
    dispatch(addToCart(items));
    dispatch(getTotal());
  };
  const settings = {
    dots: true,
    infinite: true,
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // height: '80vh'
  };
  return (
    <>
      <div>
        {status === "loading" && <p>Loading...</p>}
        {status === "error" && <p>Error occurred</p>}

        {status === "success" && (
          <div>
            {search_data?.length === 0 ? (
              <Box>
                <Typography align="center" variant="h5">
                  No Products Found
                </Typography>
                <br />
                <Typography align="center">
                  <Button
                    color="success"
                    component={Link}
                    to={"/"}
                    variant="outlined"
                    sx={{ marginTop: "20px" }}
                  >
                    Back to Product Page{" "}
                  </Button>{" "}
                </Typography>
              </Box>
            ) : (
              search_data?.map((items, index) => {
                return (
                  <>
                  <Grid container spacing={2}>

                  
                    <Grid item xs={12} sm={6} md={6}>
                      {/* <Typography variant='h6' my={2} align='center'>Images</Typography> */}
                      <Box>
                        <Slider {...settings}>
                          {items?.images?.map((img, index) => {
                            return (
                              <>
                                <Box key={index} align="center" my={4}>
                                  <img
                                    src={img}
                                    alt=""
                                    style={{ maxHeight: "300px" }}
                                  />
                                </Box>
                              </>
                            );
                          })}
                        </Slider>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} justifyContent={"c"}>
                      <Paper elevation={5} align="center" sx={{padding:'10px',marginTop:'25px'}}>
                        <Typography variant="h5" fontWeight={"bold"}>
                          {" "}
                          {items?.title}{" "}
                        </Typography>

                        <Typography>{items?.brand} </Typography>
                        <Typography>MRP : ${items?.price} </Typography>
                        <Typography>{items?.description} </Typography>
                        <Typography>{items?.stock} left </Typography>
                        <Typography>
                          {" "}
                          {items?.discountPercentage} % discount available{" "}
                        </Typography>
                        <Box component="fieldset" borderColor="transparent">
                          <Rating
                            value={items?.rating}
                            readOnly
                            precision={0.5}
                          />{" "}
                          <Typography>({items?.rating}) </Typography>
                        </Box>

                        <Grid
                          container
                          spacing={2}
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        ></Grid>
                        <Typography>
                          <Button
                            variant="contained"
                            sx={{ marginTop: "20px" }}
                            onClick={() => handleAddToCart(items)}
                            color="success"
                          >
                            Add to Cart
                          </Button>
                          <Button
                            color="success"
                            component={Link}
                            to={"/"}
                            variant="outlined"
                            sx={{ marginTop: "20px",marginLeft:'5px' }}
                          >
                            Back to Product Page{" "}
                          </Button>{" "}
                        </Typography>
                      </Paper>
                    </Grid>
                    </Grid>
                  </>
                );
              })
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
