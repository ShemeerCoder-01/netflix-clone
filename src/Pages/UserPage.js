import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../components/Common/NavBar/Navbar'
import { useNavigate } from 'react-router-dom';
import { movieContext } from '../MovieContext';


function UserPage() {
    const [user,setUser] = useState('');
    const [movies,setMovies] = useState([]);
    const navigate = useNavigate();
    let {moviesData} = useContext(movieContext);
    
    console.log("useContext data",moviesData);

    useEffect(()=>{
        const userEmail = localStorage.getItem('user');
        if(userEmail){
            setUser(userEmail);
            let [name] = userEmail.split('@');
            setUser(name);
           
        }
        else{
            navigate('/');
        }
    },[user,navigate]);

    useEffect(()=>{
        const favoriteList = JSON.parse(localStorage.getItem('favorites'));
        for(let i = 0; i < moviesData.length; i++){
            let favorites = moviesData[i].filter(movie=> favoriteList.includes(movie.id));
            setMovies(prevState=> [...prevState,favorites]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    console.log(movies);

  return (
    <div>
        <NavBar/>
        <h1 className='welcomeMsg'>Hi..{user}</h1>
        <h1>Favorites</h1>
        <div className='favoriteList'>
            
        </div>
    </div>
  )
}

export default UserPage