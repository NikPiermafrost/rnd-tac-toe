import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { GameHelperService } from '../../services/game-helper.service';
import { Router } from '@angular/router';
import { LobbyService } from '../../services/lobby.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  startForm!: FormGroup;
  isJoin: boolean = false;
  randomGameCode: string = '';
  newGameSubscription?: Subscription;

  constructor(private formBuilder: FormBuilder,
              private gameHelperSrv: GameHelperService,
              private router: Router,
              private lobbySrv: LobbyService) { }

  ngOnInit(): void {
    this.initializeGameString();

    this.startForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16)
      ]),
      public: new FormControl(false)
    })
  }

  initializeGameString(): void {
    this.randomGameCode = uuid();
  }

  onNewClick(): void {
    this.isJoin = false;
    if (this.startForm.controls['gameCode']) {
      this.startForm.removeControl('gameCode');
    }
    if (!this.startForm.controls['public']) {
      this.startForm.addControl('public', new FormControl(false));
    }
  }

  onJoinClick(): void {
    this.isJoin = true;
    if (!this.startForm.controls['gameCode']) {
      this.startForm.addControl('gameCode', new FormControl(''))
    }
    if (this.startForm.controls['public']) {
      this.startForm.removeControl('public');
    }
  }

  copyGameCodeToClipBoard(): void {
    navigator.clipboard.writeText(this.randomGameCode).then(() => {
      (window as any).alert('Copied!');
    }).catch((error) => {
      (window as any).alert(error);
    })
  }

  onSubmit(): void {
    this.gameHelperSrv.setCurrentUsername(this.startForm.get('username')?.value);
    this.gameHelperSrv.setRandomnessValue(this.startForm.get('username')?.value);
    if (this.isJoin) {
      this.gameHelperSrv.setGameHasStarted(false);
      this.router.navigate(['game', this.startForm.get('gameCode')?.value]);
    } else {
      if (this.startForm.get('public')?.value) {
        this.newGameSubscription = this.lobbySrv.newRoom({
          playerName: this.startForm.get('username')?.value,
          gameId: this.randomGameCode
        }).subscribe({
          next: (res: boolean) => this.nextResult(res),
          error: (error: Error) => this.errorResult(error)
        })
      } else {
        this.initializeGame();
      }
    }
  }

  ngOnDestroy(): void {
    this.newGameSubscription?.unsubscribe();
  }

  private nextResult(res: boolean): void {
    if (res) {
      this.initializeGame();
    } else {
      window.alert('Could not create new room');
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
