import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { RoomResponseModel } from '../../../../models/room.model';
import { Subscription } from 'rxjs';
import { LobbyService } from '../../../../services/lobby.service';
import { GameHelperService } from '../../../../services/game-helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit, OnDestroy {

  newGameForm!: FormGroup;
  randomGameCode: string = '';
  newGameSubscription?: Subscription;
  formSubscription?: Subscription;

  constructor(private formBuilder: FormBuilder,
              private lobbySrv: LobbyService,
              private gameHelperSrv: GameHelperService,
              private router: Router) {
    this.initializeForm();
    this.formSubscription = this.newGameForm.valueChanges.subscribe((formValues) => {
      const { username } = formValues;
      this.gameHelperSrv.setCurrentUsername(username);
    });
  }

  ngOnInit(): void {
    this.initializeGameString();
  }

  initializeForm(): void {
    this.newGameForm = this.formBuilder.group({
      username: new FormControl(this.gameHelperSrv.getCurrentUsername() || '', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16)
      ]),
      public: new FormControl(false)
    });
  }

  initializeGameString(): void {
    this.randomGameCode = uuid();
  }

  copyGameCodeToClipBoard(): void {
    navigator.clipboard.writeText(this.randomGameCode).then(() => {
      (window as any).alert('Copied!');
    }).catch((error) => {
      (window as any).alert(error);
    })
  }

  onSubmit(): void {
    this.gameHelperSrv.setCurrentUsername(this.newGameForm.get('username')?.value);
    this.gameHelperSrv.setRandomnessValue(this.newGameForm.get('username')?.value);
    if (this.newGameForm.get('public')?.value) {
      this.newGameSubscription = this.lobbySrv.newRoom({
        playerName: this.newGameForm.get('username')?.value,
        gameId: this.randomGameCode
      }).subscribe({
        next: (res: RoomResponseModel) => this.nextResult(res),
        error: (error: Error) => this.errorResult(error)
      })
    } else {
      this.initializeGame();
    }
  }

  ngOnDestroy(): void {
    this.newGameSubscription?.unsubscribe();
    this.formSubscription?.unsubscribe();
  }

  private nextResult(res: RoomResponseModel): void {
    if (res.isCreated) {
      this.initializeGame();
    } else {
      window.alert(`Could not create new room, reason: ${res.reason}`);
    }
  }

  private errorResult(error: Error) {
    window.alert(`Could not create game, reason: ${error.message}`);
  }

  private initializeGame(): void {
    this.gameHelperSrv.setGameHasStarted(true);
    this.router.navigate(['game', this.randomGameCode]);
  }

}
