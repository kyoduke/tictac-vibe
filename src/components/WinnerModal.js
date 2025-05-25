import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled(motion.div)`
  background-color: var(--white);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 90%;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalTitle = styled(motion.h2)`
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.8rem;
`;

const WinnerDisplay = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const WinnerSymbol = styled(motion.div)`
  font-size: 4rem;
  font-weight: bold;
  margin: 1rem 0;
  color: ${props => 
    props.winner === 'X' 
      ? 'var(--primary-color)' 
      : props.winner === 'O' 
        ? 'var(--secondary-color)' 
        : 'var(--text-color)'
  };
`;

const WinnerText = styled(motion.p)`
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 1rem;
`;

const AIDifficultyText = styled(motion.p)`
  font-size: 0.9rem;
  color: var(--primary-dark);
  margin-bottom: 1rem;
  padding: 0.3rem 0.6rem;
  background-color: rgba(76, 175, 80, 0.1);
  border-radius: var(--border-radius);
  text-transform: capitalize;
  display: inline-block;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
`;

const PrimaryButton = styled(Button)`
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: var(--primary-dark);
  border: 2px solid var(--primary-color);
  
  &:hover {
    background-color: rgba(76, 175, 80, 0.1);
  }
`;

const Confetti = styled(motion.div)`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

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

  // Generate random confetti for winner celebration
  const confetti = Array.from({ length: 50 }).map((_, i) => {
    const colors = ['#4CAF50', '#A5D6A7', '#FFC107', '#81C784', '#FFD54F'];
    return (
      <Confetti
        key={i}
        color={colors[Math.floor(Math.random() * colors.length)]}
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
        style={{
          top: '50%',
          left: '50%'
        }}
      />
    );
  });

  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {winner !== 'tie' && confetti}
        
        <ModalContent
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={e => e.stopPropagation()}
        >
          <ModalTitle
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            Game Over
          </ModalTitle>
          
          <WinnerDisplay>
            {winner !== 'tie' ? (
              <WinnerSymbol 
                winner={winner}
                variants={symbolVariants}
                initial="hidden"
                animate="visible"
              >
                {winner}
              </WinnerSymbol>
            ) : (
              <WinnerSymbol 
                winner={winner}
                variants={symbolVariants}
                initial="hidden"
                animate="visible"
              >
                =
              </WinnerSymbol>
            )}
            
            <WinnerText
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.4 } }}
            >
              {getWinnerMessage()}
            </WinnerText>
            
            {gameMode === 'ai' && (winner === 'O' || winner === 'tie') && (
              <AIDifficultyText
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
              >
                AI Difficulty: {aiDifficulty}
              </AIDifficultyText>
            )}
          </WinnerDisplay>
          
          <ButtonsContainer>
            <PrimaryButton
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={onPlayAgain}
            >
              Play Again
            </PrimaryButton>
            
            <SecondaryButton
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={onClose}
            >
              Close
            </SecondaryButton>
          </ButtonsContainer>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

export default WinnerModal;

// Set default props
WinnerModal.defaultProps = {
  gameMode: 'player',
  aiDifficulty: 'easy'
};