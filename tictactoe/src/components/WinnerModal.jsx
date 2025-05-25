import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WinnerModal = ({ winner, onClose, onPlayAgain, gameMode, aiDifficulty }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { 
        duration: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.2,
        duration: 0.5
      }
    }
  };

  const symbolVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: 'spring',
        stiffness: 200,
        damping: 10,
        delay: 0.3
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.5,
        duration: 0.3
      }
    },
    hover: { 
      scale: 1.05,
      transition: { 
        duration: 0.2
      }
    },
    tap: { 
      scale: 0.95
    }
  };

  const getWinnerMessage = () => {
    if (winner === 'tie') {
      return "It's a Draw!";
    } else if (winner === 'O' && gameMode === 'ai') {
      return 'AI Wins!';
    } else {
      return `Player ${winner} Wins!`;
    }
  };

  // Get color for winner symbol
  const getWinnerColor = () => {
    if (winner === 'X') return 'text-primary';
    if (winner === 'O') return 'text-secondary';
    return 'text-text';
  };

  // Generate random confetti for winner celebration
  const confetti = Array.from({ length: 50 }).map((_, i) => {
    const colors = ['#4CAF50', '#A5D6A7', '#FFC107', '#81C784', '#FFD54F'];
    return (
      <motion.div
        key={i}
        className="absolute w-2.5 h-2.5 rounded-full"
        style={{
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          top: '50%',
          left: '50%'
        }}
        initial={{
          x: 0,
          y: 0,
          opacity: 1
        }}
        animate={{
          x: Math.random() * 500 - 250,
          y: Math.random() * 500 - 100,
          opacity: 0,
          scale: Math.random() * 3
        }}
        transition={{
          duration: Math.random() * 2 + 1,
          ease: "easeOut"
        }}
      />
    );
  });

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {winner !== 'tie' && confetti}
        
        <motion.div
          className="bg-white rounded-game p-4 sm:p-6 md:p-8 shadow-xl text-center max-w-[95%] w-full sm:w-[350px] md:w-[400px] flex flex-col items-center"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={e => e.stopPropagation()}
        >
          <motion.h2
            className="text-primary text-2xl sm:text-2xl md:text-3xl mb-2 sm:mb-3 md:mb-4"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            Game Over
          </motion.h2>
          
          <div className="flex flex-col items-center mb-4 sm:mb-6 md:mb-8">
            {winner !== 'tie' ? (
              <motion.div 
                className={`text-4xl sm:text-5xl md:text-6xl font-bold my-2 sm:my-3 md:my-4 ${getWinnerColor()}`}
                variants={symbolVariants}
                initial="hidden"
                animate="visible"
              >
                {winner}
              </motion.div>
            ) : (
              <motion.div 
                className="text-4xl sm:text-5xl md:text-6xl font-bold my-2 sm:my-3 md:my-4 text-text"
                variants={symbolVariants}
                initial="hidden"
                animate="visible"
              >
                =
              </motion.div>
            )}
            
            <motion.p
              className="text-base sm:text-lg md:text-xl text-text mb-2 sm:mb-3 md:mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.4 } }}
            >
              {getWinnerMessage()}
            </motion.p>
            
            {gameMode === 'ai' && (winner === 'O' || winner === 'tie') && (
              <motion.p
                className="text-xs sm:text-sm text-primary-dark mb-2 sm:mb-3 md:mb-4 py-1 sm:py-1.5 px-2 sm:px-3 bg-primary/10 rounded-game capitalize inline-block"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
              >
                AI Difficulty: {aiDifficulty}
              </motion.p>
            )}
          </div>
          
          <div className="flex gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4">
            <motion.button
              className="py-1.5 sm:py-2 md:py-3 px-3 sm:px-4 md:px-6 rounded-game font-medium text-xs sm:text-sm md:text-base bg-primary text-white border-none shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={onPlayAgain}
            >
              Play Again
            </motion.button>
            
            <motion.button
              className="py-1.5 sm:py-2 md:py-3 px-3 sm:px-4 md:px-6 rounded-game font-medium text-xs sm:text-sm md:text-base bg-transparent text-primary-dark border-2 border-primary hover:bg-primary/10"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={onClose}
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WinnerModal;

// Set default props
WinnerModal.defaultProps = {
  gameMode: 'player',
  aiDifficulty: 'easy'
};