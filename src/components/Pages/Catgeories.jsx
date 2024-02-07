import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_category_data } from "../../Redux/CategorySlice";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Catgeories = () => {
  const { catg_data } = useSelector((state) => state?.catgeories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_category_data());
  }, []);
  const catPerRow = 5
  const [loadMore,SetLoadMore]= useState(catPerRow)

  const loadMorebtn = ()=>{
    SetLoadMore(loadMore+catPerRow)
  }
  return (
    <>
      <Box>
      <Typography variant='h6'  align='center' color={'black'} my={4}> Search By Category </Typography>
      <hr/>
        {catg_data?.slice(0,loadMore).map((item, index) => {
          return (
            <>
              <Box
                key={index}
                align="center"
                sx={{
                  height: "40px",
                  marginBottom: "10px",
                 borderRadius:"10px",
                  backgroundColor: "#cee0d3",
                }}
              >
                <li
                  style={{
                    listStyle: "none",
                    marginBottom: "20px",
                    // marginTop: "30px",
                    paddingTop: "10px",
                  }}
                >
                  <Link
                    to={`/catdetails/${item}`}
                    style={{
                      textDecoration: "none",
                      fontWeight: 500,
                      color: "black",
                    }}
                  >
                    {item.charAt(0).toUpperCase() +
                      item.substr(1).toLowerCase()}
                  </Link>
                </li>
              </Box>
            </>
          );
        })}
      </Box>
      <Grid container sx={{ justifyContent: "center", alignItems: "center" }}>  {loadMore < catg_data?.length && <Button variant='outlined' color='success' onClick={loadMorebtn} align='center' sx={{ fontWeight: "bold", color: "black" }}>More Category</Button>}  </Grid>
    </>
  );
};

export default Catgeories;
