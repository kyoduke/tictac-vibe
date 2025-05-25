import React from 'react';
import { motion } from 'framer-motion';

const GameControls = ({ 
  onReset, 
  onResetScores, 
  gameMode,
  aiDifficulty,
  onChangeModeToPlayer, 
  onChangeModeToAI,
  onChangeDifficulty
}) => {
  const buttonVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  };

  return (
    <motion.div
      className="flex flex-col gap-4 w-full mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center justify-center bg-primary-light rounded-game p-2 mb-2">
        <button 
          className={`py-2 px-4 rounded-game font-medium border-none cursor-pointer transition-all duration-200 flex-1 text-center
            ${gameMode === 'player' ? 'bg-primary text-white' : 'bg-transparent text-primary-dark hover:bg-primary/20'}`}
          onClick={onChangeModeToPlayer}
        >
          Player vs Player
        </button>
        <button 
          className={`py-2 px-4 rounded-game font-medium border-none cursor-pointer transition-all duration-200 flex-1 text-center
            ${gameMode === 'ai' ? 'bg-primary text-white' : 'bg-transparent text-primary-dark hover:bg-primary/20'}`}
          onClick={onChangeModeToAI}
        >
          Player vs AI
        </button>
      </div>
      
      {gameMode === 'ai' && (
        <motion.div
          className="mt-2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p className="text-sm text-primary-dark mb-1">AI Difficulty</p>
          <div className="flex gap-2 justify-center">
            <button 
              className={`py-1.5 px-3 rounded-game text-sm font-medium border-none cursor-pointer transition-all duration-200
                ${aiDifficulty === 'easy' ? 'bg-primary text-white' : 'bg-primary/10 text-primary-dark hover:bg-primary/20'}`}
              onClick={() => onChangeDifficulty('easy')}
            >
              Easy
            </button>
            <button 
              className={`py-1.5 px-3 rounded-game text-sm font-medium border-none cursor-pointer transition-all duration-200
                ${aiDifficulty === 'medium' ? 'bg-primary text-white' : 'bg-primary/10 text-primary-dark hover:bg-primary/20'}`}
              onClick={() => onChangeDifficulty('medium')}
            >
              Medium
            </button>
            <button 
              className={`py-1.5 px-3 rounded-game text-sm font-medium border-none cursor-pointer transition-all duration-200
                ${aiDifficulty === 'hard' ? 'bg-primary text-white' : 'bg-primary/10 text-primary-dark hover:bg-primary/20'}`}
              onClick={() => onChangeDifficulty('hard')}
            >
              Hard
            </button>
          </div>
        </motion.div>
      )}
      
      <div className="flex justify-center gap-4 flex-wrap">
        <motion.button
          className="py-3 px-6 rounded-game font-medium text-base bg-primary text-white border-none shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm"
          onClick={onReset}
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
          whileTap="whileTap"
          transition={{ delay: 0.5 }}
        >
          New Game
        </motion.button>
        
        <motion.button
          className="py-3 px-6 rounded-game font-medium text-base bg-white text-primary-dark border-2 border-primary hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm"
          onClick={onResetScores}
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
          whileTap="whileTap"
          transition={{ delay: 0.6 }}
        >
          Reset Scores
        </motion.button>
      </div>
    </motion.div>
  );
};

export default GameControls;