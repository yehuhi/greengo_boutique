import React from 'react';
import Hero from '../Components/Hero/Hero';
import Hero2 from '../Components/Hero2/Hero2';
import Hero3 from '../Components/Hero3/Hero3';
import Hero4 from '../Components/Hero4/Hero4';
import Footer from '../Components/Footer/Footer';
import './New.css';

const New = () => {
  return (
    <div className="new-cont">
      <Hero />
      <Hero />
      <Hero />
      {/* <Hero2/>
      <Hero3/>
      <Hero4/> */}
      <Footer />
    </div>
  );
};

export default New;
