import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameHelperService } from '../../../../services/game-helper.service';
import { LobbyService } from '../../../../services/lobby.service';
import { Observable, Subscription } from 'rxjs';
import { RoomModel } from '../../../../models/room.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-join-game',
    templateUrl: './join-game.component.html',
    styleUrls: ['./join-game.component.scss'],
    imports: [FormsModule, ReactiveFormsModule]
})
export class JoinGameComponent implements OnDestroy {
  private formBuilder = inject(UntypedFormBuilder);
  private gameHelperSrv = inject(GameHelperService);
  private lobbySrv = inject(LobbyService);
  private router = inject(Router);


  joinGameForm!: UntypedFormGroup;
  lobby: RoomModel[] = [];
  formValuesSubscription?: Subscription;
  checkGameExistenceSubscription?: Subscription;
  lobbySubscription?: Subscription;
  gameExistsSubscription?: Subscription;
  gameDoesNotExists = false;

  constructor() {
    this.loadLobby();
    this.initializeForm();
    this.formValuesSubscription = this.joinGameForm.valueChanges.subscribe((formValues) => {
      const { username } = formValues;
      this.gameHelperSrv.setCurrentUsername(username);
    })
  }

  loadLobby(): void {
    this.lobbySubscription = this.lobbySrv.getLobby().subscribe((res) => {
      this.lobby = res;
    });
  }

  initializeForm(): void {
    this.joinGameForm = this.formBuilder.group({
      username: new UntypedFormControl(this.gameHelperSrv.getCurrentUsername() || '', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16)
      ]),
      gameCode: new UntypedFormControl('')
    })
  }

  onSubmit(): void {
    this.gameHelperSrv.setCurrentUsername(this.joinGameForm.get('username')?.value);
    this.gameHelperSrv.setRandomnessValue(this.joinGameForm.get('username')?.value);
    this.gameHelperSrv.setGameHasStarted(false);
    this.router.navigate(['game', this.joinGameForm.get('gameCode')?.value]);
  }

  onJoinPublic(gameCode: string): void {
    if (!this.joinGameForm.get('username')?.invalid) {
      this.gameExistsSubscription = this.lobbySrv.getRoomExistence(gameCode).subscribe((res: boolean) => {
        this.gameDoesNotExists = !res;
        if (res) {
          this.gameHelperSrv.setCurrentUsername(this.joinGameForm.get('username')?.value);
          this.gameHelperSrv.setRandomnessValue(this.joinGameForm.get('username')?.value);
          this.gameHelperSrv.setGameHasStarted(false);
          this.router.navigate(['/game', gameCode]);
        } else {
          this.loadLobby();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.formValuesSubscription?.unsubscribe();
    this.checkGameExistenceSubscription?.unsubscribe();
    this.lobbySubscription?.unsubscribe();
    this.gameExistsSubscription?.unsubscribe();
  }

}
