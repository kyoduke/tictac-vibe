import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SquareButton = styled(motion.button)`
  width: var(--cell-size);
  height: var(--cell-size);
  background-color: var(--white);
  border: none;
  border-radius: var(--border-radius);
  font-size: 2.5rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: ${props => 
    props.value === 'X' 
      ? 'var(--primary-color)' 
      : props.value === 'O' 
        ? 'var(--secondary-color)' 
        : 'transparent'
  };
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: ${props => props.value ? 'scale(1.02)' : 'scale(1.05)'};
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  ${props => props.isWinningSquare && `
    background-color: var(--primary-light);
    animation: winner-pulse 1.5s infinite;
  `}
`;

const X = styled(motion.span)`
  position: relative;
  display: inline-block;
  width: 60%;
  height: 60%;
`;

const XLine1 = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: var(--primary-color);
  border-radius: 5px;
  transform: translateY(-50%) rotate(45deg);
`;

const XLine2 = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: var(--primary-color);
  border-radius: 5px;
  transform: translateY(-50%) rotate(-45deg);
`;

const O = styled(motion.div)`
  width: 60%;
  height: 60%;
  border: 10px solid var(--secondary-color);
  border-radius: 50%;
`;

const Square = ({ value, onClick, isWinningSquare, index }) => {
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

  return (
    <SquareButton 
      onClick={onClick} 
      value={value}
      isWinningSquare={isWinningSquare}
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: value ? 1.02 : 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {value === 'X' && (
        <X>
          <XLine1 
            variants={xLineVariants}
            initial="hidden"
            animate="visible"
          />
          <XLine2 
            variants={xLineVariants}
            initial="hidden"
            animate="visible"
          />
        </X>
      )}
      
      {value === 'O' && (
        <O 
          variants={oVariants}
          initial="hidden"
          animate="visible"
        />
      )}
    </SquareButton>
  );
};

export default Square;