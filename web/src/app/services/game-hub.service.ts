import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpTransportType, HubConnection, HubConnectionBuilder} from '@aspnet/signalr';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameHubService {

  private message$ = new Subject<unknown>();
  private connection : HubConnection;

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl(`${environment.backendUrl}/game-hub`, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .build();
  }

  private connect(): void {
    this.connection.start()
      .catch((error) => console.log(error));
    this.connection.on('ReceiveOpponent', (message: unknown) => {
      this.message$.next(message);
    });
  }

  public disconnect(): void {
    this.connection.stop().then();
  }
}
