import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { GiHumanTarget } from "react-icons/gi";
import { MdArrowDropDown } from "react-icons/md";
import { MdArrowDropUp } from "react-icons/md";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FaAngleRight } from "react-icons/fa6";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomeContent from './HomeContent';
import StoryOur from './OurStory';
import MuseumGallery from './MuseumGallery';




const App = () => {
  const [toggle, setToggle] = useState(false);
  const [ourStory, setourStory] = useState(false);
  const [museum, setMuseum] = useState(false);

  const navigate = useNavigate();

  // Home click handler
  const HomeClickHandler = (e) => {
    e.preventDefault();
    setourStory(false);
    setMuseum(false);
    navigate('/');
  }


  // Handler function to navigate to /login 
  const handleSummitArtClick = async () => {
    try {
      // const res = await fetch('http://localhost:3000/api/profile', {
      //   credentials: "include",
      // });
      const res  = await fetch(`${process.env.REACT_APP_API_URL}/api/profile`)


      if (res.status === 200) {
        navigate('/profile'); // logged in
      } else if (res.status === 401) {
        navigate('/login'); // not logged in
      } else {
        navigate('/login'); // fallback
      }
    } catch (error) {
      navigate('/login');
    }
  };
  const OurStoryHandler = (e)=>{
    e.preventDefault();
    setourStory(true);
  }
  const MuseumHandler = (e)=>{
    e.preventDefault();
    setourStory(false);
    setMuseum(true);
  }



  return (
    <div className={toggle ? 'blurred' : 'screen'}>
      <div className="toggle icon" onClick={() => setToggle(!toggle)}>
        <span><IoReorderThreeOutline size={30} /></span>
      </div>
      <div className={toggle ? 'nav Remover' : 'nav'}>
        <img src="https://static.wixstatic.com/media/1b2c9f_c870f21477fc404ea9eeadf9f41779ae~mv2.png/v1/fill/w_241,h_70,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/CAMI.png" alt="png" />
        <div className='main_nav'>
          <span className='cross_icon icon'><RxCross2 size={50} onClick={() => setToggle(!toggle)} /></span>
          <ul >
            <li><a href="/" onClick={HomeClickHandler}>Home</a></li>
            <li><a href="/" onClick={OurStoryHandler}>Our Story</a></li>
            <li>
              <a href="#">Gallery <MdArrowDropDown className='down_icon' /> <MdArrowDropUp className='up_icon' /></a>
              <ul className="dropdown">
                <li onClick={MuseumHandler}>Museum <FaAngleRight className='Arrow' /></li>
                <li>School <FaAngleRight className='Arrow' /></li>
              </ul>
            </li>
            <li><a href="#">ArtFest</a></li>
            <li>
              <a href="#">Play <MdArrowDropDown className='down_icon' /> <MdArrowDropUp className='up_icon' /></a>
              <ul className="dropdown">
                <li onClick={() => window.open("https://www.roblox.com/games/13466257413/Childrens-Art-Museum", "_blank")}>Roblox <FaAngleRight className='Arrow' /></li>

                <li>Big Play <FaAngleRight className='Arrow' /></li>
                <li>Color Quest <FaAngleRight className='Arrow' /></li>
              </ul>
            </li>
            <li>
              <a href="#">Explore <MdArrowDropDown className='down_icon' /> <MdArrowDropUp className='up_icon' /></a>
              <ul className="dropdown">
                <li>Learn Art <FaAngleRight className='Arrow' /></li>
                <li>Blogs <FaAngleRight className='Arrow' /></li>
                <li>Newsletters <FaAngleRight className='Arrow' /></li>
                <li>Vote <FaAngleRight className='Arrow' /></li>
              </ul>
            </li>
            <li><a href="#">Media</a></li>
            <li><a href="#">Shop</a></li>
            <li>
              <a href="#">Connect <MdArrowDropDown className='down_icon' /> <MdArrowDropUp className='up_icon' /></a>
              <ul className="dropdown">
                <li>Internships <FaAngleRight className='Arrow' /></li>
                <li>ReturnShips <FaAngleRight className='Arrow' /></li>
                <li>Contact <FaAngleRight className='Arrow' /></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="summit_art" onClick={handleSummitArtClick}>
          <GiHumanTarget size={35} />
          <span>Summit Art</span>
        </div>
      </div>

      {ourStory ? <StoryOur /> : museum ? <MuseumGallery/> : <HomeContent />}
      

    </div>
  )
}


export default App
