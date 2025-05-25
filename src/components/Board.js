import React from 'react';
import { motion } from 'framer-motion';
import Square from './Square';

const Board = ({ squares, onClick, winningLine, disabled }) => {
  // Functions to calculate win line dimensions
  const getWinLineStyles = () => {
    if (!winningLine || winningLine.length === 0) return {};

    const [a, b, c] = winningLine;
    const cellSize = 100; // Matches the CSS var(--cell-size)
    const gap = 10; // Matches the grid-gap
    const padding = 10; // Matches the padding

    // Horizontal win (same row)
    if (Math.floor(a / 3) === Math.floor(b / 3)) {
      const row = Math.floor(a / 3);
      return {
        width: 'calc(100% - 20px)',
        top: `${row * (cellSize + gap) + cellSize / 2 + padding}px`,
        left: `${padding}px`,
      };
    }
    
    // Vertical win (same column)
    if (a % 3 === b % 3) {
      const col = a % 3;
      return {
        width: 'calc(100% - 20px)',
        top: `${padding}px`,
        left: `${col * (cellSize + gap) + cellSize / 2 + padding}px`,
        transform: 'rotate(90deg)',
        transformOrigin: 'left top',
      };
    }
    
    // Diagonal win (top-left to bottom-right)
    if (a === 0 && c === 8) {
      const diagonalLength = Math.sqrt(2) * 100 * 3;
      return {
        width: `${diagonalLength}px`,
        top: `${padding}px`,
        left: `${padding}px`,
        transform: 'rotate(45deg)',
        transformOrigin: 'left top',
      };
    }
    
    // Diagonal win (top-right to bottom-left)
    if (a === 2 && c === 6) {
      const diagonalLength = Math.sqrt(2) * 100 * 3;
      return {
        width: `${diagonalLength}px`,
        top: `${padding}px`,
        right: `${padding}px`,
        transform: 'rotate(-45deg)',
        transformOrigin: 'right top',
      };
    }
    
    return {};
  };

  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinningSquare={winningLine && winningLine.includes(i)}
        index={i}
        disabled={disabled}
      />
    );
  };

  return (
    <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-2.5 my-4 sm:my-6 md:my-8 relative bg-primary-light p-1.5 sm:p-2 md:p-2.5 rounded-game shadow-md">
      {winningLine && winningLine.length > 0 && (
        <motion.div
          className="absolute bg-secondary z-10 h-1.5 sm:h-2 rounded origin-left"
          style={{
            boxShadow: '0 2px 10px rgba(255, 193, 7, 0.5)',
            ...getWinLineStyles()
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />
      )}
      
      {Array(9).fill(null).map((_, i) => renderSquare(i))}
    </div>
  );
};

export default Board;