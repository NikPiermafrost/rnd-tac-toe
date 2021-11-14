import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { v4 as uuid } from 'uuid';
import {GameHelperService} from '../../../services/game-helper.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  startForm!: FormGroup;
  isJoin: boolean = false;
  randomGameCode: string = '';

  constructor(private formBuilder: FormBuilder,
              private gameHelperSrv: GameHelperService,
              private router: Router) { }

  ngOnInit(): void {
    this.initializeGameString();

    this.startForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16)
      ])
    })
  }

  initializeGameString(): void {
    this.randomGameCode = uuid()
      .split('-')
      .splice(0, 3)
      .join('');
  }

  onNewClick(): void {
    this.isJoin = false;
    if (this.startForm.controls['gameCode']) {
      this.startForm.removeControl('gameCode');
    }
  }

  onJoinClick(): void {
    this.isJoin = true;
    if (!this.startForm.controls['gameCode']) {
      this.startForm.addControl('gameCode', new FormControl(''))
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
      this.gameHelperSrv.setGameHasStarted(true);
      this.router.navigate(['game', this.randomGameCode]);
    }
  }

}
