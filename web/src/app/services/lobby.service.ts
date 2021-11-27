import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RoomModel } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  private readonly baseRoute: string = `${environment.backendUrl}/api/lobby`

  constructor(private http: HttpClient) { }

  getLobby(): Observable<RoomModel[]> {
    return this.http.get<RoomModel[]>(`${this.baseRoute}/getlobby`);
  }

  newRoom(newRoom: RoomModel): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseRoute}/newgame`, newRoom);
  }
}
