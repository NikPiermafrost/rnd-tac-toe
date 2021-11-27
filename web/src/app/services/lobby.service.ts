import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RoomModel, RoomResponseModel } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  private readonly baseRoute: string = `${environment.backendUrl}/api/lobby`

  constructor(private http: HttpClient) { }

  getLobby(): Observable<RoomModel[]> {
    return this.http.get<RoomModel[]>(`${this.baseRoute}/getlobby`);
  }

  getRoomExistence(gameId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseRoute}/getroomexistence/${gameId}`)
  }

  newRoom(newRoom: RoomModel): Observable<RoomResponseModel> {
    return this.http.post<RoomResponseModel>(`${this.baseRoute}/newgame`, newRoom);
  }
}
