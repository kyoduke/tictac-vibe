import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import GameControls from './components/GameControls';
import WinnerModal from './components/WinnerModal';

const AppContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  gap: 2rem;
  background-color: var(--background-color);
`;

const Title = styled(motion.h1)`
  color: var(--primary-color);
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const GameContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--white);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 90vw;
`;

const Footer = styled.footer`
  margin-top: 2rem;
  text-align: center;
  color: var(--text-color);
  font-size: 0.9rem;
`;

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameHistory, setGameHistory] = useState([]);
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [gameMode, setGameMode] = useState('player'); // 'player' or 'ai'
  const [aiDifficulty, setAIDifficulty] = useState('easy'); // 'easy', 'medium', or 'hard'

  // Calculate winner
  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      const { winner, line } = result;
      setWinner(winner);
      setWinningLine(line);
      
      // Update scores
      if (winner === 'X' || winner === 'O') {
        setScores(prevScores => ({
          ...prevScores,
          [winner]: prevScores[winner] + 1
        }));
      } else if (winner === 'tie') {
        setScores(prevScores => ({
          ...prevScores,
          ties: prevScores.ties + 1
        }));
      }
      
      // Show modal with a slight delay to allow animations to complete
      setTimeout(() => {
        setShowModal(true);
      }, 800);
    }
  }, [board]);

  // AI move
  useEffect(() => {
    if (gameMode === 'ai' && !xIsNext && !winner) {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, winner, gameMode]);

  const makeAIMove = () => {
    const emptySquares = board.map((square, i) => square === null ? i : null).filter(val => val !== null);
    
    if (emptySquares.length > 0) {
      let aiMove;
      
      switch (aiDifficulty) {
        case 'easy':
          // Easy - Random move
          const randomIndex = Math.floor(Math.random() * emptySquares.length);
          aiMove = emptySquares[randomIndex];
          break;
          
        case 'medium':
          // Medium - Mix of random and strategic
          // 50% chance to make a smart move, 50% chance to make a random move
          if (Math.random() > 0.5) {
            aiMove = findBestMove(board, 'O', 1); // Only look one move ahead
          } else {
            const randomIdx = Math.floor(Math.random() * emptySquares.length);
            aiMove = emptySquares[randomIdx];
          }
          break;
          
        case 'hard':
          // Hard - Strategic AI using minimax
          aiMove = findBestMove(board, 'O', 3); // Look three moves ahead
          break;
          
        default:
          // Default to random
          const idx = Math.floor(Math.random() * emptySquares.length);
          aiMove = emptySquares[idx];
      }
      
      handleClick(aiMove);
    }
  };
  
  // Minimax algorithm for AI
  const minimax = (board, depth, isMaximizing, alpha = -Infinity, beta = Infinity) => {
    // Terminal states
    const result = calculateWinner(board);
    
    if (result) {
      if (result.winner === 'O') return 10 - depth; // AI wins
      if (result.winner === 'X') return depth - 10; // Player wins
      if (result.winner === 'tie') return 0; // Tie
    }
    
    // Maximum depth reached
    if (depth === 0) {
      return evaluateBoard(board);
    }
    
    const emptySquares = board.map((square, i) => square === null ? i : null).filter(val => val !== null);
    
    if (isMaximizing) {
      // AI's turn (O)
      let maxEval = -Infinity;
      
      for (let i = 0; i < emptySquares.length; i++) {
        const index = emptySquares[i];
        const boardCopy = [...board];
        boardCopy[index] = 'O';
        
        const evaluation = minimax(boardCopy, depth - 1, false, alpha, beta);
        maxEval = Math.max(maxEval, evaluation);
        
        // Alpha-beta pruning
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) break;
      }
      
      return maxEval;
    } else {
      // Player's turn (X)
      let minEval = Infinity;
      
      for (let i = 0; i < emptySquares.length; i++) {
        const index = emptySquares[i];
        const boardCopy = [...board];
        boardCopy[index] = 'X';
        
        const evaluation = minimax(boardCopy, depth - 1, true, alpha, beta);
        minEval = Math.min(minEval, evaluation);
        
        // Alpha-beta pruning
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) break;
      }
      
      return minEval;
    }
  };
  
  // Find the best move for AI using minimax
  const findBestMove = (board, player, depth) => {
    const emptySquares = board.map((square, i) => square === null ? i : null).filter(val => val !== null);
    let bestMove = -1;
    let bestValue = -Infinity;
    
    for (let i = 0; i < emptySquares.length; i++) {
      const index = emptySquares[i];
      const boardCopy = [...board];
      boardCopy[index] = player;
      
      const moveValue = minimax(boardCopy, depth, player === 'X');
      
      if (moveValue > bestValue) {
        bestValue = moveValue;
        bestMove = index;
      }
    }
    
    return bestMove !== -1 ? bestMove : emptySquares[0];
  };
  
  // Simple board evaluation heuristic for AI
  const evaluateBoard = (board) => {
    // Check rows, columns, and diagonals for potential wins/blocks
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    let score = 0;
    
    for (const line of lines) {
      const [a, b, c] = line;
      const cells = [board[a], board[b], board[c]];
      
      // Count X's and O's in each line
      const xCount = cells.filter(cell => cell === 'X').length;
      const oCount = cells.filter(cell => cell === 'O').length;
      
      // Scoring based on potential winning positions
      if (oCount === 2 && xCount === 0) score += 3; // AI can win next move
      if (oCount === 1 && xCount === 0) score += 1; // Potential future win for AI
      if (xCount === 2 && oCount === 0) score -= 2; // Block opponent from winning
    }
    
    // Prefer center position
    if (board[4] === 'O') score += 1;
    
    return score;
  };

  const handleClick = (i) => {
    // If square is already filled or game has a winner, do nothing
    if (board[i] || winner) return;
    
    // Create a copy of the board
    const boardCopy = [...board];
    boardCopy[i] = xIsNext ? 'X' : 'O';
    
    // Update board state
    setBoard(boardCopy);
    
    // Update turn
    setXIsNext(!xIsNext);
    
    // Add to game history
    setGameHistory(prev => [...prev, { board: boardCopy, move: i }]);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinningLine([]);
    setShowModal(false);
    setGameHistory([]);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0, ties: 0 });
  };

  const changeGameMode = (mode) => {
    setGameMode(mode);
    resetGame();
  };
  
  const changeDifficulty = (difficulty) => {
    setAIDifficulty(difficulty);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    // Check for winner
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    
    // Check for tie
    if (squares.every(square => square !== null)) {
      return { winner: 'tie', line: [] };
    }
    
    return null;
  };

  return (
    <AppContainer 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <Title 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.2, type: 'spring' }}
      >
        Tic Tac Toe
      </Title>
      
      <GameContainer 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ delay: 0.3, type: 'spring' }}
      >
        <ScoreBoard 
          scores={scores} 
          currentPlayer={xIsNext ? 'X' : 'O'} 
          gameMode={gameMode}
          aiDifficulty={aiDifficulty}
        />
        
        <Board 
          squares={board} 
          onClick={handleClick}
          winningLine={winningLine}
        />
        
        <GameControls 
          onReset={resetGame} 
          onResetScores={resetScores}
          gameMode={gameMode}
          aiDifficulty={aiDifficulty}
          onChangeModeToPlayer={() => changeGameMode('player')}
          onChangeModeToAI={() => changeGameMode('ai')}
          onChangeDifficulty={changeDifficulty}
        />
      </GameContainer>
      
      <AnimatePresence>
        {showModal && (
          <WinnerModal 
            winner={winner} 
            onClose={() => setShowModal(false)} 
            onPlayAgain={resetGame}
            gameMode={gameMode}
            aiDifficulty={aiDifficulty}
          />
        )}
      </AnimatePresence>
      
      <Footer>
        <p>© {new Date().getFullYear()} Animated Tic Tac Toe</p>
      </Footer>
    </AppContainer>
  );
}

export default App;