import { GameState, Move } from './../models/game-state.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {PlayerModel} from '../models/player.model';
import {MoveModel} from '../models/move.model';
import { Socket, io } from 'socket.io-client'; 

@Injectable({
  providedIn: 'root'
})
export class GameHubService {

  receivedOpponent$ = new Subject<PlayerModel>();
  move$ = new Subject<MoveModel>();
  restartMatch$ = new Subject<void>();
  hasExited$ = new Subject<string>();
  connectionState$ = new Subject<boolean>();
  io: Socket;
  gameCommandType = {
    JoinGame: 'join-game',
    PlayerJoined: 'player-joined',
    PlayerLeft: 'has-exited',
    Move: 'move',
    Error: 'error',
    Rematch: 'rematch'
  };

  constructor() {

    this.io = io(environment.backendUrl, {
      multiplex: true,
      transports: ['websocket']
    });
  }

  connect(): void {

    this.io.on(this.gameCommandType.PlayerJoined, (gameState: GameState) => {
      // this.receivedOpponent$.next({ randomChance, username });
      console.log(gameState);
    });

    this.io.on(this.gameCommandType.Move, (position: number, symbol: string) => {
      this.move$.next({ position, symbol });
    });

    this.io.on(this.gameCommandType.Rematch, () => {
      this.restartMatch$.next();
    });

    this.io.on('HasExited', (message: string) => {
      this.hasExited$.next(message);
    });

    this.io.on('connect', () => {
      this.connectionState$.next(true);
    });

    this.io.on('disconnect', () => {
      this.connectionState$.next(false);
    });

    this.io.connect();

    // this.io.start()
    //   .then(() => {
    //     this.connectionState$.next(true);
    //   })
    //   .catch((error: Error) => {
    //     console.log(error);
    //     this.connectionState$.next(false);
    //   });
  }

  rematch(gameId: string, whoWon: string): void {
    this.io.send(this.gameCommandType.Rematch, {
      gameId,
      whoWon
    });
  }

  sendInitialCall(gameId: string, currentPlayerName: string, currentRandomness: number): void {
    this.io.send(this.gameCommandType.JoinGame, {
      gameId,
      userName: currentPlayerName
    });
  }

  move(gameId: string, cellPosition: number, cellCharacter: string, userName: string): void {
    const move: Move = {
      gameId,
      cellPosition,
      cellCharacter,
      userName
    }

    this.io.send(this.gameCommandType.Move, move);
  }

  removeFromGroup(gameId: string): void {
    this.io.send(this.gameCommandType.PlayerLeft, gameId);
  }

  disconnect(): void {
    this.io.disconnect();
  }
}
