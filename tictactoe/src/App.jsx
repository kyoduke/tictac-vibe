import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import GameControls from "./components/GameControls";
import WinnerModal from "./components/WinnerModal";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameHistory, setGameHistory] = useState([]);
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [gameMode, setGameMode] = useState("player"); // 'player' or 'ai'
  const [aiDifficulty, setAIDifficulty] = useState("easy"); // 'easy', 'medium', or 'hard'
  const [isAIThinking, setIsAIThinking] = useState(false); // Track if AI is making a move

  // Calculate winner
  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      const { winner, line } = result;
      setWinner(winner);
      setWinningLine(line);

      // Update scores
      if (winner === "X" || winner === "O") {
        setScores((prevScores) => ({
          ...prevScores,
          [winner]: prevScores[winner] + 1,
        }));
      } else if (winner === "tie") {
        setScores((prevScores) => ({
          ...prevScores,
          ties: prevScores.ties + 1,
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
    if (gameMode === "ai" && !xIsNext && !winner) {
      setIsAIThinking(true); // Mark AI as thinking
      const timer = setTimeout(() => {
        makeAIMove();
        setIsAIThinking(false); // AI finished thinking
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, winner, gameMode]);

  const makeAIMove = () => {
    const emptySquares = board
      .map((square, i) => (square === null ? i : null))
      .filter((val) => val !== null);

    if (emptySquares.length > 0) {
      let aiMove;

      switch (aiDifficulty) {
        case "easy":
          // Easy - Random move
          const randomIndex = Math.floor(Math.random() * emptySquares.length);
          aiMove = emptySquares[randomIndex];
          break;

        case "medium":
          // Medium - Mix of random and strategic
          // 50% chance to make a smart move, 50% chance to make a random move
          if (Math.random() > 0.5) {
            aiMove = findBestMove(board, "O", 1); // Only look one move ahead
          } else {
            const randomIdx = Math.floor(Math.random() * emptySquares.length);
            aiMove = emptySquares[randomIdx];
          }
          break;

        case "hard":
          // Hard - Strategic AI using minimax
          aiMove = findBestMove(board, "O", 3); // Look three moves ahead
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
  const minimax = (
    board,
    depth,
    isMaximizing,
    alpha = -Infinity,
    beta = Infinity,
  ) => {
    // Terminal states
    const result = calculateWinner(board);

    if (result) {
      if (result.winner === "O") return 10 - depth; // AI wins
      if (result.winner === "X") return depth - 10; // Player wins
      if (result.winner === "tie") return 0; // Tie
    }

    // Maximum depth reached
    if (depth === 0) {
      return evaluateBoard(board);
    }

    const emptySquares = board
      .map((square, i) => (square === null ? i : null))
      .filter((val) => val !== null);

    if (isMaximizing) {
      // AI's turn (O)
      let maxEval = -Infinity;

      for (let i = 0; i < emptySquares.length; i++) {
        const index = emptySquares[i];
        const boardCopy = [...board];
        boardCopy[index] = "O";

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
        boardCopy[index] = "X";

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
    const emptySquares = board
      .map((square, i) => (square === null ? i : null))
      .filter((val) => val !== null);
    let bestMove = -1;
    let bestValue = -Infinity;

    for (let i = 0; i < emptySquares.length; i++) {
      const index = emptySquares[i];
      const boardCopy = [...board];
      boardCopy[index] = player;

      const moveValue = minimax(boardCopy, depth, player === "X");

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
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    let score = 0;

    for (const line of lines) {
      const [a, b, c] = line;
      const cells = [board[a], board[b], board[c]];

      // Count X's and O's in each line
      const xCount = cells.filter((cell) => cell === "X").length;
      const oCount = cells.filter((cell) => cell === "O").length;

      // Scoring based on potential winning positions
      if (oCount === 2 && xCount === 0) score += 3; // AI can win next move
      if (oCount === 1 && xCount === 0) score += 1; // Potential future win for AI
      if (xCount === 2 && oCount === 0) score -= 2; // Block opponent from winning
    }

    // Prefer center position
    if (board[4] === "O") score += 1;

    return score;
  };

  const handleClick = (i) => {
    // If square is already filled, game has a winner, or AI is thinking, do nothing
    if (board[i] || winner || (gameMode === "ai" && !xIsNext && isAIThinking))
      return;

    // Create a copy of the board
    const boardCopy = [...board];
    boardCopy[i] = xIsNext ? "X" : "O";

    // Update board state
    setBoard(boardCopy);

    // Update turn
    setXIsNext(!xIsNext);

    // Add to game history
    setGameHistory((prev) => [...prev, { board: boardCopy, move: i }]);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinningLine([]);
    setShowModal(false);
    setGameHistory([]);
    setIsAIThinking(false);
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
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    // Check for winner
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: lines[i] };
      }
    }

    // Check for tie
    if (squares.every((square) => square !== null)) {
      return { winner: "tie", line: [] };
    }

    return null;
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 gap-4 sm:gap-6 md:gap-8 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-primary text-3xl sm:text-4xl md:text-5xl text-center mb-2 sm:mb-4 font-sans font-bold">
        Tic Tac Vibe
      </h1>

      <motion.div
        className="flex flex-col items-center bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg w-[95vw] sm:w-[90vw] md:max-w-[550px]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
      >
        <ScoreBoard
          scores={scores}
          currentPlayer={xIsNext ? "X" : "O"}
          gameMode={gameMode}
          aiDifficulty={aiDifficulty}
          isAIThinking={isAIThinking}
        />

        <Board
          squares={board}
          onClick={handleClick}
          winningLine={winningLine}
          disabled={isAIThinking}
        />

        <GameControls
          onReset={resetGame}
          onResetScores={resetScores}
          gameMode={gameMode}
          aiDifficulty={aiDifficulty}
          onChangeModeToPlayer={() => changeGameMode("player")}
          onChangeModeToAI={() => changeGameMode("ai")}
          onChangeDifficulty={changeDifficulty}
        />
      </motion.div>

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

      <footer className="mt-4 sm:mt-6 md:mt-8 text-center text-text text-xs sm:text-sm">
        <p>© {new Date().getFullYear()} Tic Tac Vibe</p>
      </footer>
    </motion.div>
  );
}
export default App;
