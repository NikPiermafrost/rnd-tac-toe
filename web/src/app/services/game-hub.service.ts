import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpTransportType, HubConnection, HubConnectionBuilder} from '@aspnet/signalr';
import {environment} from '../../environments/environment';
import {PlayerModel} from '../models/player.model';
import {MoveModel} from '../models/move.model';

@Injectable({
  providedIn: 'root'
})
export class GameHubService {

  receivedOpponent$ = new Subject<PlayerModel>();
  move$ = new Subject<MoveModel>();
  restartMatch$ = new Subject<void>();
  hasExited$ = new Subject<unknown>();
  connectionState$ = new Subject<boolean>();

  connection : HubConnection;

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl(`${environment.backendUrl}/game-hub`, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .build();
  }

  connect(): void {

    this.connection.on('ReceiveOpponent', (username: string, randomChance: number) => {
      this.receivedOpponent$.next({ randomChance, username });
    });

    this.connection.on('Move', (position: number, symbol: string) => {
      this.move$.next({ position, symbol });
    });

    this.connection.on('RestartMatch', () => {
      this.restartMatch$.next();
    });

    this.connection.on('HasExited', (message) => {
      this.hasExited$.next(message);
    });

    this.connection.start()
      .then(() => {
        this.connectionState$.next(true);
      })
      .catch((error) => {
        console.log(error);
        this.connectionState$.next(false);
      });
  }

  rematch(gameId: string): void {
    this.connection.send('Rematch', gameId);
  }

  sendInitialCall(gameId: string, currentPlayerName: string, currentRandomness: number): void {
    this.connection.send('OnUserConnect', gameId, currentPlayerName, currentRandomness);
  }

  move(gameId: string, cellPosition: number, symbol: string): void {
    this.connection.send('MoveSelected', gameId, cellPosition, symbol);
  }

  removeFromGroup(gameId: string, currentPlayerName: string): void {
    this.connection.send('RemoveFromGroup', gameId, currentPlayerName);
  }

  disconnect(): void {
    this.connection.stop();
  }
}
