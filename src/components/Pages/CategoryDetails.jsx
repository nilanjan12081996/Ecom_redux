import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetch_category_details } from '../../Redux/CategoryDetailsSlice';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Box, Button, Container, Grid, Paper, Rating, Typography } from '@mui/material';
import { addToCart, getTotal } from '../../Redux/CartSlice';
const CategoryDetails = () => {
    const {category} = useParams()
    const {id} = useParams()
    const {cat_details,status} = useSelector((state)=>state.categorydetails)
     console.log('res',cat_details);
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetch_category_details(category))
    },[])

    const handleAddToCart = (items) => {
      dispatch(addToCart(items));
      dispatch(getTotal());
      
    };
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        },
    
      };
     
  return (
    <>
 <Container sx={{marginBottom:"15px"}}>
           
           <Typography variant='h6' color={'white'} align='center'my={2}>Category Details</Typography>
                {status === 'loading' && <p>Loading...</p>}
        {status === 'error' && <p>Error loading category details.</p>}
        {status === 'success' && (
                <Carousel responsive={responsive}>
                {/* <Slider {...settings}> */}
                  {cat_details?.map((data, index) => {
                    return (
                      <>
    
                        <Paper key={index} align='center' elevation={20} sx={{backgroundColor:"#bdc9c1"}}> 
                          <img src={data?.thumbnail} alt="" style={{ height: "200px", width: "200px" }} />
                          <Typography variant='h6' align='center'>{data?.title} </Typography>
                          <Typography align='center'>MRP : ${data?.price} </Typography>
                          <Typography align='center'>{data?.brand} </Typography>
                          <Typography align='center'>{data?.stock} left </Typography>
                          {/* <Typography align='center'>Rating : {data.rating} </Typography> */}
                          <Box component="fieldset" mb={3} borderColor="transparent">
                                         <Rating  value={data?.rating}  readOnly precision={0.5}  />
                                        </Box>
                          <Button style={{ margin: "5px 0px" }} variant='contained' color='primary' component={Link} to={`/productsdetails/${data.id}`} >Details</Button>

                          <Button
                            variant="contained"
                            sx={{margin:"5px"}}
                            onClick={() => handleAddToCart(data)}
                            color="success"
                          >
                            Add to Cart
                          </Button>
                        
                          <Grid container spacing={2} sx={{justifyContent:"center",alignItems:"center"}}>
                            {/* <Grid item>
                            <Button color='success' component={Link} to={'/buy'} variant='contained' sx={{ marginTop: "10px" }} >BUY NOW </Button>
                            </Grid> */}
                            {/* <Grid item>
                            <Button color='success' component={Link} to={'/cart'} variant='contained' sx={{ marginTop: "10px" }} >Add To Cart</Button>
                            </Grid> */}
                          </Grid>
                          <Typography><Button color='success' component={Link} to={'/'} variant='outlined' sx={{ marginTop: "20px",marginBottom:'10px' }} >Back to Product Page </Button> </Typography>
                         
    
                        </Paper>
    
    
    
                      </>
    
                    )
                  })
                  }
                  {/* </Slider> */}
      
                </Carousel>
                )}
              </Container>

    </>
  )
}

export default CategoryDetails