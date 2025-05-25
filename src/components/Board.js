import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Square from './Square';

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  margin: 30px 0;
  position: relative;
  background-color: var(--primary-light);
  padding: 10px;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const WinLine = styled(motion.div)`
  position: absolute;
  background-color: var(--secondary-color);
  z-index: 1;
  transform-origin: left center;
  height: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(255, 193, 7, 0.5);
`;

const Board = ({ squares, onClick, winningLine }) => {
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
      />
    );
  };

  return (
    <BoardContainer>
      {winningLine && winningLine.length > 0 && (
        <WinLine
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={getWinLineStyles()}
        />
      )}
      
      {Array(9).fill(null).map((_, i) => renderSquare(i))}
    </BoardContainer>
  );
};

export default Board;