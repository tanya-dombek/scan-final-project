import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow custom-next-arrow`}
        style={{style}}
        onClick={onClick}
      />
    );
  }
  
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow custom-prev-arrow`}
        style={{style}}
        onClick={onClick}
      />
    );
  }

function ResponsiveSlider({data}) {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      dots: false,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
            breakpoint: 1000,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
            }
        },
        {
          breakpoint: 670,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
          }
        }
      ]
    };
    return (
        <Slider {...settings}>
            {data.map((item, index) => (
                <div key={index} className='slider-card'>
                    <img src={item.img} alt='icon'/>
                    <p>{item.description}</p>
                </div>
            ))}
        </Slider>
    );
  }
  
  export default ResponsiveSlider;