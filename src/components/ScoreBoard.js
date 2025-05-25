import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ScoreBoardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const ScoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
`;

const ScoreCard = styled(motion.div)`
  background-color: var(--white);
  border-radius: var(--border-radius);
  padding: 0.75rem;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  border: 2px solid ${props => 
    props.type === 'X' 
      ? 'var(--primary-color)' 
      : props.type === 'O' 
        ? 'var(--secondary-color)' 
        : 'var(--primary-light)'
  };
`;

const ScoreLabel = styled.p`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${props => 
    props.type === 'X' 
      ? 'var(--primary-color)' 
      : props.type === 'O' 
        ? 'var(--secondary-color)' 
        : 'var(--text-color)'
  };
`;

const ScoreValue = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
`;

const CurrentTurn = styled(motion.div)`
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-light);
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const TurnText = styled.span`
  font-size: 1rem;
  color: var(--text-color);
`;

const PlayerSymbol = styled.span`
  font-weight: 700;
  font-size: 1.2rem;
  color: ${props => props.player === 'X' ? 'var(--primary-color)' : 'var(--secondary-color)'};
`;

const AIDifficultyBadge = styled(motion.div)`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: var(--secondary-color);
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  text-transform: uppercase;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const PlayerCardWrapper = styled.div`
  position: relative;
`;

const ScoreBoard = ({ scores, currentPlayer, gameMode, aiDifficulty }) => {
  return (
    <ScoreBoardContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <ScoreGrid>
        <ScoreCard 
          type="X"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ScoreLabel type="X">Player X</ScoreLabel>
          <ScoreValue>{scores.X}</ScoreValue>
        </ScoreCard>
        
        <ScoreCard 
          type="tie"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <ScoreLabel type="tie">Ties</ScoreLabel>
          <ScoreValue>{scores.ties}</ScoreValue>
        </ScoreCard>
        
        <PlayerCardWrapper>
          <ScoreCard 
            type="O"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <ScoreLabel type="O">{gameMode === 'ai' ? 'AI' : 'Player O'}</ScoreLabel>
            <ScoreValue>{scores.O}</ScoreValue>
          </ScoreCard>
          
          {gameMode === 'ai' && (
            <AIDifficultyBadge
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
            </AIDifficultyBadge>
          )}
        </PlayerCardWrapper>
      </ScoreGrid>
      
      <CurrentTurn
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        key={currentPlayer} // This forces re-render and animation when player changes
      >
        <TurnText>Current Turn:</TurnText>
        <PlayerSymbol player={currentPlayer}>{currentPlayer}</PlayerSymbol>
      </CurrentTurn>
    </ScoreBoardContainer>
  );
};

export default ScoreBoard;

// Set default props
ScoreBoard.defaultProps = {
  gameMode: 'player',
  aiDifficulty: 'easy'
};