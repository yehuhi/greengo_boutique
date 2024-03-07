import React from 'react'
import "./Hero.css"

const Hero = () => {
  return (
    <div className='hero-cont'>
      <div className='div_p'>
        <p className='p1'>LA GUIA DE REGALOS PARA EL DIA DE SAN VALENTIN</p>
        <p className='p2'>Celebra el Día de San Valentín con colores vivos, looks apasionantes para una cita nocturna y regalos a juego, como nuestro nuevo bolso Tribeca.</p>
      </div>
  
    <div className='images-hero'>
      <div className="image-hero1">
        <img className='img-hero' src="https://www.beyoung.in/blog/wp-content/uploads/2023/01/The-Shoulder-Bag-853x1024.jpg" alt="" />
      </div>
      <div className="image-hero1">
        <img className='img-hero' src="https://5.imimg.com/data5/SELLER/Default/2023/6/317537012/JU/CL/VG/185931781/zjmc10-12--500x500.jpg" alt="" />
      </div>
      <div className="image-hero1">
        <img className='img-hero' src="https://www.guess.ae/dw/image/v2/BDDB_PRD/on/demandware.static/-/Sites-guess-master-catalog/default/dw04e7db67/images/BG787924_CLO_05.jpg?sw=800&sh=1040" alt="" />
      </div>
     </div>
    </div>
  )
}

export default Hero
