import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import LocalMallIcon from '@mui/icons-material/LocalMall';
const Navbar = () => {
const {totalQuantity} = useSelector((state)=>state.cart)

  return (
    <>
      <AppBar position='sticky'sx={{backgroundColor:"#431045"}}>
        <Toolbar>

          <Typography variant='h5'> S-Bazar </Typography>

                <Link to={'/'} style={{ textDecoration: "none", color: "white", fontSize: '17px', marginLeft: 'auto', padding: "20px" }}>Products</Link>

                <Link to={'/cart'} style={{ textDecoration: "none", color: "white", fontSize: '17px',padding: "20px",marginBottom:'5px' }} ><ShoppingCartIcon /> ({totalQuantity})</Link>

                {/* <Link to={'/cart'} style={{ textDecoration: "none", color: "white", fontSize: '17px',padding: "20px" }} ><ShoppingCartIcon/></Link> */}

             
        </Toolbar>
      </AppBar>

    </>
  )
}

export default Navbar