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
  io : Socket;

  constructor() {

    this.io = io(environment.backendUrl, {
      multiplex: true,
      transports: ['websocket']
    });
  }

  connect(): void {

    this.io.on('ReceiveOpponent', (username: string, randomChance: number) => {
      this.receivedOpponent$.next({ randomChance, username });
    });

    this.io.on('Move', (position: number, symbol: string) => {
      this.move$.next({ position, symbol });
    });

    this.io.on('RestartMatch', () => {
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

  rematch(gameId: string): void {
    this.io.send('Rematch', gameId);
  }

  sendInitialCall(gameId: string, currentPlayerName: string, currentRandomness: number): void {
    this.io.send('OnUserConnect', gameId, currentPlayerName, currentRandomness);
  }

  move(gameId: string, cellPosition: number, symbol: string): void {
    this.io.send('MoveSelected', gameId, cellPosition, symbol);
  }

  removeFromGroup(gameId: string): void {
    this.io.send('RemoveFromGroup', gameId);
  }

  disconnect(): void {
    this.io.disconnect();
  }
}
