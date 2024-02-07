import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_product_details } from "../../Redux/ProductDetailsSlice";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Rating from "@mui/material/Rating";
import { addToCart, getTotal } from "../../Redux/CartSlice";
const ProductDetails = () => {
  const { id } = useParams();
  const { details_Data } = useSelector((state) => state?.productdetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_product_details(id));
  }, []);

  const handleAddToCart = (items) => {
    dispatch(addToCart(items));
    dispatch(getTotal());
    
  };

  const paperStyle = { backgroundColor: "#bdc9c1", color: "black" };
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
      <Container>
        <Paper
          align="center"
          elevation={20}
          sx={{ marginTop: "30px", padding: "80px" }}
          style={paperStyle}
        >
          <Grid
            container
            spacing={2}
            sx={{ alignItems: "centre", justifyContent: "center" }}
          >
            <Grid item xs={12} sm={6} md={6}>
              {/* <Typography variant='h6' my={2} align='center'>Images</Typography> */}
              <Box>
                <Slider {...settings}>
                  {details_Data?.images?.map((img, index) => {
                    return (
                      <>
                        <Box key={index} align="center">
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
            <Grid item xs={12} sm={5} md={5}>
              <Box>
                <Typography variant="h5" fontWeight={"bold"}>
                  {" "}
                  {details_Data?.title}{" "}
                </Typography>

                <Typography>{details_Data?.brand} </Typography>
                <Typography>MRP : ${details_Data?.price} </Typography>
                <Typography>{details_Data?.description} </Typography>
                <Typography>{details_Data?.stock} left </Typography>
                <Typography>
                  {" "}
                  {details_Data?.discountPercentage} % discount available{" "}
                </Typography>
                <Box component="fieldset" borderColor="transparent">
                  <Rating
                    value={details_Data?.rating}
                    readOnly
                    precision={0.5}
                  />{" "}
                  <Typography>({details_Data?.rating}) </Typography>
                </Box>

                <Grid
                  container
                  spacing={2}
                  sx={{ justifyContent: "center", alignItems: "center" }}
                ></Grid>
                <Typography>
                <Button
                            variant="contained"
                            sx={{margin:"5px"}}
                            onClick={() => handleAddToCart(details_Data)}
                            color="success"
                          >
                            Add to Cart
                          </Button>
                          <br/>
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
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default ProductDetails;
