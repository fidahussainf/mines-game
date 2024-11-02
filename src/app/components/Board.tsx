import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { revealAllCells, revealCell } from '../store/game';
import { RootState } from '../store';
import Modal from './Modal';
import { FaBomb, FaGem } from 'react-icons/fa';

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const grid = useSelector((state: RootState) => state.minesBet.grid);
  const gameActive = useSelector(
    (state: RootState) => state.minesBet.disableCells
  );

  const [showModal, setShowModal] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);

  const handleCellClick = (id: number) => {
    if (gameActive) return; 
    dispatch(revealCell(id));
    const clickedCell = grid.find((cell) => cell.id === id);
    if (clickedCell && clickedCell.isMine) {
      dispatch(revealAllCells());
      setIsGameLost(true);
      setShowModal(true);
    }
  };

  return (
    <div className='grid grid-cols-6 gap-4 justify-items-center'>
      {showModal && (
        <Modal isGameLost={isGameLost} onClose={() => setShowModal(false)} />
      )}
      {grid.map((cell) => (
        <div
          key={cell.id}
          onClick={() => handleCellClick(cell.id)}
          className={`w-16 h-16 flex items-center justify-center border border-gray-300 cursor-pointer ${
            cell.status === 'revealed' ? 'bg-gray-200' : 'bg-gray-600'
          } ${gameActive && 'cursor-not-allowed opacity-50'}`}
        >
          {cell.status === 'revealed' &&
            (cell.isMine ? (
              <FaBomb className='text-red-500' />
            ) : (
              <FaGem className='text-yellow-500' />
            ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
