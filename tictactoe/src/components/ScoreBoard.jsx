import React from 'react';
import { motion } from 'framer-motion';

const ScoreBoard = ({ scores, currentPlayer, gameMode, aiDifficulty, isAIThinking }) => {
  return (
    <motion.div
      className="flex flex-col items-center mb-3 sm:mb-4 md:mb-6 w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full mt-2 sm:mt-3 md:mt-4">
        <motion.div 
          className="bg-white rounded-game p-1.5 sm:p-2 md:p-3 text-center shadow-sm border-2 border-primary"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xs sm:text-sm md:text-base font-medium mb-1 sm:mb-2 text-primary">Player X</p>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-text">{scores.X}</p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-game p-1.5 sm:p-2 md:p-3 text-center shadow-sm border-2 border-primary-light"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xs sm:text-sm md:text-base font-medium mb-1 sm:mb-2 text-text">Ties</p>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-text">{scores.ties}</p>
        </motion.div>
        
        <div className="relative">
          <motion.div 
            className="bg-white rounded-game p-1.5 sm:p-2 md:p-3 text-center shadow-sm border-2 border-secondary"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xs sm:text-sm md:text-base font-medium mb-1 sm:mb-2 text-secondary">{gameMode === 'ai' ? 'AI' : 'Player O'}</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-text">{scores.O}</p>
          </motion.div>
          
          {gameMode === 'ai' && (
            <motion.div
              className="absolute -top-2 sm:-top-2.5 -right-2 sm:-right-2.5 bg-secondary text-white text-[10px] sm:text-xs font-bold py-0.5 px-1 rounded uppercase shadow-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 500,
                damping: 15,
                delay: 0.6 
              }}
            >
              {aiDifficulty}
            </motion.div>
          )}
        </div>
      </div>
      
      <motion.div
        className="mt-3 sm:mt-4 md:mt-6 py-1.5 sm:py-2 md:py-3 px-3 sm:px-4 md:px-6 bg-primary-light rounded-game flex items-center justify-center gap-1 sm:gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        key={currentPlayer} // This forces re-render and animation when player changes
      >
        <span className="text-xs sm:text-sm md:text-base text-text">Current Turn:</span>
        <span className={`font-bold text-sm sm:text-base md:text-lg ${currentPlayer === 'X' ? 'text-primary' : 'text-secondary'}`}>
          {currentPlayer}
          {gameMode === 'ai' && currentPlayer === 'O' && isAIThinking && 
            <span className="ml-2 inline-block">
              <span className="inline-block w-1 sm:w-1.5 h-1 sm:h-1.5 bg-secondary rounded-full animate-pulse mr-0.5"></span>
              <span className="inline-block w-1 sm:w-1.5 h-1 sm:h-1.5 bg-secondary rounded-full animate-pulse delay-75 mr-0.5"></span>
              <span className="inline-block w-1 sm:w-1.5 h-1 sm:h-1.5 bg-secondary rounded-full animate-pulse delay-150"></span>
            </span>
          }
        </span>
      </motion.div>
    </motion.div>
  );
};

export default ScoreBoard;

// Set default props
ScoreBoard.defaultProps = {
  gameMode: 'player',
  aiDifficulty: 'easy',
  isAIThinking: false
};