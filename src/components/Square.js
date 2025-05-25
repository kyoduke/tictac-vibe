import React from 'react';
import { motion } from 'framer-motion';

const Square = ({ value, onClick, isWinningSquare, index, disabled }) => {
  const variants = {
    hidden: { 
      scale: 0, 
      opacity: 0 
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15,
        delay: index * 0.05
      }
    }
  };

  const xLineVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { 
        duration: 0.3,
        delay: 0.1
      }
    }
  };

  const oVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 200,
        damping: 10,
        delay: 0.1
      }
    }
  };

  // Define color based on value
  const textColor = value === 'X' 
    ? 'text-primary' 
    : value === 'O' 
      ? 'text-secondary' 
      : 'text-transparent';

  // Define background based on winning state
  const bgColor = isWinningSquare ? 'bg-primary-light animate-winner-pulse' : 'bg-white';
  
  // Define cursor style based on disabled state
  const cursorStyle = disabled ? 'cursor-not-allowed' : 'cursor-pointer';
  // Define opacity based on disabled state
  const opacity = disabled && !value ? 'opacity-70' : 'opacity-100';

  return (
    <motion.button 
      onClick={disabled ? null : onClick}
      className={`w-[100px] h-[100px] ${bgColor} border-none rounded-game text-4xl font-bold ${cursorStyle} flex items-center justify-center shadow-md ${textColor} transition-all duration-200 ${opacity}`}
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: value ? 1.02 : 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {value === 'X' && (
        <span className="relative inline-block w-3/5 h-3/5">
          <motion.div 
            className="absolute top-1/2 left-0 w-full h-2.5 bg-primary rounded-sm transform -translate-y-1/2 rotate-45"
            variants={xLineVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.div 
            className="absolute top-1/2 left-0 w-full h-2.5 bg-primary rounded-sm transform -translate-y-1/2 -rotate-45"
            variants={xLineVariants}
            initial="hidden"
            animate="visible"
          />
        </span>
      )}
      
      {value === 'O' && (
        <motion.div 
          className="w-3/5 h-3/5 border-[10px] border-secondary rounded-full"
          variants={oVariants}
          initial="hidden"
          animate="visible"
        />
      )}
    </motion.button>
  );
};

export default Square;

// Set default props
Square.defaultProps = {
  disabled: false
};