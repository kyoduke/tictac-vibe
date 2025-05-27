import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Square from "./Square";

const Board = ({ squares, onClick, winningLine, disabled }) => {
  const boardRef = useRef(null);
  const [cellPositions, setCellPositions] = useState([]);
  const [boardDimensions, setBoardDimensions] = useState({ padding: 0 });
  
  // Update cell positions when the board renders or window resizes
  useEffect(() => {
    const updateCellPositions = () => {
      if (!boardRef.current) return;
      
      const boardElement = boardRef.current;
      const cells = boardElement.querySelectorAll('.game-cell');
      const boardRect = boardElement.getBoundingClientRect();
      
      // Get computed padding
      const computedStyle = window.getComputedStyle(boardElement);
      const paddingLeft = parseFloat(computedStyle.paddingLeft);
      
      // Calculate positions for each cell
      const positions = Array.from(cells).map(cell => {
        const rect = cell.getBoundingClientRect();
        return {
          // Calculate center relative to board
          x: rect.left - boardRect.left + rect.width / 2,
          y: rect.top - boardRect.top + rect.height / 2
        };
      });
      
      setCellPositions(positions);
      setBoardDimensions({ padding: paddingLeft });
    };
    
    // Initial calculation
    updateCellPositions();
    
    // Update on window resize
    window.addEventListener('resize', updateCellPositions);
    return () => window.removeEventListener('resize', updateCellPositions);
  }, [winningLine]); // Re-run when winningLine changes
  
  // Calculate start and end points for the winning line
  const getLineCoordinates = () => {
    if (!winningLine || winningLine.length === 0 || !cellPositions.length) return {};
    
    // Use actual measured positions of the cells
    const [a, , c] = winningLine;
    const start = cellPositions[a] || {};
    const end = cellPositions[c] || {};
    
    return {
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y
    };
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
        className="game-cell" // Add this class for measurement
      />
    );
  };

  return (
    <div 
      ref={boardRef}
      className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-2.5 my-4 sm:my-6 md:my-8 relative bg-primary-light p-1.5 sm:p-2 md:p-2.5 rounded-game shadow-md"
    >
      {winningLine && winningLine.length > 0 && cellPositions.length > 0 && (
        <svg className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
          <motion.line
            {...getLineCoordinates()}
            stroke="#FFC107" // Yellow/secondary color
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ 
              filter: "drop-shadow(0 2px 4px rgba(255, 193, 7, 0.5))"
            }}
          />
        </svg>
      )}

      {Array(9)
        .fill(null)
        .map((_, i) => renderSquare(i))}
    </div>
  );
};

export default Board;
