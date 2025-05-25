import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ControlsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 1.5rem;
`;

const ButtonsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const GameButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
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

const PrimaryButton = styled(GameButton)`
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
`;

const SecondaryButton = styled(GameButton)`
  background-color: var(--white);
  color: var(--primary-dark);
  border: 2px solid var(--primary-color);
`;

const ModeToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-light);
  border-radius: var(--border-radius);
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ModeButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  text-align: center;
  
  background-color: ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.active ? 'var(--white)' : 'var(--primary-dark)'};
  
  &:hover {
    background-color: ${props => props.active ? 'var(--primary-color)' : 'rgba(76, 175, 80, 0.2)'};
  }
`;

const DifficultyContainer = styled(motion.div)`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const DifficultyLabel = styled.p`
  font-size: 0.9rem;
  color: var(--primary-dark);
  margin-bottom: 0.25rem;
`;

const DifficultyOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`;

const DifficultyButton = styled.button`
  padding: 0.4rem 0.8rem;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  background-color: ${props => props.active ? 'var(--primary-color)' : 'rgba(76, 175, 80, 0.1)'};
  color: ${props => props.active ? 'var(--white)' : 'var(--primary-dark)'};
  
  &:hover {
    background-color: ${props => props.active ? 'var(--primary-color)' : 'rgba(76, 175, 80, 0.2)'};
  }
`;

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
    <ControlsContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <ModeToggleContainer>
        <ModeButton 
          active={gameMode === 'player'} 
          onClick={onChangeModeToPlayer}
        >
          Player vs Player
        </ModeButton>
        <ModeButton 
          active={gameMode === 'ai'} 
          onClick={onChangeModeToAI}
        >
          Player vs AI
        </ModeButton>
      </ModeToggleContainer>
      
      {gameMode === 'ai' && (
        <DifficultyContainer
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <DifficultyLabel>AI Difficulty</DifficultyLabel>
          <DifficultyOptions>
            <DifficultyButton 
              active={aiDifficulty === 'easy'} 
              onClick={() => onChangeDifficulty('easy')}
            >
              Easy
            </DifficultyButton>
            <DifficultyButton 
              active={aiDifficulty === 'medium'} 
              onClick={() => onChangeDifficulty('medium')}
            >
              Medium
            </DifficultyButton>
            <DifficultyButton 
              active={aiDifficulty === 'hard'} 
              onClick={() => onChangeDifficulty('hard')}
            >
              Hard
            </DifficultyButton>
          </DifficultyOptions>
        </DifficultyContainer>
      )}
      
      <ButtonsRow>
        <PrimaryButton
          onClick={onReset}
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
          whileTap="whileTap"
          transition={{ delay: 0.5 }}
        >
          New Game
        </PrimaryButton>
        
        <SecondaryButton
          onClick={onResetScores}
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
          whileTap="whileTap"
          transition={{ delay: 0.6 }}
        >
          Reset Scores
        </SecondaryButton>
      </ButtonsRow>
    </ControlsContainer>
  );
};

export default GameControls;