import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RoomModel, RoomResponseModel } from '../models/room.model';
import { BaseResponse } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  private readonly baseRoute: string = `${environment.backendUrl}/lobby`

  constructor(private http: HttpClient) { }

  getLobby(): Observable<BaseResponse<RoomModel[]>> {
    return this.http.get<BaseResponse<RoomModel[]>>(`${this.baseRoute}/get-lobby`);
  }

  getRoomExistence(gameId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseRoute}/get-lobby/${gameId}`)
  }

  newRoom(newRoom: RoomModel): Observable<BaseResponse<boolean>> {
    return this.http.post<BaseResponse<boolean>>(`${this.baseRoute}/create-game`, newRoom);
  }
}
