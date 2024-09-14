import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
    const [book,setBook] = useState({
        title: "",
        desc:"",
        price:null,
        cover:"",
    });


    useEffect(()=>{
        const bookName = async (bookId) =>{
            try {
                console.log("I get here")
                const bookName = await axios.get("http://localhost:8800/books/"+ bookId)
                console.log(bookName.data)
            } catch (err) {
                console.log(err)
            }

        }
        bookName()
    })
    

    const navitage = useNavigate()
    const location = useLocation()

    const bookId = location.pathname.split("/")[2]

    const handleChange = (e) =>{
    setBook((prev) => ({...prev, [e.target.name]: e.target.value}));
};

const handleClick = async e =>{
    e.preventDefault()
    try {
        await axios.put("http://localhost:8800/books/"+ bookId, book)
        navitage("/")
    } catch (err) {
        console.log(err)
    }

}


console.log(book)

  return (


    <div className='form'>
        <h1>Update Book </h1>
        <input type="text" placeholder='title' onChange={handleChange} name="title"/>
        <input type="text" placeholder='desc' onChange={handleChange} name="desc"/>
        <input type="number" placeholder='price' onChange={handleChange} name="price"/>
        <input type="text" placeholder='cover' onChange={handleChange} name="cover"/>

        <button className="formButton" onClick={handleClick}>Update</button>
    
    </div>
  );
};

export default Update