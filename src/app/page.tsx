'use client';
import React from 'react';
import GameControls from './components/GameControls';
import Board from './components/Board';

const HomePage: React.FC = () => {
  return (
    <div className='flex justify-center p-4 bg-gray-100'>
      <div className='w-1/4 bg-white shadow-lg p-4 rounded-lg border border-gray-200'>
        <GameControls />
      </div>
      <div className='w-3/4 bg-white shadow-lg p-4 rounded-lg border border-gray-200 ml-6'>
        <Board />
      </div>
    </div>
  );
};

export default HomePage;
