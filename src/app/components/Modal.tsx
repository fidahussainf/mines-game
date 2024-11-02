import React from 'react';

interface CashOutModalProps {
  amount?: number;
  isGameLost?: boolean;
  currentMultiplier?: number;
  onClose: () => void;
}

const Modal: React.FC<CashOutModalProps> = ({
  amount,
  isGameLost,
  currentMultiplier,
  onClose,
}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-4 rounded-lg shadow-lg'>
        <h2 className='text-xl font-semibold'>Game Over</h2>
        {isGameLost ? (
          <p className='text-red-600'>You hit a mine! Game Over.</p>
        ) : (
          <>
            <p className='text-lg'>
              You cashed out: <strong>${amount?.toFixed(2)}</strong>
            </p>           
          </>
        )}
        <button
          onClick={onClose}
          className='mt-4 bg-blue-600 text-white rounded-md p-2'
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
