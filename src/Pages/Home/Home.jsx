import React, {} from 'react';
import Banner from '../../Components/Banner/Banner';
import Products from '../../Components/Products/Products';
import AdvertisementCarousel from '../../Components/AdvertisementCarousel/AdvertisementCarousel';


const productsPromise =fetch('http://localhost:3000/products').then(res=>res.json())

const Home = () => {
 

  return (
    <div>
      <Banner />
      <Products productsPromise={productsPromise}></Products>
      <AdvertisementCarousel></AdvertisementCarousel>
    </div>
  );
};

export default Home;
