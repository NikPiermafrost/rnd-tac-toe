import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoomModel, RoomResponseModel } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  private http = inject(HttpClient);


  private readonly baseRoute: string = '/api/lobby'

  getLobby(): Observable<RoomModel[]> {
    return this.http.get<RoomModel[]>(`${this.baseRoute}`);
  }

  getRoomExistence(gameId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseRoute}/${gameId}/exists`)
  }

  newRoom(newRoom: RoomModel): Observable<RoomResponseModel> {
    return this.http.post<RoomResponseModel>(`${this.baseRoute}`, newRoom);
  }
}
