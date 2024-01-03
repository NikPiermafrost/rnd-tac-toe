import { Server } from 'socket.io';
import { JoinGame as Rematch } from '../models/game.model';
import { GameState, Move, PlayerInfo, TicTacToeCellModel } from '../models/game-state.model';
import redis from '../utils/redis';

const _conditions: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const gameCommandType = {
  JoinGame: 'join-game',
  PlayerJoined: 'player-joined',
  PlayerLeft: 'has-exited',
  Move: 'move',
  Error: 'error',
  Rematch: 'rematch'
};

export const handleGameMessages = (io: Server) => {
  io.on('connection', async (socket): Promise<void> => {

    console.log('a user connected');

    socket.on(gameCommandType.JoinGame, async (data: PlayerInfo): Promise<void> => {

      console.log(data);

      const gameState = await initGameState(data.gameId, data);

      if (gameState.players.length == 2) {
        socket.emit(gameCommandType.Error, {
          message: 'Room is full'
        });
      }

      socket.join(data.gameId);
  
      socket.to(data.gameId).emit(gameCommandType.PlayerJoined, gameState);
    });

    socket.on(gameCommandType.Rematch, async (data: Rematch): Promise<void> => {

      console.log(data);

      const gameState = await getBoard(data.gameId);
      
      gameState.board = initializeBoard();

      gameState.whoHasWon = '';
      gameState.isDraw = false;
      gameState.turn = gameState.players.find((x) => x.userName !== data.whoWon)!.userName;

      await updateBoard(gameState);

      console.log(gameState);

      socket.to(data.gameId).emit(gameCommandType.Rematch, gameState);
    });

    socket.on(gameCommandType.Move, async (data: Move): Promise<void> => {  
      const randomChance = calculateRandomChance(data.userName);

      const gameState = await getBoard(data.gameId);

      if (gameState.turn !== data.userName) {
        socket.emit(gameCommandType.Error, {
          message: 'It is not your turn'
        });
        return;
      }

      const move = getActialMove(data, randomChance, gameState);

      gameState.board[move.cellPosition].storedChar = move.cellCharacter;

      const winner = whoWon(gameState.board);

      if (winner) {
        gameState.whoHasWon = winner;
      }

      gameState.isDraw = checkIfDraw(gameState);

      if (gameState.isDraw) {
        gameState.whoHasWon = 'Draw';
      }

      gameState.turn = gameState.turn === gameState.players[0].userName
        ? gameState.players[1].userName
        : gameState.players[0].userName;

      await updateBoard(gameState);

      socket.to(data.gameId).emit(gameCommandType.Move, gameState);
    });

    socket.on(gameCommandType.PlayerLeft, async (gameId: string): Promise<void> => {
      await deleteBoard(gameId);
      socket.leave(gameId);
    });
  });
};

const initializeBoard = (): TicTacToeCellModel[] => {
  return Array(9).fill(null).map((_, index) => {
    return {
      cellPosition: index,
      storedChar: ''
    };
  });
};

const calculateRandomChance = (userName: string) => {
  const initialValue = Math.floor(Math.random() * 80) + 20;
  const seconds = new Date().getSeconds();
  if (seconds % 2 === 0) {
    return initialValue - userName.length;
  } else {
    return initialValue + userName.length;
  }
};

const initGameState = async (gameId: string, playerData: PlayerInfo): Promise<GameState> => {
  const existingBoardState = (await redis.json.get(gameId, {
    path: '$'
  })) as unknown as GameState;

  if (existingBoardState) {
    existingBoardState.players.push(playerData);
    await updateBoard(existingBoardState);
    return existingBoardState;
  }

  const newBoardState: GameState = {
    board: initializeBoard(),
    gameId,
    players: [playerData],
    turn: playerData.userName,
    isDraw: false
  };

  await updateBoard(newBoardState);

  return newBoardState;
};

const updateBoard = async (gameState: GameState): Promise<void> => {
  await redis.json.set(gameState.gameId, '$', gameState);
};

const getBoard = async (gameId: string): Promise<GameState> => {
  const gameState = (await redis.json.get(gameId, {
    path: '$'
  })) as unknown as GameState;

  return gameState;
};

const deleteBoard = async (gameId: string): Promise<void> => {
  await redis.json.del(gameId);
};

const getActialMove = (move: Move, randomFactor: number, gameState: GameState): Move => {
  const willItBe = Math.floor(Math.random() * 101) + 1;
  
  if (randomFactor === 0 || willItBe >= randomFactor) {
    return move;
  }

  return isNotTheRightMove(move, gameState);
};

const isNotTheRightMove = (move: Move, gameState: GameState): Move => {
  if (gameState.board.filter(({ storedChar }) => storedChar.length === 0).length === 1) {
    return move;
  }

  let isItEmpty: boolean = false;
  let potentialResponse: number = 0;

  while (!isItEmpty) {
    potentialResponse = Math.floor(Math.random() * 9);
    const cellRef = gameState.board[potentialResponse].storedChar;
    isItEmpty = cellRef.length === 0 && potentialResponse !== move.cellPosition;    
  }

  move.cellPosition = potentialResponse;
  return move;
};

const checkIfDraw = (gameState: GameState): boolean => {
  return !gameState.board.some(({ storedChar }) => storedChar.length === 0);
};

const whoWon = (grid: TicTacToeCellModel[]): string | null => {

  for (const condition of _conditions) {
    const result = grid[condition[0]].storedChar === grid[condition[1]].storedChar
      && grid[condition[1]].storedChar === grid[condition[2]].storedChar;

    const validStringValue = grid[condition[0]].storedChar;
    if (result && (validStringValue || validStringValue.length)) {
      return grid[condition[0]].storedChar;
    }
  }
  return null;
};