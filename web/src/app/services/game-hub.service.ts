import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { PlayerJoined, PlayerModel } from '../models/player.model';
import { MoveModel } from '../models/move.model';
import { io, Socket } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class GameHubService {

  receivedOpponent$ = new Subject<PlayerModel>();
  move$ = new Subject<MoveModel>();
  restartMatch$ = new Subject<void>();
  hasExited$ = new Subject<string>();
  connectionState$ = new Subject<boolean>();

  socket: Socket;

  constructor() {
    this.socket = io('/', {
      transports: [ 'websocket' ],
    });

    this.socket.on('ReceiveOpponent', (playerInfo: PlayerJoined) => {
      console.log(playerInfo);
      this.receivedOpponent$.next({ randomChance: playerInfo.randomChance, playerName: playerInfo.playerName });
    });

    this.socket.on('Move', (move: MoveModel) => {
      console.log(move);
      this.move$.next({
        gameId: move.gameId,
        position: move.position,
        symbol: move.symbol
      });
    });

    this.socket.on('RestartMatch', () => {
      this.restartMatch$.next();
    });

    this.socket.on('HasExited', (message: string) => {
      this.hasExited$.next(message);
    });

    this.socket.on('connect', () => {
      this.connectionState$.next(this.socket.connected);
    });
  }

  connect(): void {
    this.socket.connect();
  }

  rematch(gameId: string): void {
    this.socket.emit('Rematch', gameId);
  }

  sendInitialCall(gameId: string, playerName: string, randomChance: number): void {
    this.socket.emit('OnUserConnect', { gameId, playerName, randomChance });
  }

  move(gameId: string, position: number, symbol: string): void {
    this.socket.emit('MoveSelected', { gameId, position, symbol });
  }

  removeFromGroup(gameId: string): void {
    this.socket.emit('RemoveFromGroup', gameId);
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}
