import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startGame,
  cashOut,
  setBetAmount,
  setMineCount,
  revealAllCells,
} from '../store/game';
import { RootState } from '../store';
import Modal from './Modal';

const GameControls: React.FC = () => {
  const {
    currentPayout,
    currentMultiplier,
    cashOut: canCashOut,
    maxBetAmount,
    betAmount,
    mines,
  } = useSelector((state: RootState) => state.minesBet);

  const dispatch = useDispatch();
  const [betInput, setBetInput] = useState(betAmount);
  const [mineInput, setMineInput] = useState(mines);
  const [showModal, setShowModal] = useState(false);
  const [isBetFocused, setIsBetFocused] = useState(false);
  const [isMineFocused, setIsMineFocused] = useState(false);

  useEffect(() => {
    setBetInput(betAmount);
  }, [betAmount]);

  useEffect(() => {
    setMineInput(mines);
  }, [mines]);

  const handleBetChange = (value: number) => {
    if (value >= 1 && value <= maxBetAmount) {
      setBetInput(value);
      dispatch(setBetAmount(value));
    }
  };

  const handleMineCountChange = (value: number) => {
    if (value >= 1 && value <= 23) {
      setMineInput(value);
      dispatch(setMineCount(value));
    }
  };

  const handleCashOut = () => {
    dispatch(cashOut());
    dispatch(revealAllCells());
    setShowModal(true);
  };

  const calculateNextPayout = (bet: number, multiplier: number) => {
    return bet * multiplier;
  };

  return (
    <div className='space-y-3 px-2'>
      <h2 className='text-2xl font-semibold text-gray-800'>Mines Game</h2>
      <p className='text-lg text-gray-700'>
        Remaining Gems:{' '}
        <span className='font-bold text-green-600'>{24 - mines}</span>
      </p>
      <div className='space-y-4'>
        <label className='block text-gray-700'>
          Bet Amount:
          <input
            type='number'
            value={betInput}
            onChange={(e) => handleBetChange(Number(e.target.value))}
            onFocus={() => setIsBetFocused(true)}
            onBlur={() => setIsBetFocused(false)}
            min={1}
            max={maxBetAmount}
            className={`mt-2 p-2 border rounded-md w-full ${
              isBetFocused ? 'border-blue-500' : 'border-gray-400'
            }`}
          />
        </label>
        <div className='flex items-center'>
          <input
            type='range'
            min={1}
            max={maxBetAmount}
            value={betInput}
            onChange={(e) => handleBetChange(Number(e.target.value))}
            className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
          />
        </div>

        <label className='block text-gray-700'>
          Mine Count:
          <input
            type='number'
            value={mineInput}
            onChange={(e) => handleMineCountChange(Number(e.target.value))}
            onFocus={() => setIsMineFocused(true)}
            onBlur={() => setIsMineFocused(false)}
            min={1}
            max={23}
            className={`mt-2 p-2 border rounded-md w-full ${
              isMineFocused ? 'border-blue-500' : 'border-gray-400'
            }`}
          />
        </label>

        <label className='block text-gray-700'>
          Next Payout: $
          {calculateNextPayout(betInput, currentMultiplier).toFixed(2)}
        </label>
      </div>

      {canCashOut ? (
        <button
          onClick={handleCashOut}
          className='w-full bg-green-600 text-white rounded-md p-2'
        >
          Cash Out: ${currentPayout?.toFixed(2)}
        </button>
      ) : (
        <button
          onClick={() => dispatch(startGame())}
          className='w-full bg-blue-600 text-white rounded-md p-2'
        >
          Play
        </button>
      )}
      {showModal && (
        <Modal amount={currentPayout} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default GameControls;
