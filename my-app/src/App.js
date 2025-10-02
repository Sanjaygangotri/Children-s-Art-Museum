import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { GiHumanTarget } from "react-icons/gi";
import { MdArrowDropDown } from "react-icons/md";
import { MdArrowDropUp } from "react-icons/md";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FaAngleRight } from "react-icons/fa6";
import { GiFamilyHouse } from "react-icons/gi";
import testimonials from './slider_textes';
import win from './winners';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiBorderAll } from 'react-icons/bi';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';




const App = () => {
  

  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState(0);

  const navigate = useNavigate();

  // Handler function to navigate to /login 
const handleSummitArtClick = async () => {
  try {
    const res = await fetch('/api/profile', {
      credentials: 'include',
    });

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


  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(timer);
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
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
            <li><a href="#">Home</a></li>
            <li><a href="#">Our Story</a></li>
            <li>
              <a href="#">Gallery <MdArrowDropDown className='down_icon' /> <MdArrowDropUp className='up_icon' /></a>
              <ul className="dropdown">
                <li>Museum <FaAngleRight className='Arrow' /></li>
                <li>School <FaAngleRight className='Arrow' /></li>
              </ul>
            </li>
            <li><a href="#">ArtFest</a></li>
            <li>
              <a href="#">Play <MdArrowDropDown className='down_icon' /> <MdArrowDropUp className='up_icon' /></a>
              <ul className="dropdown">
                <li>Roblox <FaAngleRight className='Arrow' /></li>
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
      <div className="hero">
        <div className="left_hero">
          <div className='left_hero_first'>
            <span>Theme:</span>
            <span>CAMI for me</span>
            <span>ARTFEST | JUNE 2025</span>
          </div>
          <div className="left_hero_mid">
            <span>Let your imagination run wild and</span>
            <span>create CAMI of your dreams</span>
          </div>
          <div className='left_hero_last'>
            <a href="#">Summit Now</a>
          </div>
        </div>
        <div className="right_hero">
          <img src="https://static.wixstatic.com/media/3de004_497cc5f1569b46d0a4ed0a58036e11d0~mv2.jpg/v1/fill/w_1024,h_645,al_c,q_85,enc_avif,quality_auto/Gemini_Generated_Image_j9lf50j9lf50j9lf_edited.jpg" alt="image" />
        </div>
      </div>
      <div className='fixed'>
        <span><a href="#">BE OUR AMBASSADOR</a></span>
      </div>
      <div className="trasser">
        <div className="towns">
          <span>170 +</span>
          <span>Towns & Cites</span>
        </div>
        <div className="brand">
          <span>250+</span>
          <span>Young Brand Ambassadors</span>
        </div>
        <div className="atwork">
          <span>10K+</span>
          <span>Atwork Submitted</span>
        </div>
        <div className="visitors">
          <span>600k+</span>
          <span>Website Visitors</span>
        </div>
      </div>
      <div className="frame">
        <div className='frame_1'>
          <span>
            CAMI Celebrated for Youth Entrepreneurship Excellence
          </span>
        </div>
        <div className='frame_2'>
          <img src="https://static.wixstatic.com/media/3de004_7e6bce9d45194d7e9595bde4524d3039~mv2.png/v1/fill/w_754,h_754,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/CAMI%20-%20Media%20Coverage.png" alt="image" />
        </div>
      </div>
      <div className="some">
        <span>Art For A Better Tomorrow</span>
        <span>By The Children | FOR THE CHILDREN | OF THE CHILDREN</span>
      </div>
      <div className="slider-container">
        <ul className="slider-items hide-scrollbar">
          <li className="slider-item1">
            <a href="#" className="slider-link">
              <img src="/images/Animal.jpg" alt="Animal.jpg" className="slider-image" />
            </a>
          </li>
          <li className="slider-item1">
            <a href="#" className="slider-link">
              <img src="/images/blue-mixed-color.jpg" alt="blue-colored.jpg" className="slider-image" />
            </a>
          </li>
          <li className="slider-item1">
            <a href="#" className="slider-link">
              <img src="/images/buddha.jpg" alt="Buddha.jpg" className="slider-image" />
            </a>
          </li>
          <li className="slider-item1">
            <a href="#" className="slider-link">
              <img src="/images/couples-in-rainy.png" alt="couples.jpg" className="slider-image" />
            </a>
          </li>
          <li className="slider-item1">
            <a href="#" className="slider-link">
              <img src="/images/dance-step.jpeg" alt="dance-step.jpg" className="slider-image" style={{ objectPosition: 'top center' }} />
            </a>
          </li>
          <li className="slider-item1">
            <a href="#" className="slider-link">
              <img src="/images/eye-and-lips.jpg" alt="eye-lips.jpg" className="slider-image" />
            </a>
          </li>
          <li className="slider-item1">
            <a href="#" className="slider-link">
              <img src="/images/famous-women.jpeg" alt="Animal.jpg" className="slider-image" style={{ objectPosition: 'top center' }} />
            </a>
          </li>
          <li className="slider-item1">
            <a href="#" className="slider-link">
              <img src="/images/Ganesh-image.jpg" alt="Animal.jpg" className="slider-image" />
            </a>
          </li>
          <li className="slider-item1">
            <a href="#" className="slider-link">
              <img src="/images/hourse-with-girl.jpeg" alt="hourse.jpg" className="slider-image" />
            </a>
          </li>
          <li className="slider-item1">
            <a href="#" className="slider-link">
              <img src="/images/Lion-image.jpeg" alt="Lion.jpg" className="slider-image" />
            </a>
          </li>
          <li className="slider-item1">
            <a href="#" className="slider-link">
              <img src="/images/Night-time.jpeg" alt="Animal.jpg" className="slider-image" style={{ filter: 'contrast(150%)' }} />
            </a>
          </li>
          <li className="slider-item1">
            <a href="#" className="slider-link">
              <img src="/images/painted-house.jpeg" alt="Animal.jpg" className="slider-image" />
            </a>
          </li>
          <li className="slider-item1">
            <a href="#" className="slider-link">
              <img src="/images/painted-women.jpg" alt="Animal.jpg" className="slider-image" />
            </a>
          </li>
          <li className="slider-item1">
            <a href="#" className="slider-link">
              <img src="/images/parrot.avif" alt="Animal.jpg" className="slider-image" style={{ objectPosition: 'top center' }} />
            </a>
          </li>
          <li className="slider-item1">
            <a href="#" className="slider-link">
              <img src="/images/Radha.webp" alt="Animal.jpg" className="slider-image" style={{ objectPosition: 'top center' }} />
            </a>
          </li>
          <li className="slider-item1">
            <a href="#" className="slider-link">
              <img src="/images/Radha-Krishna.jpeg" alt="Animal.jpg" className="slider-image" />
            </a>
          </li>
          <li className="slider-item1">
            <a href="#" className="slider-link">
              <img src="/images/sparrow.jpeg" alt="Animal.jpg" className="slider-image" />
            </a>
          </li>
          <li className="slider-item1">
            <a href="#" className="slider-link">
              <img src="/images/Weird.webp" alt="Animal.jpg" className="slider-image" />
            </a>
          </li>
          <li className="slider-item1">
            <a href="#" className="slider-link">
              <img src="/images/Women-with-fruits.jpeg" alt="Animal.jpg" className="slider-image" style={{ objectPosition: 'top center' }} />
            </a>
          </li>
        </ul>
      </div>
      <div className="cami">
        <span>CAMI for School</span>
        <span>Aiming to impact masses...</span>
      </div>
      <div className="schools">
        <div className="schools_top">
          <div className="Kasrol_gujrat">
            <span><GiFamilyHouse size={30} /></span>
            <span className="text">Aditya Birla Public School, Bharuch</span>
            <span className="last">Kesrol Gujrat</span>
          </div>
          <div className="Chandrapura_Maharastra">
            <span><GiFamilyHouse size={30} /></span>
            <span className="text">Aditya Birla Public School, Awarpur</span>
            <span className="last">Chandrapur, Maharashtra</span>

          </div>
          <div className="Ujjain_Madhya_pradesh">
            <span><GiFamilyHouse size={30} /></span>
            <span className="text">Aditya Birla S. Secondary School</span>
            <span className="last">Ujjain, Madhya Pradesh</span>

          </div>
          <div className="Khariya_Jodhpur">
            <span><GiFamilyHouse size={30} /></span>
            <span className="text">Aditya Birla Public School, Jodhpur</span>
            <span className="last">Khariya Khangar, Jodhpur</span>

          </div>
          <div className="Veraval_gujrat">
            <span><GiFamilyHouse size={30} /></span>
            <span className="text">Aditya Birla Public School, Veraval</span>
            <span className="last">Veraval, Gujrat</span>

          </div>
          <div className="Indra_nagar">
            <span><GiFamilyHouse size={30} /></span>
            <span className="text">Delhi Public School</span>
            <span className="last">Sector-19, Indira Nagar, Lucknow</span>

          </div>
        </div>
        <div className="schools_bottom">
          <div className="sector_50">
            <span><GiFamilyHouse size={30} /></span>
            <span className="text">Bagiya School</span>
            <span className="last">Sector 50, Gurgaon</span>

          </div>
          <div className="South_extension">
            <span><GiFamilyHouse size={30} /></span>
            <span className="text">Cankids Can</span>
            <span className="last">South Extention, Delhi</span>

          </div>
          <div className="Upperpally">
            <span><GiFamilyHouse size={30} /></span>
            <span className="text">Fly Holistic School</span>
            <span className="last">Upperpally, Hyderabad</span>

          </div>
          <div className="Greek_park">
            <span><GiFamilyHouse size={30} /></span>
            <span className="text">Cankids Can</span>
            <span className="last">Green Park, Delhi</span>

          </div>
          <div className="Rohini">
            <span><GiFamilyHouse size={30} /></span>
            <span className="text">Sarvodaya Vidyalaya</span>
            <span className="last">Rohini, New Delhi</span>

          </div>
        </div>
      </div>
      <div className="visit_schools">
        <button>Visit Schools</button>
      </div>
      <div className="sport_media">
        <span>Spot us in Media</span>
      </div>
      <div className="papers">
        <img src="https://static.wixstatic.com/media/3de004_9df1e3b2dd234d8a93a15d31b8efd371~mv2.png/v1/fill/w_510,h_510,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/101.png" alt="image_1" />
        <img src="https://static.wixstatic.com/media/3de004_4abcfe6e6f044886a56d9d4cf0ad66c9~mv2.png/v1/fill/w_510,h_510,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/110.png" alt="image_2" />
        <img src="https://static.wixstatic.com/media/3de004_bc7cd1fd55b649d487d853ab8528a723~mv2.png/v1/fill/w_510,h_510,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/106.png" alt="image_3" />
        <img src="https://static.wixstatic.com/media/3de004_7ea73e8cceb44cb8b5a22bb758883500~mv2.png/v1/fill/w_510,h_510,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/100%5B1%5D.png" alt="image_4" />

      </div>
      <div className="view_more">
        <span>View More</span>
      </div>
      <div className="next_slider">
        <div className="next_slider_items">
          {testimonials.map((item, idx) => (
            <div
              key={idx} //key is just a prop to uniquely identify ease element in the list (use can use any name as you want)
              className={`slider_item${idx === active ? ' active' : ''}`}
            >
              <span>{item.title}</span>
              <span>{item.text}</span>
              <span>{item.author}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="next_hero">
        <div className="left_next_hero">
          <div className='top'>
            <span>Experience the Children's Art</span>
            <span>Museum in Metaverse!</span>
          </div>
          <div>
            <img src="https://static.wixstatic.com/media/3de004_0adb1ede6f5542bfb19bb851247f52c9~mv2.png/v1/crop/x_0,y_368,w_480,h_143/fill/w_390,h_116,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/6294ec0c4609037792ef36f6.png" alt="logo" />
          </div>
          <div>
            <div>
              <span>🚀</span>
              <span>Launched In June 2023</span>
            </div>
            <div>
              <span>🕹️</span>
              <span>Game Visits 248,00+</span>
            </div>
            <div>
              <span>👍🏼</span>
              <span>Liked By 2500+</span>
            </div>
          </div>
          <div>
            <button>Play Now</button>
          </div>
        </div>

        <div className="right_next_hero">
          <iframe
            width="700"
            height="460"
            src="https://www.youtube.com/embed/8mhXfi2caXA?autoplay=1&mute=1"
            title="YouTube video player"
            className='IFrame'
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" // for our case this doesn't make any sense because we have a url of youtube webpage in which video is being played.
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="winners">
        <span>June 2025 Monthly Winners🏅</span>
      </div>
      <div className="winners-slider-bar-container">
        <Slider {...settings}>
          {win.map((items) => (
            <div className="ph" key={items.link}>
              <img src={items.link} alt="image" />
            </div>
          ))}
        </Slider>
      </div>
      <div className='last_div'>
        <div>

          <div className="kuchbhi">
            <span>A PROUD FEATURE BY BOSTON CHILDREN'S MUSEUM</span>
          </div>
          <div className="big_and_little">
            <img src="https://static.wixstatic.com/media/3de004_5082d172b78f49a9b3d06a8d7942af51~mv2.png/v1/fill/w_226,h_230,al_c,lg_1,q_85,enc_avif,quality_auto/Boston.png" alt="img.png" />
            <img src="https://static.wixstatic.com/media/3de004_4058c3d772514196b62695d3e2ef880d~mv2.png/v1/fill/w_833,h_160,al_c,lg_1,q_85,enc_avif,quality_auto/3de004_4058c3d772514196b62695d3e2ef880d~mv2.png" alt="img.png" />
          </div>
          <div className="full_episode">
            <button>Listen Full Episode</button>
          </div>
          <div className='big_ideas'>
            <span>Young Minds, Big Ideas</span>
          </div>
        </div>
        <div>

          <div className="stiky_mid">
            <img src="https://static.wixstatic.com/media/3de004_24ed1fae7f8f4f86a4f6305312212b8e~mv2.png/v1/fill/w_1901,h_913,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/3de004_24ed1fae7f8f4f86a4f6305312212b8e~mv2.png" alt="image" />
          </div>
        </div>
        <div>
          <div>
            <h2>Important Links</h2>
            <a href="#">Help & How to upload</a>
            <a href="#">Privacy & Policy</a>
            <a href="#">Delivery Policy</a>
            <a href="#">Cancellation, Return and Refund Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Careers</a>
          </div>
          <div>
            <div>
              <div>
                <span><img src="https://static.wixstatic.com/media/11062b_8b3cbae79dcb4a55b4ec2bac32f88d96~mv2.png/v1/fill/w_84,h_84,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_8b3cbae79dcb4a55b4ec2bac32f88d96~mv2.png" alt="img" /></span>
                <span><img src="https://static.wixstatic.com/media/11062b_aabae1939a1845e28f924e8906fa4739~mv2.png/v1/fill/w_84,h_84,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_aabae1939a1845e28f924e8906fa4739~mv2.png" alt="img" /></span>
                <span><img src="https://static.wixstatic.com/media/11062b_8dcadfa428954b1d919f8499f75aa27a~mv2.png/v1/fill/w_84,h_84,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_8dcadfa428954b1d919f8499f75aa27a~mv2.png" alt="img" /></span>
                <span><img src="https://static.wixstatic.com/media/48a2a42b19814efaa824450f23e8a253.png/v1/fill/w_84,h_84,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/48a2a42b19814efaa824450f23e8a253.png" alt="img" /></span>
                <span><img src="https://static.wixstatic.com/media/8d6893330740455c96d218258a458aa4.png/v1/fill/w_84,h_84,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/8d6893330740455c96d218258a458aa4.png" alt="img" /></span>
                <span><img src="https://static.wixstatic.com/media/e316f544f9094143b9eac01f1f19e697.png/v1/fill/w_84,h_84,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e316f544f9094143b9eac01f1f19e697.png" alt="img" /></span>
              </div>
              <div>
                <div>
                  <input type="text" placeholder='Sign up for our Newsletter' />
                  <button>Sign Up</button>
                </div>
                <div>
                  <input type="checkbox" />
                  <span>I agree to the <a href="#">Privacy Policy</a></span>
                </div>
              </div>
            </div>
            <div>
              <img src="https://static.wixstatic.com/media/3de004_0d8a3c043e1d4f29b2b3b88198518c0e~mv2.png/v1/fill/w_348,h_344,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/children_museum_blogs_Feedspot-removebg-preview.png" alt="image.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




export default App
