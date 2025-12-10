import React from 'react';
import Navbar from '../components/Navbar'
import Header from '../components/Header';

const Home = () => {
  return (
    <div className='bg-[linear-gradient(90deg,#98989052_0%,#29232900_34%,#60858900_50%,#29232900_71%,#2923294A_100%)] min-h-screen'>
      <Navbar />
      <Header />
    </div>
  );
};

export default Home;