import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetch_search } from '../../Redux/SearchSlice'
import { Button, Input } from '@mui/material'

const SearchInput = () => {
    // const {search_data,status} =useSelector((state)=>state.search)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = () => {
        console.log("Search Query:", searchQuery);
        dispatch(fetch_search(searchQuery));
        navigate(`/search/${searchQuery}`)
    }
    useEffect(()=>{
      
    },[searchQuery])
  return (
    
    <>

<Input 
sx={{border:'1px solid black',borderRadius:'10px',padding:'5px',width:'30%'}}
        type="text"
        value={searchQuery}
        placeholder='Search Products'
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button variant='contained' color='success' size='small' onClick={handleSearch}>Search</Button>


    </>
  )
}

export default SearchInput