import React, {} from 'react';
import Banner from '../../Components/Banner/Banner';
import Products from '../../Components/Products/Products';
import AdvertisementCarousel from '../../Components/AdvertisementCarousel/AdvertisementCarousel';
import TrendingItems from '../../ExtraSection/TrendingItems';
import MarketTips from '../../ExtraSection/MarketTips';


const productsPromise =fetch('https://local-market-omega.vercel.app/products').then(res=>res.json())

const Home = () => {
 

  return (
    <div>
      <Banner />
      <Products productsPromise={productsPromise}></Products>
      <AdvertisementCarousel></AdvertisementCarousel>
      <TrendingItems></TrendingItems>
      <MarketTips></MarketTips>
    </div>
  );
};

export default Home;
