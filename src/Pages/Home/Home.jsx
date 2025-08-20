import React, {} from 'react';
import Banner from '../../Components/Banner/Banner';
import Products from '../../Components/Products/Products';
import AdvertisementCarousel from '../../Components/AdvertisementCarousel/AdvertisementCarousel';
import TrendingItems from '../../ExtraSection/TrendingItems';
import MarketTips from '../../ExtraSection/MarketTips';
import Review from '../../Components/Review/Review';
import Newsletter from '../../Components/Newsletter/Newsletter';


const productsPromise =fetch('https://local-market-omega.vercel.app/products').then(res=>res.json())

const Home = () => {
 

  return (
    <div>
      <Banner />
      <Products productsPromise={productsPromise}></Products>
      <AdvertisementCarousel></AdvertisementCarousel>
      <TrendingItems></TrendingItems>
      <MarketTips></MarketTips>
      <Review></Review>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
